import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { productNames } = req.query;

      console.log("Received GET Request for product text");
      console.log("Received Product Names (getText.js):", productNames);

      // Validate projectNames if needed
      if (!productNames || typeof productNames !== 'string') {
        console.error('Product names string is required');
        return res.status(400).json({ message: 'Product names string is required' });
      }

      // Split the comma-separated project names
      const productNamesArray = JSON.parse(productNames);
      


      // Initialize an object to store project text data
      const productsTextData = {};

     
// Loop through the project names and retrieve text data for each
for (const productName of productNamesArray) {
  console.log("Retrieving text data for product (getText.js):", productName);
  const productTextData = await kv.get(`product:${productName}`);

  if (productTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedProductTextData = typeof productTextData === 'string' ? JSON.parse(productTextData) : productTextData;
      productsTextData[productName] = parsedProductTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for project:', productName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this project or setting a default value.
    }
  }
}



      console.log("Fetched Products Text Data:", productsTextData);

      res.status(200).json(productsTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

