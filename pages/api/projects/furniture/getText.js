import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { furnitureProjectNames } = req.query;

      console.log("Received GET Request for furniture project text");
      console.log("Received Furniture Project Names (getText.js):", furnitureProjectNames);

      // Validate projectNames if needed
      if (!furnitureProjectNames || typeof furnitureProjectNames !== 'string') {
        console.error('Project names string is required');
        return res.status(400).json({ message: 'Project names string is required' });
      }

      // Split the comma-separated project names
      const furnitureProjectNamesArray = JSON.parse(furnitureProjectNames);
      


      // Initialize an object to store project text data
      const furnitureProjectsTextData = {};

     
// Loop through the project names and retrieve text data for each
for (const furnitureProjectName of furnitureProjectNamesArray) {
  console.log("Retrieving text data for project (getText.js):", furnitureProjectName);
  const furnitureProjectTextData = await kv.get(`furnitureproject:${furnitureProjectName}`);

  if (furnitureProjectTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedFurnitureProjectTextData = typeof furnitureProjectTextData === 'string' ? JSON.parse(furnitureProjectTextData) : furnitureProjectTextData;
      furnitureProjectsTextData[furnitureProjectName] = parsedFurnitureProjectTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for project:', furnitureProjectName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this project or setting a default value.
    }
  }
}



      console.log("Fetched Projects Text Data:", furnitureProjectsTextData);

      res.status(200).json(furnitureProjectsTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

