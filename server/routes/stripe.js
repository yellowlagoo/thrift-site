const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/Product');
const Order = require('../models/Order');
const router = express.Router();

/**
 * Create Checkout Session
 */
router.post('/checkout', async (req, res) => {
  try {
    const { items, success_url, cancel_url, metadata } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url,
      cancel_url,
      metadata,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Webhook endpoint for Stripe events
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment succeeded:', session.id);
      
      // Update your database here
      await handleSuccessfulPayment(session);
      break;
    
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object;
      console.log('Payment failed:', paymentIntent.id);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

/**
 * Handle successful payment
 */
async function handleSuccessfulPayment(session) {
  try {
    const { metadata, customer_details } = session;
    
    console.log('Processing successful payment for session:', session.id);
    console.log('Metadata:', metadata);
    
    // Get line items from the session to extract product information
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product']
    });
    
    // Extract product information from line items
    const products = [];
    const productIds = [];
    
    for (const item of lineItems.data) {
      const productData = item.price.product;
      // Extract product ID from metadata or product name
      // This assumes you're storing product ID in the product metadata
      if (productData.metadata && productData.metadata.productId) {
        const productId = productData.metadata.productId;
        productIds.push(productId);
        
        // Get full product details from database
        const product = await Product.findById(productId);
        if (product) {
          products.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            brand: product.brand,
            size: product.size,
            condition: product.condition,
            images: product.images
          });
        }
      }
    }
    
    // Create order record
    const order = new Order({
      sessionId: session.id,
      amount: session.amount_total / 100, // Convert from cents
      currency: session.currency,
      customerEmail: customer_details.email,
      customerName: customer_details.name,
      customerPhone: customer_details.phone,
      shippingAddress: customer_details.address ? {
        line1: customer_details.address.line1,
        line2: customer_details.address.line2,
        city: customer_details.address.city,
        state: customer_details.address.state,
        postal_code: customer_details.address.postal_code,
        country: customer_details.address.country
      } : null,
      products: products,
      metadata: metadata,
      status: 'completed'
    });
    
    await order.save();
    
    // Mark products as sold
    if (productIds.length > 0) {
      await Product.updateMany(
        { _id: { $in: productIds } },
        { 
          status: 'sold',
          soldAt: new Date(),
          orderId: order._id
        }
      );
    }
    
    console.log(`Order created successfully: ${order._id}`);
    console.log(`Products marked as sold: ${productIds.join(', ')}`);
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

module.exports = router; 