export async function fetchDecorationProductsData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching product names
    const decorationProductNamesURL = `${apiBaseUrl}/api/products/decoration/getProductNames`;
    console.log('Fetching URL (fetchProducts.js) for: ', decorationProductNamesURL);

    const decorationProductNamesResponse = await fetch(decorationProductNamesURL);
    if (!decorationProductNamesResponse.ok) {
      throw new Error('Failed to fetch decoration product names');
    }

    const decorationProductNamesData = await decorationProductNamesResponse.json();
    console.log('Received Product Names (fetchProducts.js): ', decorationProductNamesData);

    // Construct the URL for fetching product text
    const textURL = `${apiBaseUrl}/api/products/decoration/getText?decorationProductNames=${encodeURIComponent(JSON.stringify(decorationProductNamesData))}`;
    console.log('Fetching response for getText.js (fetchDecorationProducts.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching product image
    const imageURL = `${apiBaseUrl}/api/products/decoration/getImage?decorationProductNames=${encodeURIComponent(decorationProductNamesData)}`;
    console.log('Fetching response for getImage.js (fetchDecorationProducts.js): ', imageURL);
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
    const combinedDecorationProducts = combineTextAndImage(textData, imageData, decorationProductNamesData);

    return combinedDecorationProducts;
  } catch (error) {
    console.error('Error fetching products (fetchDecorationProducts.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, decorationProductNamesData) {
  // Convert imageData to an array of project objects
  const imageDecorationProductsArray = imageData.signedUrls;

  // Convert textData to an array of project objects
  const textDecorationProductsArray = Object.values(textData);

  // Combine the filtered data
  const combinedDecorationProducts = textDecorationProductsArray.map((textDecorationProduct) => {
    const matchingImageDecorationProduct = imageDecorationProductsArray.find((imageDecorationProduct) =>
      imageDecorationProduct[0].toLowerCase().includes(`${textDecorationProduct.name.toLowerCase()}.jpg`)
    );
    return {
      ...textDecorationProduct,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageDecorationProduct ? matchingImageDecorationProduct[0] : null,
    };
  });

  return combinedDecorationProducts;
}