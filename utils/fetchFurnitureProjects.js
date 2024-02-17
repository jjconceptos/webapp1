export async function fetchFurnitureProjectsData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching project names
    const furnitureProjectNamesURL = `${apiBaseUrl}/api/projects/furniture/getProjectNames`;
    console.log('Fetching URL (fetchProjects.js) for: ', furnitureProjectNamesURL);

    const furnitureProjectNamesResponse = await fetch(furnitureProjectNamesURL);
    if (!furnitureProjectNamesResponse.ok) {
      throw new Error('Failed to fetch product names');
    }

    const furnitureProjectNamesData = await furnitureProjectNamesResponse.json();
    console.log('Received Product Names (fetchProjects.js): ', furnitureProjectNamesData);

    // Construct the URL for fetching project text
    const textURL = `${apiBaseUrl}/api/projects/furniture/getText?furnitureProjectNames=${encodeURIComponent(JSON.stringify(furnitureProjectNamesData))}`;
    console.log('Fetching response for getText.js (fetchProjects.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching project image
    const imageURL = `${apiBaseUrl}/api/projects/furniture/getImage?furnitureProjectNames=${encodeURIComponent(furnitureProjectNamesData)}`;
    console.log('Fetching response for getImage.js (fetchProjects.js): ', imageURL);
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
    const combinedFurnitureProjects = combineTextAndImage(textData, imageData, furnitureProjectNamesData);

    return combinedFurnitureProjects;
  } catch (error) {
    console.error('Error fetching projects (fetchFurnitureProjects.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, furnitureProjectNamesData) {
  // Convert imageData to an array of project objects
  const imageFurnitureProjectsArray = imageData.signedUrls;

  // Convert textData to an array of project objects
  const textFurnitureProjectsArray = Object.values(textData);

  // Combine the filtered data
  const combinedFurnitureProjects = textFurnitureProjectsArray.map((textFurnitureProject) => {
    const matchingImageFurnitureProject = imageFurnitureProjectsArray.find((imageFurnitureProject) =>
      imageFurnitureProject[0].toLowerCase().includes(`${textFurnitureProject.name.toLowerCase()}.jpg`)
    );
    console.log("matchingImageFurnitureProject (fetchFurnitureProjects.js: ", matchingImageFurnitureProject)
    return {
      ...textFurnitureProject,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageFurnitureProject ? matchingImageFurnitureProject[0] : null,
    };
  });

  return combinedFurnitureProjects;
}