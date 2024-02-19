import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Extract the product name and quantity from the request body
      const productName = Object.keys(req.body)[0]; // Extract the product name from the request body
      const quantity = req.body[productName]; // Extract the quantity from the request body

      console.log("Request Body (delProductNames.js):", req.body); // Log the entire request body
      console.log("Product Name:", productName);
      console.log("Quantity:", quantity);

      // Validation: Check if product name and quantity are provided
      if (!productName || !quantity) {
        res.status(400).json({ message: "Invalid request: Provide product name and quantity" });
        return;
      }

      // Define the key for the project names list in your Redis database
      const furnitureProductNamesKey = "furnitureproductnames:";

      // Get the current list of product names and quantities from Redis
      let furnitureProductNames = await kv.get(furnitureProductNamesKey);

      if (!furnitureProductNames) {
        furnitureProductNames = [];
      }

      // Filter out the object corresponding to the product to be deleted
      furnitureProductNames = furnitureProductNames.filter(product => Object.keys(product)[0] !== productName);

      // Store the updated list back in Redis
      await kv.set(furnitureProductNamesKey, furnitureProductNames);

      // Log that the product name was deleted successfully
      console.log('Furniture product name deleted successfully:', productName);

      res.status(200).json({ message: "Furniture product name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
