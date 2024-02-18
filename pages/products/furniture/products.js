import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import BuyButton from 'layouts/buyButton.js';
import Layout from '/layouts/layout';
import Carousel from '/layouts/Carousel'; 
import FurnitureProductForm from '/pages/products/furniture/manage/addProduct';
import DelFurnitureProductButton from 'pages/products/furniture/manage/delProduct';
import { fetchFurnitureProductsData } from '/utils/fetchFurnitureProducts';



function FurnitureProducts() {
  const { state } = useAuth();
  const [showFurnitureProductForm, setShowFurnitureProductForm] = useState(false);
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [expandedFurnitureProduct, setExpandedFurnitureProduct] = useState(null);
  const [selectedFurnitureProduct, setSelectedFurnitureProduct] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);
  const [fullDescriptions, setFullDescriptions] = useState({});

 // Fetch products when the component mounts
 useEffect(() => {
  const fetchData = async () => {
    try {
      const furnitureProductsData = await fetchFurnitureProductsData();
      console.log('Fetched furniture products data (products.js):', furnitureProductsData); // Log fetched data
      const updatedFurnitureProducts = furnitureProductsData.map((furnitureProduct) => ({
        ...furnitureProduct,
        name: furnitureProduct.name.replace(/-/g, ' '), // Transform hyphens to spaces
        // Limit the description only if the product is not expanded
        description:
          expandedFurnitureProduct === null
            ? furnitureProduct.description.length > 8
              ? furnitureProduct.description.slice(0, 8) + '...'
              : furnitureProduct.description
            : furnitureProduct.description,

        
      }));
      setFurnitureProducts(updatedFurnitureProducts);

      
      // Store the full descriptions separately
      const fullDescs = furnitureProductsData.reduce(
        (acc, furnitureProduct) => ({
          ...acc,
          [furnitureProduct.name.replace(/-/g, ' ')]: furnitureProduct.description,
        }),
        {}
      );
      setFullDescriptions(fullDescs);

    } catch (error) {
      console.error('Error fetching furnitureProducts:', error);
    }
  };

  fetchData();
}, [expandedFurnitureProduct]);

  const handleFurnitureProductAddClick = () => {
    setShowFurnitureProductForm(true);
  };

  const handleCloseForm = () => {
    setShowFurnitureProductForm(false);
  };
  

  const handleFurnitureProductClick = (furnitureProduct) => {
    if (furnitureProduct) {
      setSelectedFurnitureProduct(furnitureProduct);
      setEnlargedView(!enlargedView);
      setShowFurnitureProductForm(false);
    } else {
      setShowFurnitureProductForm((prevShowFurnitureProductForm) => !prevShowFurnitureProductForm);
    }
  };

  const handleFurnitureProductAdded = async () => {
    try {
      const updatedFurnitureProducts = await fetchFurnitureProductsData();
      setFurnitureProducts(
        updatedFurnitureProducts.map((furnitureProduct) => ({
          ...furnitureProduct,
          description: furnitureProduct.description.length > 8
            ? furnitureProduct.description.slice(0, 8) + '...'
            : furnitureProduct.description,
        }))
      );
      console.log('Updated furnitureProducts:', updatedFurnitureProducts);
    } catch (error) {
      console.error('Error handling added furnitureProduct:', error);
    }
  };

  const handleFurnitureProductSubmit = async (furnitureProduct) => {
    if (furnitureProduct.name && furnitureProduct.description) {
      setShowFurnitureProductForm(false);
      handleFurnitureProductAdded(furnitureProduct.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
    
    
  };

  const handleDeleteFurnitureProduct = async (furnitureProductName) => {
    try {
      const updatedFurnitureProducts = furnitureProducts.filter((furnitureProduct) => furnitureProduct.name !== furnitureProductName);
      setFurnitureProducts(updatedFurnitureProducts);

      if (expandedFurnitureProduct === furnitureProductName) {
        setExpandedFurnitureProduct(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isButtonVisible = state.clearanceLevel == 1 || state.clearanceLevel == 2;

  
  
                   

  return (
    <Layout>
      <style jsx >{`

       body {
          
          margin: 0;
          padding: 0;
          display: flex;
          min-height: 80vh;
          max-height: 102vh;
          margin-bottom: 100vh;
        }
        
        .no-products-centered {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .add-products-section {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30vh; /* Adjust the margin-top as needed */
        }
        
        .products-section {
          margin-top: 35vh;
        }
       
        .products-grid {
          position: relative;
          
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2vw;
          padding: 1.5vh;
         
        }
        
        .products-card {
          border: 1px solid #ddd;
          padding: 1vw;
        }
        
        .enlarged-view {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.94);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .enlarged-product {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        .enlarged-product-img {
          width: 70vw;
          max-width: 100vw;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
          margin: auto;
        }
        
        .enlarged-product-name {
          font-size: 3vw;
          color: #f3f0e9;
          margin-top: 10vh;
        }
        
        .enlarged-product-description {
          font-size: 2vw;
          color: #f3f0e9;
          white-space: pre-line;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        
        .close-button {
          position: absolute;
          top: 1vh;
          right: 1vw;
          background: none;
          border: none;
          font-size: 2.4vw;
          cursor: pointer;
          color: white;
          outline: none;
          transition: color 0.3s ease;
        }
        
        .close-button:hover {
          color: lightgray;
        }

        @media screen and (min-width: 800px) and (min-height: 600px) {
  
          body {
          
            margin: 0;
            padding: 0;
            display: flex;
            min-height: 80vh;
            max-height: 102vh;
            margin-bottom: 100vh;
          }
          
          .no-products-centered {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          
          .add-products-section {
            position: relative;
            top: 30vh;
            left: 10vw;
            
            
          }
          
          .products-section {
            margin-top: 35vh;
           
          }
         
          .products-grid {
            position: relative;
            
            left: 0;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2vw;
            padding: 1.5vh;
           
          }
          
          .products-card {
            border: 1px solid #ddd;
            padding: 1vw;
          }
          
          .enlarged-view {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.94);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
          }
          
          .enlarged-product {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          
          .enlarged-product-img {
            width: 70vw;
            max-width: 100vw;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
            margin: auto;
          }
          
          .enlarged-product-name {
            font-size: 3vw;
            color: #f3f0e9;
            margin-top: 10vh;
          }
          
          .enlarged-product-description {
            font-size: 2vw;
            color: #f3f0e9;
            white-space: pre-line;
            overflow-wrap: break-word;
            max-width: 100%;
          }
          
          .close-button {
            position: absolute;
            top: 1vh;
            right: 1vw;
            background: none;
            border: none;
            font-size: 2.4vw;
            cursor: pointer;
            color: white;
            outline: none;
            transition: color 0.3s ease;
          }
          
          .close-button:hover {
            color: lightgray;
          } 
        
        }
       
      `}</style>
      <div className="products-container">
      <div className="add-products-section">
       <div>
      {isButtonVisible && (
        <button onClick={handleFurnitureProductAddClick}>Add product</button>
      )}
      </div>
            {showFurnitureProductForm && (
              <div>
                
                <FurnitureProductForm
                  onSubmit={handleFurnitureProductSubmit}
                  furnitureProducts={furnitureProducts}
                  onFurnitureProductAdded={handleFurnitureProductAdded}
                  onCloseForm={handleCloseForm} 
                />
              </div>
            )}
      </div>
      <div className="products-section">
       <div className="products-grid">
         {Array.isArray(furnitureProducts) && furnitureProducts.length > 0 ? (
           furnitureProducts.map((furnitureProduct, index) => (
             <div
               key={index}
               className={`products-card ${
                 expandedFurnitureProduct === index ? 'expanded' : ''
               }`}
             >
               <h3
                 onClick={() =>
                   setExpandedFurnitureProduct(
                     expandedFurnitureProduct === index ? null : index
                   )
                 }
               >
                 {furnitureProduct.name}
               </h3>
               <p
                 className={`product-description ${
                   expandedFurnitureProduct === index ? 'expanded' : ''
                 }`}
               >
                 {furnitureProduct.description}
               </p>
               {furnitureProduct.imageUrl && (
                 <img
                   src={furnitureProduct.imageUrl[0]}
                   alt={furnitureProduct.name}
                   className={`product-image ${
                     expandedFurnitureProduct === index ? 'expanded' : ''
                   }`}
                   onClick={() => handleFurnitureProductClick(furnitureProduct)}
                 />
               )}
               {isButtonVisible && (
                 <DelFurnitureProductButton
                  FurnitureProductName={furnitureProduct.name}
                  onDeleteFurnitureProduct={handleDeleteFurnitureProduct}
                 />
               )}
             </div>
             
           ))
           
         ) : (
           <div className="no-products-centered">
             <p
               style={{
                 marginLeft: '10%',
                 zIndex: 1,
               }}
               className={`${Array.isArray(furnitureProducts) &&
                furnitureProducts.length === 0
                 ? ''
                 : ''}`}
             >
               No products to display.
             </p>
           </div>
         )}
       </div>

       {enlargedView && selectedFurnitureProduct && (
         <div className="enlarged-view">
           <div className="enlarged-container">
             <div className="enlarged-product">
               <button className="close-button" onClick={() => setEnlargedView(false)}>X</button>
               <Carousel images={selectedFurnitureProduct.images} />

             </div>
           </div>
           <div className="product-info">
             <h2 className="enlarged-product-name">{selectedFurnitureProduct.name}</h2>
             <p className="enlarged-product-description">
               {fullDescriptions[selectedFurnitureProduct.name] || selectedFurnitureProduct.description}
             </p>
           </div>
         </div>
       )}
     </div>
     </div>
    </Layout>
  );
}

export default FurnitureProducts;