export async function fetchFurnitureProductsData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching project names
    const furnitureProductNamesURL = `${apiBaseUrl}/api/products/furniture/getProductNames`;
    console.log('Fetching URL (fetchProducts.js) for: ', furnitureProductNamesURL);

    const furnitureProductNamesResponse = await fetch(furnitureProductNamesURL);
    if (!furnitureProductNamesResponse.ok) {
      throw new Error('Failed to fetch product names');
    }

    const furnitureProductNamesData = await furnitureProductNamesResponse.json();
    console.log('Received Product Names (fetchProducts.js): ', furnitureProductNamesData);

      // Extract product names from the array of objects
    const productNamesArray = furnitureProductNamesData.map(product => Object.keys(product)[0]);

    // Construct the URL for fetching product text
    const textURL = `${apiBaseUrl}/api/products/furniture/getText?furnitureProductNames=${encodeURIComponent(JSON.stringify(productNamesArray))}`;
    console.log('Fetching response for getText.js (fetchProducts.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching product image
    console.log('furnitureProductNames sent to getImage.js (fetchProducts.js): ', furnitureProductNamesData);
    const imageURL = `${apiBaseUrl}/api/products/furniture/getImage?furnitureProductNames=${encodeURIComponent(JSON.stringify(furnitureProductNamesData))}`;
    console.log('imageUrl (fetchProducts.js): ', imageURL);
    const imageResponse = await fetch(imageURL);
    console.log('Response (fetchProducts.js): ', imageResponse);

    // Check if the responses are successful
    if (!textResponse.ok || !imageResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const textData = await textResponse.json();
    const imageData = await imageResponse.json();

   

    // Combine text and image data
    const combinedFurnitureProducts = combineTextAndImage(textData, imageData, furnitureProductNamesData);

    return combinedFurnitureProducts;
  } catch (error) {
    console.error('Error fetching projects (fetchFurnitureProducts.js):', error);
    return [];
  }
}


function combineTextAndImage(textData, imageData, furnitureProductNamesData) {
  console.log('imageData (fetchFurnitureProducts):', imageData);
  console.log('textData (fetchFurnitureProducts):', textData);
  console.log('furnitureProductNamesData (fetchFurnitureProducts):', furnitureProductNamesData);

  // Extract product names from the furnitureProductNamesData
  const productNames = Object.keys(textData);

  // Flatten the array of arrays into a single array of image URLs
  const imageUrls = imageData.signedUrls.flat();

  // Combine text and image data
  const combinedFurnitureProducts = productNames.map((productName) => {
    // Log the product name for debugging
    console.log('Processing product:', productName);

    // Find the matching image URL for the current product
const matchingImageUrl = imageUrls.find(url => {
  // Extract the product name from the URL
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];
  const productNameIndex = fileName.indexOf(productName.toLowerCase());
  
  // Check if the URL contains the product name followed by a hyphen and index
  if (productNameIndex !== -1) {
      const indexStart = productNameIndex + productName.length;
      const index = fileName.substring(indexStart, fileName.indexOf('.jpg', indexStart));
      return !isNaN(index); // Check if the index is a valid number
  }
  
  return false;
});

// Log the matching image URL for debugging
console.log('Matching Image URL for', productName, ':', matchingImageUrl);

    return {
      ...textData[productName],
      // Set imageUrl to the matching URL
      imageUrl: matchingImageUrl || null,
    };
  });

  // Log the combined data before returning
  console.log('Combined Furniture Products:', combinedFurnitureProducts);
  return combinedFurnitureProducts;
}