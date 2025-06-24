# Stripe Payment Integration Setup

## Overview
This guide will help you integrate Stripe payments into your thrift-site application, allowing customers to purchase individual items, complete outfits, or entire cart contents.

## Prerequisites
1. A Stripe account ([stripe.com](https://stripe.com))
2. Node.js and npm installed
3. MongoDB database running
4. Your thrift-site application set up

## Step 1: Get Stripe API Keys

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API Keys**
3. Copy your **Publishable key** (starts with `pk_test_` for test mode)
4. Copy your **Secret key** (starts with `sk_test_` for test mode)

## Step 2: Configure Environment Variables

### Client-side (.env.local in client/ directory)
```bash
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
REACT_APP_API_URL=http://localhost:5000/api
```

### Server-side (.env in server/ directory)
```bash
# Existing variables
MONGODB_URI=mongodb://localhost:27017/thrift-store
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development

# New Stripe variables
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## Step 3: Set Up Stripe Webhooks

1. In your Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set the endpoint URL to: `https://your-domain.com/api/stripe/webhook`
   - For local development: `http://localhost:5000/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** and add it to your `.env` file as `STRIPE_WEBHOOK_SECRET`

## Step 4: Test Stripe Integration Locally

### Using Stripe CLI (Recommended)
1. Install [Stripe CLI](https://stripe.com/docs/stripe-cli)
2. Login to your Stripe account:
   ```bash
   stripe login
   ```
3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to localhost:5000/api/stripe/webhook
   ```
4. The CLI will display a webhook signing secret - add this to your `.env` file

### Test Card Numbers
Use these test card numbers in Stripe Checkout:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0000 0000 3220

## Step 5: Database Integration

The integration automatically:
- Creates `Order` records when payments succeed
- Updates `Product` status to 'sold'
- Stores customer information and shipping details
- Links products to orders via `orderId` field

### Order Schema
```javascript
{
  sessionId: String,           // Stripe session ID
  amount: Number,              // Amount in dollars
  currency: String,            // 'usd'
  customerEmail: String,       // Customer email
  customerName: String,        // Customer name
  products: [{                 // Array of purchased products
    productId: ObjectId,
    name: String,
    price: Number,
    brand: String,
    size: String,
    condition: String,
    images: [String]
  }],
  status: String,              // 'completed', 'pending', 'failed'
  fulfillmentStatus: String,   // 'pending', 'processing', 'shipped'
  createdAt: Date,
  updatedAt: Date
}
```

## Step 6: Features Included

### 1. Single Product Purchase
- Buy individual items directly from product detail pages
- Automatic inventory management

### 2. Outfit Purchase
- Buy complete outfits (top + bottom combinations)
- Both items marked as sold simultaneously

### 3. Cart Checkout
- Purchase multiple items at once
- Mixed cart support (individual items + outfits)

### 4. Payment Flow
1. Customer clicks "Checkout" 
2. Redirected to Stripe Checkout page
3. Payment processed securely by Stripe
4. Webhook updates database automatically
5. Customer redirected to success/cancel page

## Step 7: Production Deployment

### Environment Variables for Production
```bash
# Client
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
REACT_APP_API_URL=https://your-api-domain.com/api

# Server
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret_here
```

### Webhook Endpoint
Update your webhook endpoint URL to your production domain:
`https://your-domain.com/api/stripe/webhook`

## Step 8: Testing Checklist

- [ ] Single product purchase works
- [ ] Outfit purchase works  
- [ ] Cart checkout works
- [ ] Products marked as sold after payment
- [ ] Orders created in database
- [ ] Webhooks receiving events
- [ ] Success/cancel pages display correctly
- [ ] Cart clears after successful payment

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**
   - Check webhook endpoint URL
   - Verify webhook signing secret
   - Ensure server is accessible

2. **Products not marked as sold**
   - Check webhook handler logs
   - Verify product metadata includes productId
   - Check database connection

3. **Checkout session creation fails**
   - Verify Stripe secret key
   - Check product data format
   - Review server logs for errors

### Debug Mode
Set `NODE_ENV=development` to see detailed logs in the webhook handler.

## Security Notes

- Never expose secret keys in client-side code
- Always verify webhook signatures
- Use HTTPS in production
- Regularly rotate API keys
- Monitor webhook endpoint for suspicious activity

## Support

For Stripe-specific issues, check the [Stripe Documentation](https://stripe.com/docs).
For application-specific issues, review the server logs and webhook handler responses. 