import { PaymentRecord } from './payment-logger';

class WebhookService {
  private adminWebhookUrl: string;

  constructor() {
    // You can set this in your environment variables
    this.adminWebhookUrl = process.env.ADMIN_WEBHOOK_URL || '';
  }

  async sendPaymentSuccess(payment: PaymentRecord): Promise<void> {
    if (!this.adminWebhookUrl) {
      console.log('Admin webhook URL not configured, skipping webhook');
      return;
    }

    try {
      const payload = {
        type: 'payment_success',
        payment: {
          id: payment.id,
          orderId: payment.orderId,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          customerInfo: payment.customerInfo,
          successAt: payment.successAt,
          createdAt: payment.createdAt
        },
        timestamp: new Date().toISOString()
      };

      const response = await fetch(this.adminWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      console.log('Payment success webhook sent successfully');
    } catch (error) {
      console.error('Failed to send payment success webhook:', error);
      throw error;
    }
  }

  async sendPaymentFailed(payment: PaymentRecord): Promise<void> {
    if (!this.adminWebhookUrl) {
      console.log('Admin webhook URL not configured, skipping webhook');
      return;
    }

    try {
      const payload = {
        type: 'payment_failed',
        payment: {
          id: payment.id,
          orderId: payment.orderId,
          amount: payment.amount,
          currency: payment.currency,
          status: payment.status,
          paymentMethod: payment.paymentMethod,
          customerInfo: payment.customerInfo,
          failAt: payment.failAt,
          createdAt: payment.createdAt
        },
        timestamp: new Date().toISOString()
      };

      const response = await fetch(this.adminWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed with status: ${response.status}`);
      }

      console.log('Payment failure webhook sent successfully');
    } catch (error) {
      console.error('Failed to send payment failure webhook:', error);
      throw error;
    }
  }
}

export const webhookService = new WebhookService();
