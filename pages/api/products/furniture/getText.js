import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { furnitureProductNames } = req.query;

      console.log("Received GET Request for furniture product text");
      console.log("Received Furniture Product Names (getText.js):", furnitureProductNames);

      // Validate projectNames if needed
      if (!furnitureProductNames || typeof furnitureProductNames !== 'string') {
        console.error('Product names string is required');
        return res.status(400).json({ message: 'Product names string is required' });
      }

      // Split the comma-separated project names
      const furnitureProductNamesArray = JSON.parse(furnitureProductNames);
      


      // Initialize an object to store project text data
      const furnitureProductsTextData = {};

     
// Loop through the project names and retrieve text data for each
for (const furnitureProductName of furnitureProductNamesArray) {
  console.log("Retrieving text data for product (getText.js):", furnitureProductName);
  const furnitureProductTextData = await kv.get(`furnitureproduct:${furnitureProductName}`);

  if (furnitureProductTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedFurnitureProductTextData = typeof furnitureProductTextData === 'string' ? JSON.parse(furnitureProductTextData) : furnitureProductTextData;
      furnitureProductsTextData[furnitureProductName] = parsedFurnitureProductTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for project:', furnitureProductName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this project or setting a default value.
    }
  }
}



      console.log("Fetched Products Text Data:", furnitureProductsTextData);

      res.status(200).json(furnitureProductsTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

