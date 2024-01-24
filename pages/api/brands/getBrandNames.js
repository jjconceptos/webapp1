import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      // Get the requesting origin
      const requestingOrigin = req.headers.origin || 'http://localhost:3000';

      // Set the CORS headers to allow the requesting origin
      res.setHeader('Access-Control-Allow-Origin', requestingOrigin);
      res.setHeader('Access-Control-Allow-Methods', 'GET');

      // Retrieve the brand names list from the key-value store
      const brandNames = await kv.get('brandnames:');

console.log("Received GET Request for furniture brand names");

if (brandNames) {
  console.log("Fetched Furniture Brand Names List:", brandNames);
  res.status(200).json(brandNames);
} else {
  console.error('Error fetching brandnames from the key-value store');
  res.status(500).json({ message: 'Error fetching brand names' });
}
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}
