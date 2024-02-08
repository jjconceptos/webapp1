import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { furnitureProductNames } = req.body;

      if (!furnitureProductNames || !Array.isArray(furnitureProductNames)) {
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Replace spaces with hyphens in the product names and generate unique names
      const formattedProductNames = furnitureProductNames.map(productName => {
        const timestamp = Date.now().toString().slice(2, 9); // Get the first 4 digits of the timestamp
        const formattedProductName = productName.trim().replace(/\s+/g, '-');
        return `${formattedProductName}-${timestamp}`;
      });

      // Retrieve the existing product names from the key-value store
      let existingFurnitureProductNames = await kv.get('furnitureproductnames:') || [];

      // Append the new product names to the existing list
      const updatedFurnitureProductNames = [...existingFurnitureProductNames, ...formattedProductNames];

      // Store the updated product names list
      await kv.set('furnitureproductnames:', updatedFurnitureProductNames);

      res.status(200).json({ message: "Product names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
