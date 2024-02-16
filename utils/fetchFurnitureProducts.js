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

    // Construct the URL for fetching product text
    const textURL = `${apiBaseUrl}/api/products/furniture/getText?furnitureProductNames=${encodeURIComponent(JSON.stringify(furnitureProductNamesData))}`;
    console.log('Fetching response for getText.js (fetchProducts.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching product image
    console.log('furnitureProductNames sent to getImage.js (fetchProducts.js): ', furnitureProductNamesData);
    const imageURL = `${apiBaseUrl}/api/products/furniture/getImage?furnitureProductNames=${encodeURIComponent(JSON.stringify(furnitureProductNamesData))}`;
    console.log('Fetching response for getImage.js (fetchProducts.js): ', imageURL);
    const imageResponse = await fetch(imageURL);

    // Check if the responses are successful
    if (!textResponse.ok || !imageResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const textData = await textResponse.json();
    const imageData = await imageResponse.json();

    console.log('Text Data:', textData);
    console.log('Image Data:', imageData);

    // Combine text and image data
    const combinedFurnitureProducts = combineTextAndImage(textData, imageData, furnitureProductNamesData);

    return combinedFurnitureProducts;
  } catch (error) {
    console.error('Error fetching projects (fetchFurnitureProducts.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, furnitureProductNamesData) {
  // Convert imageData to an array of project objects
  const imageFurnitureProductsArray = imageData.signedUrls;

  // Convert textData to an array of project objects
  const textFurnitureProductsArray = Object.values(textData);

  // Combine the filtered data
  const combinedFurnitureProducts = textFurnitureProductsArray.map((textFurnitureProduct) => {
    const matchingImageFurnitureProduct = imageFurnitureProductsArray.find((imageFurnitureProduct) =>
      imageFurnitureProduct[0].toLowerCase().includes(`${textFurnitureProduct.name.toLowerCase()}.jpg`)
    );
    return {
      ...textFurnitureProduct,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageFurnitureProduct ? matchingImageFurnitureProduct[0] : null,
    };
  });

  return combinedFurnitureProducts;
}