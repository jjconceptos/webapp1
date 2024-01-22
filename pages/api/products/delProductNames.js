import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the project name to delete from the request body
      const { productName } = req.body;

      if (!productName) {
        res.status(400).json({ message: "Invalid request: Provide a product name to delete" });
        return;
      }

      // Define the key for the project names list in your Redis database
      const productNamesKey = "productnames:";

      // Get the current list of project names from Redis
      let productNames = await kv.get(productNamesKey);

      if (!productNames) {
        productNames = [];
      }

      // Remove the specified project name from the list
      productNames = productNames.filter(name => name !== productName);

      // Store the updated list back in Redis
      await kv.set(productNamesKey, productNames);

      // Log that the project name was deleted successfully
      console.log('Product name deleted successfully:', productName);

      res.status(200).json({ message: "Product name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
