export async function fetchBrandsData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching brand names
    const brandNamesURL = `${apiBaseUrl}/api/brands/getBrandNames`;
    console.log('Fetching URL (fetchBrands.js) for: ', brandNamesURL);

    const brandNamesResponse = await fetch(brandNamesURL);
    if (!brandNamesResponse.ok) {
      throw new Error('Failed to fetch product names');
    }

    const brandNamesData = await brandNamesResponse.json();
    console.log('Received Product Names (fetchBrands.js): ', brandNamesData);

    // Construct the URL for fetching brand text
    const textURL = `${apiBaseUrl}/api/brands/getText?brandNames=${encodeURIComponent(JSON.stringify(brandNamesData))}`;
    console.log('Fetching response for getText.js (fetchBrands.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching brand image
    const imageURL = `${apiBaseUrl}/api/brands/getImage?brandNames=${encodeURIComponent(brandNamesData)}`;
    console.log('Fetching response for getImage.js (fetchBrands.js): ', imageURL);
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
    const combinedBrands = combineTextAndImage(textData, imageData, brandNamesData);

    return combinedBrands;
  } catch (error) {
    console.error('Error fetching brands (fetchBrands.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, brandNamesData) {
  // Convert imageData to an array of brand objects
  const imageBrandsArray = imageData.signedUrls;

  // Convert textData to an array of brand objects
  const textBrandsArray = Object.values(textData);

  // Combine the filtered data
  const combinedBrands = textBrandsArray.map((textBrand) => {
    const matchingImageBrand = imageBrandsArray.find((imageBrand) =>
      imageBrand[0].toLowerCase().includes(`${textBrand.name.toLowerCase()}.jpg`)
    );
    return {
      ...textBrand,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageBrand ? matchingImageBrand[0] : null,
    };
  });

  return combinedBrands;
}