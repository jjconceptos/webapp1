import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the brand name to delete from the request body
      const { brandName } = req.body;

      if (!brandName) {
        res.status(400).json({ message: "Invalid request: Provide a brand name to delete" });
        return;
      }

      // Define the key for the brand names list in your Redis database
      const brandNamesKey = "brandnames:";

      // Get the current list of brand names from Redis
      let brandNames = await kv.get(brandNamesKey);

      if (!brandNames) {
        brandNames = [];
      }

      // Remove the specified brand name from the list
      brandNames = brandNames.filter(name => name !== brandName);

      // Store the updated list back in Redis
      await kv.set(brandNamesKey, brandNames);

      // Log that the brand name was deleted successfully
      console.log('Brand name deleted successfully:', brandName);

      res.status(200).json({ message: "Furniture brand name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
