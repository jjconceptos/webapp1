export async function fetchInteriorsProjectsData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching project names
    const interiorsProjectNamesURL = `${apiBaseUrl}/api/projects/interiors/getProjectNames`;
    console.log('Fetching URL (fetchProjects.js) for: ', interiorsProjectNamesURL);

    const interiorsProjectNamesResponse = await fetch(interiorsProjectNamesURL);
    if (!interiorsProjectNamesResponse.ok) {
      throw new Error('Failed to fetch product names');
    }

    const interiorsProjectNamesData = await interiorsProjectNamesResponse.json();
    console.log('Received Product Names (fetchProjects.js): ', interiorsProjectNamesData);

    // Construct the URL for fetching project text
    const textURL = `${apiBaseUrl}/api/projects/interiors/getText?interiorsProjectNames=${encodeURIComponent(JSON.stringify(interiorsProjectNamesData))}`;
    console.log('Fetching response for getText.js (fetchProjects.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching project image
    const imageURL = `${apiBaseUrl}/api/projects/interiors/getImage?interiorsProjectNames=${encodeURIComponent(interiorsProjectNamesData)}`;
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
    const combinedInteriorsProjects = combineTextAndImage(textData, imageData, interiorsProjectNamesData);

    return combinedInteriorsProjects;
  } catch (error) {
    console.error('Error fetching projects (fetchInteriorsProjects.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, interiorsProjectNamesData) {
  // Convert imageData to an array of project objects
  const imageInteriorsProjectsArray = imageData.signedUrls;

  // Convert textData to an array of project objects
  const textInteriorsProjectsArray = Object.values(textData);

  // Combine the filtered data
  const combinedInteriorsProjects = textInteriorsProjectsArray.map((textInteriorsProject) => {
    const matchingImageInteriorsProject = imageInteriorsProjectsArray.find((imageInteriorsProject) =>
      imageInteriorsProject[0].toLowerCase().includes(`${textInteriorsProject.name.toLowerCase()}.jpg`)
    );
    return {
      ...textInteriorsProject,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageInteriorsProject ? matchingImageInteriorsProject[0] : null,
    };
  });

  return combinedInteriorsProjects;
}