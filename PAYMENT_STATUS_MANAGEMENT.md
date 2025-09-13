# Payment Status Management

## Overview
The payment system now properly handles payment statuses to avoid incorrectly marking payments as failed when users press the back button from the payment gateway.

## Payment Flow

### 1. Payment Initiation (`/api/payment`)
- Creates payment record with `status: 'pending'`
- Redirects user to payment gateway
- Payment remains pending until gateway callback

### 2. Payment Gateway Callbacks
- **Success**: `/api/payment-success` → Updates status to `'success'`
- **Failure**: `/api/payment-fail` → Updates status to `'failed'`

### 3. Cleanup Process
- Pending payments older than 5 minutes are marked as `'cancelled'`
- This handles cases where users don't return from payment gateway

## API Endpoints

### Payment Status Check
```
GET /api/payment-status?orderId=ORD-1234567890
```
Returns current payment status for a specific order.

### Cleanup Pending Payments
```
POST /api/admin/cleanup-payments
Authorization: Bearer YOUR_CRON_SECRET_TOKEN
```
Marks pending payments older than 5 minutes as cancelled.

## Setup Instructions

### 1. Environment Variables (Optional)
Add to your `.env` file for additional security:
```
CRON_SECRET=your-secret-token-here
```

### 2. Vercel Cron Jobs (Recommended)
If using Vercel, add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/admin/cleanup-payments",
      "schedule": "*/2 * * * *"
    }
  ]
}
```

### 3. Alternative: External Cron Service

## Payment Statuses

- **`pending`**: Payment initiated, waiting for gateway response
- **`success`**: Payment completed successfully
- **`failed`**: Payment failed (user cancelled, insufficient funds, etc.)
- **`cancelled`**: Payment timed out (user didn't return from gateway)

## Benefits

1. **Accurate Reporting**: Admin dashboard shows correct payment statuses
2. **No False Failures**: Back button doesn't mark payments as failed
3. **Automatic Cleanup**: Old pending payments are automatically cancelled
4. **Better Analytics**: Clear distinction between failed and cancelled payments
