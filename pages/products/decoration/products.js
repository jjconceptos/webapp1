import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProductForm from '/pages/products/decoration/manage/addProduct';
import DelProductButton from 'pages/products/decoration/manage/delProduct';
import Layout from '/layouts/layout';
import { fetchDecorationProductsData } from '/utils/fetchDecorationProducts';
import '/layouts/styles.css';

function decorationProducts() {
  const { state } = useAuth();
  const [showDecorationProductForm, setShowDecorationProductForm] = useState(false);
  const [decorationProducts, setDecorationProducts] = useState([]);
  const [expandedDecorationProduct, setExpandedDecorationProduct] = useState(null);
  const [selectedDecorationProduct, setSelectedDecorationProduct] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decorationProductsData = await fetchDecorationProductsData();
        setDecorationProducts(
          decorationProductsData.map((decorationProduct) => ({
            ...decorationProduct,
            description: decorationProduct.description.length > 8
              ? decorationProduct.description.slice(0, 8) + '...'
              : decorationProduct.description,
          }))
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

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
            <button onClick={handleDecorationProductAddClick}>Add product</button>
          )}
        </div>
        {showDecorationProductForm && (
          <div>
            <h2></h2>
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
          <div className="enlarged-product">
            <h2>{selectedDecorationProduct.name}</h2>
            <p>{selectedDecorationProduct.description}</p>
            <img
              src={selectedDecorationProduct.imageUrl}
              alt={selectedDecorationProduct.name}
              className="enlarged-product-image"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default decorationProducts;