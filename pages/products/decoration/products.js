import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProductForm from '/pages/products/decoration/manage/addProduct';
import DelProductButton from 'pages/products/decoration/manage/delProduct';
import Layout from '/layouts/layout';
import { fetchDecorationProductsData } from '/utils/fetchDecorationProducts';


function DecorationProducts() {
  const { state } = useAuth();
  const [showDecorationProductForm, setShowDecorationProductForm] = useState(false);
  const [decorationProducts, setDecorationProducts] = useState([]);
  const [expandedDecorationProduct, setExpandedDecorationProduct] = useState(null);
  const [selectedDecorationProduct, setSelectedDecorationProduct] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);
  const [fullDescriptions, setFullDescriptions] = useState({});

 // Fetch products when the component mounts
 useEffect(() => {
  const fetchData = async () => {
    try {
      const decorationProductsData = await fetchDecorationProductsData();
      const updatedDecorationProducts = decorationProductsData.map((decorationProduct) => ({
        ...decorationProduct,
        // Limit the description only if the product is not expanded
        description:
          expandedDecorationProduct === null
            ? decorationProduct.description.length > 8
              ? decorationProduct.description.slice(0, 8) + '...'
              : decorationProduct.description
            : decorationProduct.description,
      }));
      setDecorationProducts(updatedDecorationProducts);

      // Store the full descriptions separately
      const fullDescs = decorationProductsData.reduce(
        (acc, decorationProduct) => ({
          ...acc,
          [decorationProduct.name]: decorationProduct.description,
        }),
        {}
      );
      setFullDescriptions(fullDescs);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchData();
}, [expandedDecorationProduct]);

  const handleDecorationProductAddClick = () => {
    setShowDecorationProductForm(true);
  };

  const handleDecorationProductClick = (decorationProduct) => {
    if (decorationProduct) {
      setSelectedDecorationProduct(decorationProduct);
      setEnlargedView(!enlargedView);
      setShowDecorationProductForm(false);
    } else {
      setShowDecorationProductForm((prevShowDecorationProductForm) => !prevShowDecorationProductForm);
    }
  };

  const handleDecorationProductAdded = async () => {
    try {
      const updatedDecorationProducts = await fetchDecorationProductsData();
      setDecorationProducts(
        updatedDecorationProducts.map((decorationProduct) => ({
          ...decorationProduct,
          description: decorationProduct.description.length > 8
            ? decorationProduct.description.slice(0, 8) + '...'
            : decorationProduct.description,
        }))
      );
      console.log('Updated products:', updatedDecorationProducts);
    } catch (error) {
      console.error('Error handling added product:', error);
    }
  };

  const handleDecorationProductSubmit = async (decorationProduct) => {
    if (decorationProduct.name && decorationProduct.description) {
      setShowDecorationProductForm(false);
      handleProductAdded(decorationProduct.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteDecorationProduct = async (decorationProductName) => {
    try {
      const updatedDecorationProducts = decorationProducts.filter((decorationProduct) => decorationProduct.name !== decorationProductName);
      setDecorationProducts(updatedDecorationProducts);

      if (expandedDecorationProduct === decorationProductName) {
        setExpandedDecorationProduct(null);
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
   <button onClick={handleDecorationProductAddClick}>Add product</button>
 )}
</div>



       {showDecorationProductForm && (
         <div>
           
           <ProductForm
             onSubmit={handleDecorationProductSubmit}
             decorationProducts={decorationProducts}
             onDecorationProductAdded={handleDecorationProductAdded}
           />
         </div>
       )}

       <div className="pro-grid">
         {Array.isArray(decorationProducts) && decorationProducts.length > 0 ? (
           decorationProducts.map((decorationProduct, index) => (
             <div
               key={index}
               className={`pro-card ${
                 expandedDecorationProduct === index ? 'expanded' : ''
               }`}
             >
               <h3
                 onClick={() =>
                   setExpandedDecorationProduct(
                     expandedDecorationProduct === index ? null : index
                   )
                 }
               >
                 {decorationProduct.name}
               </h3>
               <p
                 className={`product-description ${
                   expandedDecorationProduct === index ? 'expanded' : ''
                 }`}
               >
                 {decorationProduct.description}
               </p>
               {decorationProduct.imageUrl && (
                 <img
                   src={decorationProduct.imageUrl}
                   alt={decorationProduct.name}
                   className={`product-image ${
                     expandedDecorationProduct === index ? 'expanded' : ''
                   }`}
                   onClick={() => handleDecorationProductClick(decorationProduct)}
                 />
               )}
               {isButtonVisible && (
                 <DelProductButton
                   decorationProductName={decorationProduct.name}
                   onDeleteDecorationProduct={handleDeleteDecorationProduct}
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
               className={`${Array.isArray(decorationProducts) &&
                decorationProducts.length === 0
                 ? ''
                 : ''}`}
             >
               No products to display.
             </p>
           </div>
         )}
       </div>

       {enlargedView && selectedDecorationProduct && (
         <div className="enlarged-view">
           <div className="enlarged-container">
             <div className="enlarged-product">
               <button className="close-button" onClick={() => setEnlargedView(false)}>X</button>
               <img
                 className="enlarged-product-img"
                 src={selectedDecorationProduct.imageUrl}
                 alt={selectedDecorationProduct.name}
               />
             </div>
           </div>
           <div className="product-info">
             <h2 className="enlarged-product-name">{selectedDecorationProduct.name}</h2>
             <p className="enlarged-product-description">
               {fullDescriptions[selectedDecorationProduct.name] || selectedDecorationProduct.description}
             </p>
           </div>
         </div>
       )}

     </div>
    </Layout>
  );
}

export default DecorationProducts;