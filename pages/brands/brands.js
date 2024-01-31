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
        .no-brands-centered {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .add-brands {
          position: absolute;
          top: 14%;
          left: 10%;
          transform: translate(-50%, -50%);
        }

        .pro-grid {
          position: absolute;
          top: 40%;
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

        .enlarged-brand {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Align to the left */
          justify-content: center;
        }
        
        .enlarged-brand-img {
          width: 80%; 
          max-width: 100%;
          height: auto;
          max-height: 80vh; 
          object-fit: contain;
          margin-left: 15%;
          margin-top: 10%;
        }

        

        .enlarged-brand-name {
          font-size: 3vw; /* Adjust font size as needed */
          margin-left: 20%; /* Adjust margin-left as needed */
          margin-top: 5%; /* Adjust margin-top as needed */
          color: #f3f0e9;
        }
      
        .enlarged-brand-description {
          font-size: 2vw;
          margin-left: 20%;
          margin-top: 2%;
          color: #f3f0e9;
          white-space: pre-line; /* Preserve newlines and spaces */
          overflow-wrap: break-word; /* Wrap long words */
          max-width: 75%; /* Adjust as needed */
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

          .no-brands-centered {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
  
          .add-brands {
            position: absolute;
            top: 14%;
            left: 20%;
            transform: translate(-50%, -50%);
          }
  
          .pro-grid {
            position: absolute;
            top: 40%;
            left: 0%; /* Adjust as needed to move it to the right */
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding:15px;
            
            
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
            background-color: rgba(0, 0, 0, 0.94);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
          }
          
          .enlarged-brand-img {
            width: 70%;
            max-width: 100vh;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
          }
          
          .enlarged-brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center; /* Center text within the container */
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
            max-width: 75%;
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
       
       <div className="add-brands">
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

       <div className="pro-grid">
         {Array.isArray(brands) && brands.length > 0 ? (
           brands.map((brand, index) => (
             <div
               key={index}
               className={`pro-card ${
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
    </Layout>
  );
}

export default Brands;