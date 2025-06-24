import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/constants';

// Initialize Stripe
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);
  }
  return stripePromise;
};

/**
 * Create a checkout session for a single product
 */
export const createCheckoutSession = async (product) => {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            price_data: {
              currency: STRIPE_CONFIG.currency,
              product_data: {
                name: product.name,
                description: `${product.brand} • ${product.size} • ${product.condition}`,
                images: product.images,
                metadata: {
                  productId: product._id,
                },
              },
              unit_amount: Math.round(product.price * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        success_url: STRIPE_CONFIG.successUrl,
        cancel_url: STRIPE_CONFIG.cancelUrl,
        metadata: {
          productId: product._id,
          productType: 'single',
        },
      }),
    });

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Create a checkout session for multiple products (outfit)
 */
export const createOutfitCheckoutSession = async (outfit) => {
  try {
    const items = [
      {
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: outfit.top.name,
            description: `${outfit.top.brand} • ${outfit.top.size} • ${outfit.top.condition}`,
            images: outfit.top.images,
            metadata: {
              productId: outfit.top._id,
            },
          },
          unit_amount: Math.round(outfit.top.price * 100),
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: STRIPE_CONFIG.currency,
          product_data: {
            name: outfit.bottom.name,
            description: `${outfit.bottom.brand} • ${outfit.bottom.size} • ${outfit.bottom.condition}`,
            images: outfit.bottom.images,
            metadata: {
              productId: outfit.bottom._id,
            },
          },
          unit_amount: Math.round(outfit.bottom.price * 100),
        },
        quantity: 1,
      },
    ];

    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        success_url: STRIPE_CONFIG.successUrl,
        cancel_url: STRIPE_CONFIG.cancelUrl,
        metadata: {
          topId: outfit.top._id,
          bottomId: outfit.bottom._id,
          productType: 'outfit',
        },
      }),
    });

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating outfit checkout session:', error);
    throw error;
  }
};

/**
 * Create checkout session for cart items
 */
export const createCartCheckoutSession = async (cartItems) => {
  try {
    const items = cartItems.map((item) => {
      if (item.type === 'outfit') {
        return [
          {
            price_data: {
              currency: STRIPE_CONFIG.currency,
                             product_data: {
                 name: item.top.name,
                 description: `${item.top.brand} • ${item.top.size} • ${item.top.condition}`,
                 images: item.top.images,
                 metadata: {
                   productId: item.top._id,
                 },
               },
              unit_amount: Math.round(item.top.price * 100),
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: STRIPE_CONFIG.currency,
                             product_data: {
                 name: item.bottom.name,
                 description: `${item.bottom.brand} • ${item.bottom.size} • ${item.bottom.condition}`,
                 images: item.bottom.images,
                 metadata: {
                   productId: item.bottom._id,
                 },
               },
              unit_amount: Math.round(item.bottom.price * 100),
            },
            quantity: 1,
          },
        ];
      } else {
        return {
          price_data: {
            currency: STRIPE_CONFIG.currency,
                       product_data: {
             name: item.name,
             description: `${item.brand} • ${item.size} • ${item.condition}`,
             images: item.images,
             metadata: {
               productId: item._id,
             },
           },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: 1,
        };
      }
    }).flat();

    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        success_url: STRIPE_CONFIG.successUrl,
        cancel_url: STRIPE_CONFIG.cancelUrl,
        metadata: {
          productType: 'cart',
          itemCount: cartItems.length,
        },
      }),
    });

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating cart checkout session:', error);
    throw error;
  }
};

/**
 * Redirect to Stripe Checkout
 */
export const redirectToCheckout = async (sessionId) => {
  try {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error('Stripe redirect error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
};

export default getStripe; 