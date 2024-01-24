import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProductForm from '/pages/products/furniture/manage/addProduct';
import DelProductButton from 'pages/products/furniture/manage/delProduct';
import Layout from '/layouts/layout';
import { fetchFurnitureProductsData } from '/utils/fetchFurnitureProducts';
import '/layouts/styles.css';

function furnitureProducts() {
  const { state } = useAuth();
  const [showFurnitureProductForm, setShowFurnitureProductForm] = useState(false);
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [expandedFurnitureProduct, setExpandedFurnitureProduct] = useState(null);
  const [selectedFurnitureProduct, setSelectedFurnitureProduct] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const furnitureProductsData = await fetchFurnitureProductsData();
        setFurnitureProducts(
          furnitureProductsData.map((furnitureProduct) => ({
            ...furnitureProduct,
            description: furnitureProduct.description.length > 8
              ? furnitureProduct.description.slice(0, 8) + '...'
              : furnitureProduct.description,
          }))
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

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
      <style jsx global>{`
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
      `}</style>
      <div>
        <div className="add-products">
          {isButtonVisible && (
            <button onClick={handleFurnitureProductAddClick}>Add product</button>
          )}
        </div>
        {showFurnitureProductForm && (
          <div>
            <h2></h2>
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
          <div className="enlarged-product">
            <h2>{selectedFurnitureProduct.name}</h2>
            <p>{selectedFurnitureProduct.description}</p>
            <img
              src={selectedFurnitureProduct.imageUrl}
              alt={selectedFurnitureProduct.name}
              className="enlarged-product-image"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default furnitureProducts;