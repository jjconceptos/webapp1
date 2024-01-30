import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProductForm from '/pages/products/furniture/manage/addProduct';
import DelProductButton from 'pages/products/furniture/manage/delProduct';
import Layout from '/layouts/layout';
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
        const updatedFurnitureProducts = furnitureProductsData.map((furnitureProduct) => ({
          ...furnitureProduct,
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
            [furnitureProduct.name]: furnitureProduct.description,
          }),
          {}
        );
        setFullDescriptions(fullDescs);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchData();
  }, [expandedFurnitureProduct]);

  const handleFurnitureProductAddClick = () => {
    setShowFurnitureProductForm(true);
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
      console.log('Updated products:', updatedFurnitureProducts);
    } catch (error) {
      console.error('Error handling added product:', error);
    }
  };

  const handleFurnitureProductSubmit = async (furnitureProduct) => {
    if (furnitureProduct.name && furnitureProduct.description) {
      setShowFurnitureProductForm(false);
      handleProductAdded(furnitureProduct.name);
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
        .no-products-centered {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .add-products {
          position: absolute;
          top: 14%;
          left: 10%;
          transform: translate(-50%, -50%);
        }

        .pro-grid {
          position: absolute;
          top: 50%;
          left: 0%; /* Adjust as needed to move it to the right */
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding:15px;
          border-radius: 10px;
        }
        
        .pro-card {
          border: 1px solid #ddd;
          padding: 10px;
        }

        .enlarged-view {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.94); /* Adjust transparency as needed */
          display: flex;
          z-index: 100; /* Higher z-index than other elements */
        }

        
        .enlarged-container {
          max-width: 80%; /* Adjust as needed */
          max-height: 80vh; /* Adjust as needed */
          overflow: hidden;
        }

        .enlarged-product {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Align to the left */
          justify-content: center;
        }
        
        .enlarged-product-img {
          width: 80%; 
          max-width: 100%;
          height: auto;
          max-height: 80vh; 
          object-fit: contain;
          margin-left: 15%;
          margin-top: 10%;
        }

        .product-name {
         
        }
      
        .product-description {
         
        }

        .enlarged-product-name {
          font-size: 3vw; /* Adjust font size as needed */
          margin-left: 20%; /* Adjust margin-left as needed */
          margin-top: 5%; /* Adjust margin-top as needed */
          color: #f3f0e9;
        }
      
        .enlarged-product-description {
          font-size: 2vw;
          margin-left: 20%;
          margin-top: 2%;
          color: #f3f0e9;
          white-space: pre-line; /* Preserve newlines and spaces */
          overflow-wrap: break-word; /* Wrap long words */
          max-width: 60%; /* Adjust as needed */
        }
          
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: white; /* Adjust as needed */
          outline: none;
          transition: color 0.3s ease;
        }
        
        .close-button:hover {
          color: lightgray; /* Adjust hover color as needed */
        }

        @media only screen and (max-width: 600px) {

          .no-products-centered {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
  
          .add-products {
            position: absolute;
            top: 14%;
            left: 20%;
            transform: translate(-50%, -50%);
          }
  
          .pro-grid {
            position: absolute;
            top: 50%;
            left: 0%; /* Adjust as needed to move it to the right */
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding:15px;
            border-radius: 10px;
          }
          
          .pro-card {
            border: 1px solid #ddd;
            padding: 10px;
          }
  
          .enlarged-view {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.94); /* Adjust transparency as needed */
            display: flex;
            z-index: 100; /* Higher z-index than other elements */
          }
  
          
          .enlarged-container {
            max-width: 80%; /* Adjust as needed */
            max-height: 80vh; /* Adjust as needed */
            overflow: hidden;
          }
  
          .enlarged-product {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align to the left */
            justify-content: center;
          }
          
          .enlarged-product-img {
            width: 80%; 
            max-width: 100%;
            height: auto;
            max-height: 80vh; 
            object-fit: contain;
            margin-left: 15%;
            margin-top: 10%;
          }
  
         
  
          .enlarged-product-name {
            font-size: 3vw; /* Adjust font size as needed */
            margin-left: 20%; /* Adjust margin-left as needed */
            margin-top: 5%; /* Adjust margin-top as needed */
            color: #f3f0e9;
          }
        
          .enlarged-product-description {
            font-size: 2vw;
            margin-left: 20%;
            margin-top: 2%;
            color: #f3f0e9;
            white-space: pre-line; /* Preserve newlines and spaces */
            overflow-wrap: break-word; /* Wrap long words */
            max-width: 60%; /* Adjust as needed */
          }
            
          .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: white; /* Adjust as needed */
            outline: none;
            transition: color 0.3s ease;
          }
          
          .close-button:hover {
            color: lightgray; /* Adjust hover color as needed */
          }

       
        @media only screen and (min-width: 601px) and (max-width: 768px) {
          
        }


        @media only screen and (min-width: 769px) and (max-width: 1024px) {
          
        }
      `}</style>
      <div>
       
       <div className="add-products">
 {isButtonVisible && (
   <button onClick={handleFurnitureProductAddClick}>Add product</button>
 )}
</div>



       {showFurnitureProductForm && (
         <div>
           
           <ProductForm
             onSubmit={handleFurnitureProductSubmit}
             furnitureProducts={furnitureProducts}
             onFurnitureProductAdded={handleFurnitureProductAdded}
           />
         </div>
       )}

       <div className="pro-grid">
         {Array.isArray(furnitureProducts) && furnitureProducts.length > 0 ? (
           furnitureProducts.map((furnitureProduct, index) => (
             <div
               key={index}
               className={`pro-card ${
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
                   src={furnitureProduct.imageUrl}
                   alt={furnitureProduct.name}
                   className={`product-image ${
                     expandedFurnitureProduct === index ? 'expanded' : ''
                   }`}
                   onClick={() => handleFurnitureProductClick(furnitureProduct)}
                 />
               )}
               {isButtonVisible && (
                 <DelProductButton
                   furnitureProductName={furnitureProduct.name}
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
               <img
                 className="enlarged-product-img"
                 src={selectedFurnitureProduct.imageUrl}
                 alt={selectedFurnitureProduct.name}
               />
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
    </Layout>
  );
}

export default FurnitureProducts;