import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProductForm from '/pages/products/manage/addProduct';
import DelProductButton from 'pages/products/manage/delProduct';
import Layout from '/layouts/layout';
import { fetchProductsData } from '/utils/fetchProducts';
import '/layouts/styles.css';

function Products() {
  const { state } = useAuth();
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProductsData();
        setProducts(
          productsData.map((product) => ({
            ...product,
            description: product.description.length > 8
              ? product.description.slice(0, 8) + '...'
              : product.description,
          }))
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleProductAddClick = () => {
    setShowProductForm(true);
  };

  const handleProductClick = (product) => {
    if (product) {
      setSelectedProduct(product);
      setEnlargedView(!enlargedView);
      setShowProductForm(false);
    } else {
      setShowProductForm((prevShowProductForm) => !prevShowProductForm);
    }
  };

  const handleProductAdded = async () => {
    try {
      const updatedProducts = await fetchProductsData();
      setProducts(
        updatedProducts.map((product) => ({
          ...product,
          description: product.description.length > 8
            ? product.description.slice(0, 8) + '...'
            : product.description,
        }))
      );
      console.log('Updated products:', updatedProducts);
    } catch (error) {
      console.error('Error handling added product:', error);
    }
  };

  const handleProductSubmit = async (product) => {
    if (product.name && product.description) {
      setShowProductForm(false);
      handleProductAdded(product.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteProduct = async (productName) => {
    try {
      const updatedProducts = projects.filter((product) => product.name !== productName);
      setProducts(updatedProducts);

      if (expandedProduct === productName) {
        setExpandedProduct(null);
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
            <button onClick={handleProductAddClick}>Add product</button>
          )}
        </div>
        {showProductForm && (
          <div>
            <h2></h2>
            <ProductForm
              onSubmit={handleProductSubmit}
              products={products}
              onProductAdded={handleProductAdded}
            />
          </div>
        )}

        <div className="pro-grid">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className={`pro-card ${
                  expandedProduct === index ? 'expanded' : ''
                }`}
              >
                <h3
                  onClick={() =>
                    setExpandedProduct(
                      expandedProduct === index ? null : index
                    )
                  }
                >
                  {product.name}
                </h3>
                <p
                  className={`product-description ${
                    expandedProduct === index ? 'expanded' : ''
                  }`}
                >
                  {product.description}
                </p>
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className={`product-image ${
                      expandedProduct === index ? 'expanded' : ''
                    }`}
                    onClick={() => handleProductClick(product)}
                  />
                )}
                {isButtonVisible && (
                  <DelProductButton
                    productName={product.name}
                    onDeleteProduct={handleDeleteProduct}
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
                className={`${Array.isArray(products) &&
                  products.length === 0
                  ? ''
                  : ''}`}
              >
                No products to display.
              </p>
            </div>
          )}
        </div>

        {enlargedView && selectedProduct && (
          <div className="enlarged-product">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="enlarged-product-image"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Products;