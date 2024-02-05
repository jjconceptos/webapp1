import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import { loadStripe } from '@stripe/stripe-js';

import { fetchFurnitureProductsData } from 'utils/fetchFurnitureProducts.js';

const stripePromise = loadStripe('your_stripe_publishable_key');

const BuyButton = ({ productName }) => { // Change the prop to productName
  const { user } = useAuth();
  const [stripe, setStripe] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const furnitureProducts = await fetchFurnitureProductsData();
        const selectedProduct = furnitureProducts.find((product) => product.name === productName);

        if (selectedProduct) {
          setPrice(selectedProduct.price);
        }

        if (user) {
          setStripe(stripePromise);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productName, user]);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: productName, quantity: 1 }],
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
    
      <button onClick={handlePayment}>
        Buy Now - {price ? `$${price}` : 'Loading...'}
      </button>
    
  );
};

export default BuyButton;
