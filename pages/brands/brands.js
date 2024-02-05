import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import BrandForm from '/pages/brands/manage/addBrand';
import DelBrandButton from 'pages/brands/manage/delBrand';
import Layout from '/layouts/layout';
import { fetchBrandsData } from '/utils/fetchBrands';




function Brands() {
  const { state } = useAuth();
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [brands, setBrands] = useState([]);
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);
  const [fullDescriptions, setFullDescriptions] = useState({});

 // Fetch brands when the component mounts
 useEffect(() => {
  const fetchData = async () => {
    try {
      const brandsData = await fetchBrandsData();
      const updatedBrands = brandsData.map((brand) => ({
        ...brand,
        // Limit the description only if the brand is not expanded
        description:
          expandedBrand === null
            ? brand.description.length > 8
              ? brand.description.slice(0, 8) + '...'
              : brand.description
            : brand.description,
      }));
      setBrands(updatedBrands);

      // Store the full descriptions separately
      const fullDescs = brandsData.reduce(
        (acc, brand) => ({
          ...acc,
          [brand.name]: brand.description,
        }),
        {}
      );
      setFullDescriptions(fullDescs);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  fetchData();
}, [expandedBrand]);

  const handleBrandAddClick = () => {
    setShowBrandForm(true);
  };

  const handleBrandClick = (brand) => {
    if (brand) {
      setSelectedBrand(brand);
      setEnlargedView(!enlargedView);
      setShowBrandForm(false);
    } else {
      setShowBrandForm((prevShowBrandForm) => !prevShowBrandForm);
    }
  };

  const handleBrandAdded = async () => {
    try {
      const updatedBrands = await fetchBrandsData();
      setBrands(
        updatedBrands.map((brand) => ({
          ...brand,
          description: brand.description.length > 8
            ? brand.description.slice(0, 8) + '...'
            : brand.description,
        }))
      );
      console.log('Updated brands:', updatedBrands);
    } catch (error) {
      console.error('Error handling added brand:', error);
    }
  };

  const handleBrandSubmit = async (brand) => {
    if (brand.name && brand.description) {
      setShowBrandForm(false);
      handleBrandAdded(brand.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteBrand = async (brandName) => {
    try {
      const updatedBrands = brands.filter((brand) => brand.name !== brandName);
      setBrands(updatedBrands);

      if (expandedBrand === brandName) {
        setExpandedBrand(null);
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
        
        .no-brands-centered {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .add-brands-section {
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
          grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
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
        
        .enlarged-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        .enlarged-brand-img {
          width: 70vw;
          max-width: 100vw;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
          margin: auto;
        }
        
        .enlarged-brand-name {
          font-size: 3vw;
          color: #f3f0e9;
          margin-top: 10vh;
        }
        
        .enlarged-brand-description {
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

       
      `}</style>
      <div className="brands-container">
      <div className="add-brands-section">
       <div>
      {isButtonVisible && (
        <button onClick={handleBrandAddClick}>Add brand</button>
      )}
      </div>
            {showBrandForm && (
              <div>
                
                <BrandForm
                  onSubmit={handleBrandSubmit}
                  brands={brands}
                  onBrandAdded={handleBrandAdded}
                />
              </div>
            )}
      </div>
      <div className="products-section">
       <div className="products-grid">
         {Array.isArray(brands) && brands.length > 0 ? (
           brands.map((brand, index) => (
             <div
               key={index}
               className={`products-card ${
                 expandedBrand === index ? 'expanded' : ''
               }`}
             >
               <h3
                 onClick={() =>
                   setExpandedBrand(
                     expandedBrand === index ? null : index
                   )
                 }
               >
                 {brand.name}
               </h3>
               <p
                 className={`brand-description ${
                   expandedBrand === index ? 'expanded' : ''
                 }`}
               >
                 {brand.description}
               </p>
               {brand.imageUrl && (
                 <img
                   src={brand.imageUrl}
                   alt={brand.name}
                   className={`brand-image ${
                     expandedBrand === index ? 'expanded' : ''
                   }`}
                   onClick={() => handleBrandClick(brand)}
                 />
               )}
               {isButtonVisible && (
                 <DelBrandButton
                   BrandName={brand.name}
                   onDeleteBrand={handleDeleteBrand}
                 />
               )}
             </div>
             
           ))
           
         ) : (
           <div className="no-brands-centered">
             <p
               style={{
                 marginLeft: '10%',
                 zIndex: 1,
               }}
               className={`${Array.isArray(brands) &&
                brands.length === 0
                 ? ''
                 : ''}`}
             >
               No brands to display.
             </p>
           </div>
         )}
       </div>

       {enlargedView && selectedBrand && (
         <div className="enlarged-view">
           <div className="enlarged-container">
             <div className="enlarged-brand">
               <button className="close-button" onClick={() => setEnlargedView(false)}>X</button>
               <img
                 className="enlarged-brand-img"
                 src={selectedBrand.imageUrl}
                 alt={selectedBrand.name}
               />
             </div>
           </div>
           <div className="brand-info">
             <h2 className="enlarged-brand-name">{selectedBrand.name}</h2>
             <p className="enlarged-brand-description">
               {fullDescriptions[selectedBrand.name] || selectedBrand.description}
             </p>
           </div>
         </div>
       )}
     </div>
     </div>
    </Layout>
  );
}

export default Brands;