import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { furnitureProductNames } = req.body;
      console.log('Received request body:', req.body);

      if (!furnitureProductNames || !Array.isArray(furnitureProductNames)) {
       
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Retrieve the existing project names from the key-value store
      let existingFurnitureProductNames = await kv.get('furnitureproductnames:');
      if (!existingFurnitureProductNames) {
        existingFurnitureProductNames = [];
      }

      // Filter out null values and invalid entries
      const validFurnitureProductNames = furnitureProductNames
        .filter(product => typeof product === "string" && product.trim().length > 0)
        .map(product => product.trim());

      if (validFurnitureProductNames.length === 0) {
        console.error('No valid product names found');
        return res.status(400).json({ message: 'No valid product names found' });
      }

      // Append the new project names to the existing list
      const updatedFurnitureProductNames = [...existingFurnitureProductNames, ...validFurnitureProductNames];

      console.log('Received project names list (furnitureProductNames.js): ', validFurnitureProductNames);

      // Store the updated project names list
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
