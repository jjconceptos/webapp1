import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "DELETE") { // Update the method check to DELETE
    try {
      const { brandName } = req.body;

      if (!brandName) {
        res.status(400).json({ message: "Invalid request: Provide a brandname" });
        return;
      }

      console.log("Received DELETE Text (title and description) Request for brand:", brandName);

      // Define the key for the brand text data
      const brandTextKey = `brand:${brandName}`;

      // Delete the brand text data
      await kv.del(brandTextKey);

      console.log("Deleted Text (title and description) for brand:", brandName);

      res.status(200).json({ message: "Furniture brand text data deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
