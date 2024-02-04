import React, { useState, useEffect } from 'react';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

const BuyButton = ({ productId, price }) => {
  const { user } = useAuth();
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    if (user) {
      setStripe(stripePromise);
    }
  }, [user]);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: productId, quantity: 1 }],
        mode: 'payment',
        successUrl: 'https://yourwebsite.com/success',
        cancelUrl: 'https://yourwebsite.com/cancel',
      });

      if (error) {
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <button onClick={handlePayment}>
        Buy Now - ${price}
      </button>
    </Layout>
  );
};

export default BuyButton;
