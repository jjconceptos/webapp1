import React from 'react';
import Link from 'next/link';
import Layout from '/layouts/layout';

const ProductsLandingPage = () => {
  return (
    <Layout>
      <style jsx global>{`
        .product-links {
          position: absolute;
          top: 20%;
          right: 5%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          padding: 15px;
        }

        .product-link {
          position: relative;
          width: 200px;
          height: 200px;
          background-color: #e0e0e0;
          border-radius: 10px;
          background-size: cover;
          overflow: hidden;
          cursor: pointer; /* Add pointer cursor for the clickable effect */
        }

        .product-link img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
        }

        .product-link-text-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          padding: 10px; /* Adjust as needed for spacing between icon and text */
          background: rgba(255, 255, 255, 0.8); /* Add a semi-transparent background for better readability */
        }

        .product-link-text {
          color: #333;
          font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
          
          .product-links {
            position: absolute;
            top: 40%; /* Center vertically */
            left: 41.7%; /* Center horizontally */
            transform: translate(-50%, -50%); /* Centering trick */
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            padding: 15px;
          }
  
          .product-link {
            position: relative;
            width: 100px;
            height: 100px;
            background-color: #e0e0e0;
            border-radius: 100%;
            background-size: cover;
            overflow: hidden;
            cursor: pointer; /* Add pointer cursor for the clickable effect */
          }
  
          .product-link img {
            width: 100%;
            height: auto;
            object-fit: contain;
            
          }
  
          .product-link-text-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding: 10px; /* Adjust as needed for spacing between icon and text */
            background: rgba(255, 255, 255, 0.8); /* Add a semi-transparent background for better readability */
          }
  
          .product-link-text {
            color: #333;
            font-weight: bold;
            font-size: 9px;
          }
  

        }

       
        @media only screen and (min-width: 601px) and (max-width: 768px) {
          
        }


        @media only screen and (min-width: 769px) and (max-width: 1024px) {
          
        }

      `}</style>

      <div className="product-links">
        <Link href="/products/furniture/products">
          <div className="product-link" style={{ backgroundImage: 'url(/furnitureIcon.png)' }}>
            <div className="product-link-text-container">
              <div className="product-link-text">Muebles</div>
            </div>
          </div>
        </Link>

        <Link href="/products/decoration/products">
          <div className="product-link" style={{ backgroundImage: 'url(/decorationIcon.jpg)' }}>
            <div className="product-link-text-container">
              <div className="product-link-text">Decoracion</div>
            </div>
          </div>
        </Link>
{/*  
        <Link href="/products/concepts/products">
          <div className="project-link" style={{ backgroundImage: 'url(/conceptos-icon.png)' }}>
            <div className="project-link-text-container">
              <div className="project-link-text">Conceptos</div>
            </div>
          </div>
        </Link>
        */}
      </div>
    </Layout>
  );
};


export default ProductsLandingPage;

