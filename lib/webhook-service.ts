import { PaymentRecord } from './payment-logger';
import crypto from 'crypto';

export interface WebhookPayload {
  event: 'payment.success' | 'payment.failed' | 'payment.pending';
  payment: PaymentRecord;
  timestamp: string;
  signature?: string;
}

export interface WebhookConfig {
  url: string;
  secret?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export class WebhookService {
  private config: WebhookConfig;

  constructor(config: WebhookConfig) {
    this.config = {
      timeout: 10000,
      retries: 3,
      retryDelay: 1000,
      ...config,
    };
  }

  // Generate signature for webhook payload
  private generateSignature(payload: string, secret: string): string {
    return `sha256=${crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')}`;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Send webhook notification
  async sendWebhook(
    event: WebhookPayload['event'],
    payment: PaymentRecord,
    attempt: number = 1
  ): Promise<{ success: boolean; error?: string; attempt: number }> {
    const payload: WebhookPayload = {
      event,
      payment,
      timestamp: new Date().toISOString(),
    };

    const payloadString = JSON.stringify(payload);

    if (this.config.secret) {
      payload.signature = this.generateSignature(payloadString, this.config.secret);
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'PaymentWebhook/1.0',
    };

    if (this.config.secret) {
      headers['X-Webhook-Signature'] = payload.signature!;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(this.config.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      console.log(`Webhook sent successfully for payment ${payment.id} (attempt ${attempt})`);
      
      return { success: true, attempt };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      console.error(`Webhook failed for payment ${payment.id} (attempt ${attempt}):`, errorMessage);

      if (attempt < this.config.retries!) {
        const delay = this.config.retryDelay! * Math.pow(2, attempt - 1);
        console.log(`Retrying webhook in ${delay}ms...`);
        
        await this.sleep(delay);
        return this.sendWebhook(event, payment, attempt + 1);
      }

      return { success: false, error: errorMessage, attempt };
    }
  }

  async sendPaymentSuccess(payment: PaymentRecord) {
    return this.sendWebhook('payment.success', payment);
  }

  async sendPaymentFailed(payment: PaymentRecord) {
    return this.sendWebhook('payment.failed', payment);
  }

  async sendPaymentPending(payment: PaymentRecord) {
    return this.sendWebhook('payment.pending', payment);
  }
}

// Create webhook service instance
export const webhookService = new WebhookService({
  url: process.env.ADMIN_DASHBOARD_WEBHOOK_URL || '',
  secret: process.env.WEBHOOK_SECRET,
  timeout: parseInt(process.env.WEBHOOK_TIMEOUT || '10000'),
  retries: parseInt(process.env.WEBHOOK_RETRIES || '3'),
  retryDelay: parseInt(process.env.WEBHOOK_RETRY_DELAY || '1000'),
});
