# 🚀 Palestinian Student Fund - Production Deployment Guide

## 📋 Overview

This guide provides step-by-step instructions to deploy the Palestinian Student Fund project to production. The project is already production-ready and requires only environment configuration.

## 🔧 Required Environment Variables

Create a `.env.local` file in your project root with the following configuration:

### 🏦 Payment Gateway Configuration (Ziraat Katılım Bank)

```bash
# REQUIRED: Your merchant credentials from Ziraat Katılım Bank
MERCHANT_ID="your_merchant_id_here"
STORE_KEY="your_store_key_here"

# REQUIRED: Payment callback URLs - MUST be HTTPS in production
OK_URL="https://your-domain.com/api/payment-success"
FAIL_URL="https://your-domain.com/api/payment-fail"
```

### 📊 Admin Dashboard Integration

```bash
# REQUIRED: URL of your Admin Dashboard
ADMIN_DASHBOARD_URL="https://your-admin-dashboard.com"

# REQUIRED: Webhook configuration for Admin Dashboard notifications
ADMIN_DASHBOARD_WEBHOOK_URL="https://your-admin-dashboard.com/api/webhooks/payments"
WEBHOOK_SECRET="your-super-secure-webhook-secret-32-characters-minimum"

# OPTIONAL: Webhook retry configuration
WEBHOOK_TIMEOUT="10000"
WEBHOOK_RETRIES="3"
WEBHOOK_RETRY_DELAY="1000"
```

### 🌐 Next.js Production Configuration

```bash
# REQUIRED: Production environment
NODE_ENV=production
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### 📈 Optional: Production Monitoring & Logging

```bash
# OPTIONAL: Sentry for error tracking
SENTRY_DSN="https://your-sentry-dsn@sentry.io/project-id"

# OPTIONAL: Log level for production
LOG_LEVEL="info"
```

### 📧 Optional: Email Notifications

```bash
# OPTIONAL: SMTP configuration for payment notifications
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
NOTIFICATION_EMAIL="admin@your-domain.com"
```

## 🚀 Deployment Steps

### Step 1: Environment Configuration

1. **Create `.env.local` file** in your project root
2. **Copy the environment variables** from above
3. **Update all placeholder values** with your actual production values
4. **Ensure all URLs use HTTPS** in production

### Step 2: Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the build locally
npm start
```

### Step 3: Deploy to Your Platform

#### Option A: Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
```

#### Option B: Netlify Deployment
```bash
# Build the application
npm run build

# Deploy the 'out' folder to Netlify
# Set environment variables in Netlify dashboard
```

#### Option C: Custom Server Deployment
```bash
# Build the application
npm run build

# Start production server
npm start

# Configure reverse proxy (nginx/apache)
# Set up SSL certificates
```

### Step 4: Domain Configuration

1. **Point your domain** to your hosting platform
2. **Configure SSL certificates** (Let's Encrypt recommended)
3. **Update DNS records** as needed
4. **Test HTTPS accessibility**

### Step 5: Payment Gateway Configuration

1. **Update OK_URL and FAIL_URL** in your environment variables
2. **Test payment flow** with a small amount
3. **Verify callback URLs** are accessible
4. **Check payment data** is being stored correctly

## 🔒 Security Checklist

### ✅ Required Security Measures

- [ ] **HTTPS Enabled**: All URLs use HTTPS in production
- [ ] **Environment Variables**: All secrets stored securely
- [ ] **CORS Configuration**: Properly configured for admin dashboard
- [ ] **Input Validation**: All payment inputs are validated
- [ ] **XSS Protection**: HTML escaping implemented
- [ ] **Webhook Security**: HMAC signatures for webhook verification

### ✅ Payment Security

- [ ] **Merchant Credentials**: Secure storage of payment gateway credentials
- [ ] **Hash Validation**: Proper hash calculation for payment gateway
- [ ] **Amount Validation**: Payment amounts are validated
- [ ] **Order ID Validation**: Order IDs are properly validated
- [ ] **Callback Security**: Payment callbacks are secured

### ✅ Admin Dashboard Integration

- [ ] **CORS Headers**: Properly configured for admin dashboard
- [ ] **API Security**: Admin endpoints are secured
- [ ] **Webhook Security**: Secure webhook delivery
- [ ] **Error Handling**: Proper error responses

## 🧪 Testing Production Deployment

### 1. API Endpoint Testing

```bash
# Test payment API
curl -X GET https://your-domain.com/api/payment

# Test admin stats API
curl -X GET https://your-domain.com/api/admin/stats

# Test admin payments API
curl -X GET https://your-domain.com/api/admin/payments
```

### 2. Payment Flow Testing

1. **Create a test donation** with small amount
2. **Complete payment process** through Ziraat gateway
3. **Verify payment success/failure** callbacks work
4. **Check payment data** is stored correctly
5. **Verify admin dashboard** receives payment data

### 3. Admin Dashboard Integration Testing

1. **Test API connectivity** from admin dashboard
2. **Verify payment statistics** load correctly
3. **Test payment filtering** and search functionality
4. **Check webhook notifications** work properly

## 📊 Monitoring & Maintenance

### Key Metrics to Monitor

- **API Response Times**: Should be < 2 seconds
- **Payment Success Rate**: Monitor for failures
- **Webhook Delivery**: Track webhook success rates
- **Error Rates**: Monitor for spikes in errors
- **SSL Certificate**: Monitor certificate expiration

### Regular Maintenance Tasks

- **Monitor payment data** storage
- **Check webhook deliveries** and failures
- **Review security logs** for suspicious activity
- **Update dependencies** regularly
- **Backup payment data** regularly
- **Monitor SSL certificate** expiration

## 🆘 Troubleshooting

### Common Issues

#### Payment Gateway Errors
```bash
# Check environment variables
curl -X GET https://your-domain.com/api/payment

# Verify merchant credentials
# Check callback URLs are accessible
# Validate hash calculation
```

#### Admin Dashboard Connection Issues
```bash
# Test CORS configuration
curl -H "Origin: https://your-admin-dashboard.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-domain.com/api/admin/stats

# Check API endpoints
curl -X GET https://your-domain.com/api/admin/stats
```

#### Webhook Delivery Issues
```bash
# Check webhook configuration
# Verify webhook URL is accessible
# Check webhook secret configuration
# Monitor webhook retry attempts
```

## 📞 Support

### Payment Gateway Support
- **Ziraat Katılım Bank**: Contact your merchant support
- **Payment Issues**: Check merchant credentials and configuration

### Technical Support
- **API Issues**: Check environment variables and configuration
- **Deployment Issues**: Verify build process and platform configuration
- **Security Issues**: Review security checklist and implementation

## 🎯 Production Checklist

Before going live, ensure:

- [ ] **Environment variables** are configured correctly
- [ ] **HTTPS is enabled** for all URLs
- [ ] **Payment gateway** is configured with production credentials
- [ ] **Admin dashboard** can connect to the API
- [ ] **Webhook notifications** are working
- [ ] **Payment flow** is tested with real transactions
- [ ] **Security measures** are implemented
- [ ] **Monitoring** is set up
- [ ] **Backup strategy** is in place

## 🚀 Go Live!

Once all checklist items are completed, your Palestinian Student Fund project is ready for production! 

**The project is already production-ready - you just need to configure the environment variables and deploy!** 🎉
