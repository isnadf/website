import { NextRequest, NextResponse } from "next/server";
import { findPaymentByOrderId, updatePaymentRecord } from "@/lib/payment-logger";
import { webhookService } from "@/lib/webhook-service";

export async function POST(request: NextRequest) {
  try {
    // Parse form data from payment gateway
    const formData = await request.formData();
    const orderId = formData.get('OrderId') as string;
    const responseCode = formData.get('ResponseCode') as string;
    const responseMessage = formData.get('ResponseMessage') as string;
    const transactionId = formData.get('TransactionId') as string;
    const amount = formData.get('PurchAmount') as string;
    const currency = formData.get('Currency') as string;
    const hash = formData.get('Hash') as string;

    console.log("Payment failure callback received:", {
      orderId,
      responseCode,
      responseMessage,
      transactionId,
      amount,
      currency
    });

    // Validate required fields
    if (!orderId) {
      console.error("Missing OrderId in payment failure callback");
      return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
    }

    // Find the payment record
    const payment = await findPaymentByOrderId(orderId);
    
    if (!payment) {
      console.error("Payment record not found for order:", orderId);
      return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
    }

    // Update payment record as failed
    const updatedPayment = await updatePaymentRecord(payment.id, {
      status: 'failed',
      failAt: new Date().toISOString(),
      paymentGatewayResponse: {
        responseCode,
        responseMessage,
        transactionId,
        hash,
        amount,
        currency
      }
    });

    if (updatedPayment) {
      console.log("Payment marked as failed:", updatedPayment.id);
      
      // Send webhook notification
      try {
        await webhookService.sendPaymentFailed(updatedPayment);
        console.log('Payment failure webhook sent to admin dashboard');
      } catch (webhookError) {
        console.error('Failed to send failure webhook:', webhookError);
        // Don't fail the payment if webhook fails
      }
    }

    return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
  } catch (error) {
    console.error("Payment failure handler error:", error);
    return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
  }
} 