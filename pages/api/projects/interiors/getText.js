import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { interiorsProjectNames } = req.query;

      console.log("Received GET Request for interiorsproject text");
      console.log("Received Interiors Project Names (getText.js):", interiorsProjectNames);

      // Validate projectNames if needed
      if (!interiorsProjectNames || typeof interiorsProjectNames !== 'string') {
        console.error('Project names string is required');
        return res.status(400).json({ message: 'Project names string is required' });
      }

      // Split the comma-separated project names
      const interiorsProjectNamesArray = JSON.parse(interiorsProjectNames);
      


      // Initialize an object to store project text data
      const interiorsProjectsTextData = {};

     
// Loop through the project names and retrieve text data for each
for (const interiorsProjectName of interiorsProjectNamesArray) {
  console.log("Retrieving text data for project (getText.js):", interiorsProjectName);
  const interiorsProjectTextData = await kv.get(`interiorsproject:${interiorsProjectName}`);

  if (interiorsProjectTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedInteriorsProjectTextData = typeof interiorsProjectTextData === 'string' ? JSON.parse(interiorsProjectTextData) : interiorsProjectTextData;
      interiorsProjectsTextData[interiorsProjectName] = parsedInteriorsProjectTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for project:', interiorsProjectName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this project or setting a default value.
    }
  }
}



      console.log("Fetched Projects Text Data:", interiorsProjectsTextData);

      res.status(200).json(interiorsProjectsTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

