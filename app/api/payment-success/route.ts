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
    const procReturnCode = formData.get('ProcReturnCode') as string;
    const response = formData.get('Response') as string;
    const mdStatus = formData.get('MDStatus') as string;
    const threeDStatus = formData.get('3DStatus') as string;
    const hostRefNum = formData.get('HostRefNum') as string;
    const authCode = formData.get('AuthCode') as string;
    const transId = formData.get('TransId') as string;
    const amount = formData.get('PurchAmount') as string;
    const currency = formData.get('Currency') as string;
    const hash = formData.get('Hash') as string;

    console.log("Payment success callback received:", {
      orderId,
      responseCode,
      procReturnCode,
      responseMessage,
      response,
      mdStatus,
      threeDStatus,
      hostRefNum,
      authCode,
      transId,
      transactionId,
      amount,
      currency
    });

    // Validate required fields
    if (!orderId) {
      console.error("Missing OrderId in payment callback");
      return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
    }

    // Find the payment record
    const payment = await findPaymentByOrderId(orderId);
    
    if (!payment) {
      console.error("Payment record not found for order:", orderId);
      return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
    }

    // Verify payment success per bank samples: ProcReturnCode == "00" and 3D/MD status success
    const normalizedCode = (procReturnCode || responseCode || "").trim();
    const codeSuccess = ["00", "0", "0000"].includes(normalizedCode);
    const textSuccess = (response || "").toLowerCase() === "approved";
    const threeDSuccess = threeDStatus
      ? threeDStatus === "1"
      : mdStatus
        ? ["1", "2", "3", "4"].includes(mdStatus)
        : false;
    const isSuccess = (codeSuccess || textSuccess) && threeDSuccess;

    if (!isSuccess) {
      console.error("Payment failed with response code:", {
        responseCode,
        procReturnCode,
        responseMessage,
        response,
        mdStatus,
        threeDStatus,
        hostRefNum,
        authCode,
        transId,
      });
      
      // Update payment record as failed
      const updatedPayment = await updatePaymentRecord(payment.id, {
        status: 'failed',
        failAt: new Date().toISOString(),
        paymentGatewayResponse: {
          responseCode,
          procReturnCode,
          responseMessage,
          response,
          mdStatus,
          threeDStatus,
          hostRefNum,
          authCode,
          transId,
          transactionId,
          hash,
          amount,
          currency
        }
      });

      if (updatedPayment) {
        try {
          await webhookService.sendPaymentFailed(updatedPayment);
          console.log('Payment failure webhook sent to admin dashboard');
        } catch (webhookError) {
          console.error('Failed to send failure webhook:', webhookError);
          // Don't fail the payment if webhook fails
        }
      }

      return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
    }

    // Update payment record as successful
    const updatedPayment = await updatePaymentRecord(payment.id, {
      status: 'success',
      successAt: new Date().toISOString(),
      paymentGatewayResponse: {
        responseCode,
        procReturnCode,
        responseMessage,
        response,
        mdStatus,
        threeDStatus,
        hostRefNum,
        authCode,
        transId,
        transactionId,
        hash,
        amount,
        currency
      }
    });

    if (updatedPayment) {
      console.log("Payment marked as successful:", updatedPayment.id);
      
      // Send webhook notification
      try {
        await webhookService.sendPaymentSuccess(updatedPayment);
        console.log('Payment success webhook sent to admin dashboard');
      } catch (webhookError) {
        console.error('Failed to send success webhook:', webhookError);
        // Don't fail the payment if webhook fails
      }
    }

    return NextResponse.redirect(new URL("/successful-payment", request.url), 302);
  } catch (error) {
    console.error("Payment success handler error:", error);
    return NextResponse.redirect(new URL("/failed-payment", request.url), 302);
  }
} 