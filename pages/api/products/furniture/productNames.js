import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { furnitureProductNames } = req.body;
      console.log('Received request body:', req.body);

      if (!furnitureProductNames || !Array.isArray(furnitureProductNames)) {
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Replace spaces with hyphens in the product names
      const formattedProductNames = furnitureProductNames.map(productName => productName.trim().replace(/\s+/g, '-'));

      // Retrieve the existing product names from the key-value store
      let existingFurnitureProductNames = await kv.get('furnitureproductnames:');
      if (!existingFurnitureProductNames) {
        existingFurnitureProductNames = [];
      }

      // Filter out null values and invalid entries
      const validFurnitureProductNames = formattedProductNames
        .filter(product => typeof product === "string" && product.trim().length > 0);

      if (validFurnitureProductNames.length === 0) {
        console.error('No valid product names found');
        return res.status(400).json({ message: 'No valid product names found' });
      }

      // Append the new product names to the existing list
      const updatedFurnitureProductNames = [...existingFurnitureProductNames, ...validFurnitureProductNames];

      console.log('Received product names list (productNames.js): ', validFurnitureProductNames);

      // Store the updated product names list
      await kv.set('furnitureproductnames:', updatedFurnitureProductNames);

      console.log('Furniture product names list updated successfully');

      res.status(200).json({ message: "Product names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
