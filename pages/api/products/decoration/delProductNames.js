import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the project name to delete from the request body
      const { decorationProductName } = req.body;

      if (!decorationProductName) {
        res.status(400).json({ message: "Invalid request: Provide a product name to delete" });
        return;
      }

      // Define the key for the project names list in your Redis database
      const decorationProductNamesKey = "decorationproductnames:";

      // Get the current list of project names from Redis
      let decorationProductNames = await kv.get(decorationProductNamesKey);

      if (!decorationProductNames) {
        decorationProductNames = [];
      }

      // Remove the specified project name from the list
      decorationProductNames = decorationProductNames.filter(name => name !== decorationProductName);

      // Store the updated list back in Redis
      await kv.set(decorationProductNamesKey, decorationProductNames);

      // Log that the project name was deleted successfully
      console.log('Decoration product name deleted successfully:', decorationProductName);

      res.status(200).json({ message: "Decoration product name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
