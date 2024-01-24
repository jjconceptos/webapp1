import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { decorationProductNames } = req.query;

      console.log("Received GET Request for decoration product text");
      console.log("Received Decoration Product Names (getText.js):", decorationProductNames);

      // Validate projectNames if needed
      if (!decorationProductNames || typeof decorationProductNames !== 'string') {
        console.error('Product names string is required');
        return res.status(400).json({ message: 'Product names string is required' });
      }

      // Split the comma-separated project names
      const decorationProductNamesArray = JSON.parse(decorationProductNames);
      


      // Initialize an object to store project text data
      const decorationProductsTextData = {};

     
// Loop through the project names and retrieve text data for each
for (const decorationProductName of decorationProductNamesArray) {
  console.log("Retrieving text data for product (getText.js):", decorationProductName);
  const decorationProductTextData = await kv.get(`decorationproduct:${decorationProductName}`);

  if (decorationProductTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedDecorationProductTextData = typeof decorationProductTextData === 'string' ? JSON.parse(decorationProductTextData) : decorationProductTextData;
      decorationProductsTextData[decorationProductName] = parsedDecorationProductTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for project:', decorationProductName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this project or setting a default value.
    }
  }
}



      console.log("Fetched Products Text Data:", decorationProductsTextData);

      res.status(200).json(decorationProductsTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

