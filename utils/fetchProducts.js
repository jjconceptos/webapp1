export async function fetchProductsData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching project names
    const productNamesURL = `${apiBaseUrl}/api/products/getProductNames`;
    console.log('Fetching URL (fetchProducts.js) for: ', productNamesURL);

    const productNamesResponse = await fetch(productNamesURL);
    if (!productNamesResponse.ok) {
      throw new Error('Failed to fetch product names');
    }

    const productNamesData = await productNamesResponse.json();
    console.log('Received Product Names (fetchProducts.js): ', productNamesData);

    // Construct the URL for fetching project text
    const textURL = `${apiBaseUrl}/api/products/getText?productNames=${encodeURIComponent(JSON.stringify(productNamesData))}`;
    console.log('Fetching response for getText.js (fetchProducts.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching project image
    const imageURL = `${apiBaseUrl}/api/products/getImage?productNames=${encodeURIComponent(productNamesData)}`;
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
    const combinedProducts = combineTextAndImage(textData, imageData, productNamesData);

    return combinedProducts;
  } catch (error) {
    console.error('Error fetching projects (fetchProducts.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, productNamesData) {
  // Convert imageData to an array of project objects
  const imageProductsArray = imageData.signedUrls;

  // Convert textData to an array of project objects
  const textProjectsArray = Object.values(textData);

  // Combine the filtered data
  const combinedProducts = textProjectsArray.map((textProduct) => {
    const matchingImageProduct = imageProductsArray.find((imageProduct) =>
      imageProduct[0].toLowerCase().includes(`${textProduct.name.toLowerCase()}.jpg`)
    );
    return {
      ...textProduct,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageProduct ? matchingImageProduct[0] : null,
    };
  });

  return combinedProducts;
}