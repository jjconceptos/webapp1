import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the project name to delete from the request body
      const { furnitureProductName } = req.body;

      if (!furnitureProductName) {
        res.status(400).json({ message: "Invalid request: Provide a product name to delete" });
        return;
      }

      // Define the key for the project names list in your Redis database
      const furnitureProductNamesKey = "furnitureproductnames:";

      // Get the current list of project names from Redis
      let furnitureProductNames = await kv.get(furnitureProductNamesKey);

      if (!furnitureProductNames) {
        furnitureProductNames = [];
      }

      // Remove the specified project name from the list
      furnitureProductNames = furnitureProductNames.filter(name => name !== furnitureProductName);

      // Store the updated list back in Redis
      await kv.set(furnitureProductNamesKey, furnitureProductNames);

      // Log that the project name was deleted successfully
      console.log('Furniture product name deleted successfully:', furnitureProductName);

      res.status(200).json({ message: "Furniture product name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
