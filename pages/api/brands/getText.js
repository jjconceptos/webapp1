import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { brandNames } = req.query;

      console.log("Received GET Request for furniture brand text");
      console.log("Received Furniture Brand Names (getText.js):", brandNames);

      // Validate brandNames if needed
      if (!brandNames || typeof brandNames !== 'string') {
        console.error('Brand names string is required');
        return res.status(400).json({ message: 'Brand names string is required' });
      }

      // Split the comma-separated brand names
      const brandNamesArray = JSON.parse(brandNames);
      


      // Initialize an object to store brand text data
      const brandsTextData = {};

     
// Loop through the brand names and retrieve text data for each
for (const brandName of brandNamesArray) {
  console.log("Retrieving text data for brand (getText.js):", brandName);
  const brandTextData = await kv.get(`brand:${brandName}`);

  if (brandTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedBrandTextData = typeof brandTextData === 'string' ? JSON.parse(brandTextData) : brandTextData;
      brandsTextData[brandName] = parsedBrandTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for brand:', brandName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this brand or setting a default value.
    }
  }
}



      console.log("Fetched Brands Text Data:", brandsTextData);

      res.status(200).json(brandsTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

