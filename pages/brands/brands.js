import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import BrandForm from '/pages/brands/manage/addBrand';
import { fetchBrandsData } from '/utils/fetchBrands';
import DelBrandButton from 'pages/brands/manage/delBrand';  
import Layout from '/layouts/layout';
import '/layouts/styles.css'; 


const brandsData = await fetchBrandsData();



function Brands() {
  
  const { state } = useAuth();
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [brands, setBrands] = useState([]); // State to hold fetched brands
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);



  // Define a function to fetch brands
  const fetchBrands = async () => {
    
    try {
      
      // Pass the brand names to fetchBrandsData
      
      // Log the URL from the first brand (assuming there is at least one brand)
      console.log('Brands received in fetchBrands function (brands.js):', brandsData);
        
      // Modify the descriptions to limit to 25 characters
      const modifiedBrands = brandsData.map((brand) => ({
        ...brand,
        description: brand.description.length > 8
          ? brand.description.slice(0, 8) + '...'
          : brand.description,
      }));

      // Set the modified brands data in your state
      setBrands(modifiedBrands);
    } catch (error) {
      console.error('Error fetching brands (brands.js):', error);
    }
  };

  useEffect(() => {
    // Fetch brands when the component mounts
    fetchBrands();
  }, []);

  const handleBrandAddClick = () => {
    setShowBrandForm(true);
  };

  const handleBrandClick = (brand) => {
    if (brand) {
      // If a brandis provided, set the selected brand and toggle the enlarged view
      setSelectedBrand(brand);
      setEnlargedView(!enlargedView);
      setShowBrandForm(false); // Close the "Add brand" form if it's open
    } else {
      // If no brand is provided, toggle the "Add brand" form
      setShowBrandForm((prevShowBrandForm) => !prevShowBrandForm);
    }
  };
  

  const handleBrandAdded = async () => {
    try {
      // Use fetchBrandsData to get the updated brand list
      const updatedBrands = await fetchBrandsData();
      
      // Update the brands state with the updated brand list
      setBrands(updatedBrands);
      
      console.log('Updated brands:', updatedBrands);
    } catch (error) {
      console.error('Error handling added brand:', error);
    }
  };



  const handleBrandSubmit = async (brand) => {
    // Validate and add the new brand to the list
    if (brand.name && brand.description) {
     
      setShowBrandForm(false);

      // Notify the parent component that a new brand has been added
      handleBrandAdded(brand.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteBrand = async (brandName) => {
    try {
      // Remove the deleted brandfrom the state
      const updatedBrands = brands.filter((brand) => brand.name !== brandName);
      setBrands(updatedBrands);
  
      // Clear the expanded brand view if it's the deleted one
      if (expandedBrand === brandName) {
        setExpandedBrand(null);
      }
  
      // Use the router to trigger a page refresh
      
    } catch (error) {
      console.error(error);
    }
  };
  

  const isButtonVisible = state.clearanceLevel == 1 || state.clearanceLevel == 2;

  return (
    <Layout>
   <style jsx>{`
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
        .brands-grid {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding: 15px;
          border-radius: 10px;
        }
        
        .brand-item {
          /* Remove position: absolute; */
          width: 100%;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          /* Remove transform and left/top */
        }
      
        .brand-item img {
          width: 100%; /* Make the image fill the circular container */
          height: 100%; /* Make sure the image fills the container */
          object-fit: contain;
          position: absolute;
          top: 0;
          left: 0;
        }

      `}</style>
      <div >
      <div className="add-brands">
        {isButtonVisible && (
          <button onClick={handleBrandAddClick}
        >
          Add brand
        </button>

        )}
        </div>
        {showBrandForm && (
          <div>
            
            <BrandForm onSubmit={handleBrandSubmit} brands={brands} onBrandAdded={handleBrandAdded} />
          </div>
        )}

       
       {/* Display the list of brands */}
       <div className="brands-grid">
        {Array.isArray(brands) && brands.length > 0 ? (
          brands.map((brand, index) => (
            <div key={index} className={`brand-item ${expandedBrand === index ? 'expanded' : ''}`}>
              {/* If you have an imageUrl, you can display it here */}
              {brand.imageUrl && (
                <img
                  src={brand.imageUrl}
                  alt={brand.name}
                  onClick={() => handleBrandClick(brand)}
                />
              )}
            </div>
          ))
        ) : (
          <div className="no-brands-centered">
            <p style={{
              marginLeft: '10%', // Adjust as needed
              zIndex: 1, // Use a numeric value
            }} className={`${Array.isArray(brands) && brands.length === 0 ? '' : ''}`}>
              No brands to display.
            </p>
          </div>
        )}
      </div>

{enlargedView && selectedBrand && (
<div className="enlarged-brand">
              <h2>{selectedBrand.name}</h2>
              <p>{selectedBrand.description}</p>
              {/* Add any other brand details you want to display */}
              <img
                src={selectedBrand.imageUrl}
                alt={selectedBrand.name}
                className="enlarged-brand-image"
              />
            </div>
          )}

      </div>

    </Layout>
  );
}

export default Brands;