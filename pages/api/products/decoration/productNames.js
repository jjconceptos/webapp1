import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { decorationProductNames } = req.body;
      console.log('Received request body:', req.body);

      if (!decorationProductNames || !Array.isArray(decorationProductNames)) {
       
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Retrieve the existing project names from the key-value store
      let existingDecorationProductNames = await kv.get('decorationproductnames:');
      if (!existingDecorationProductNames) {
        existingDecorationProductNames = [];
      }

      // Filter out null values and invalid entries
      const validDecorationProductNames = decorationProductNames
        .filter(product => typeof product === "string" && product.trim().length > 0)
        .map(product => product.trim());

      if (validDecorationProductNames.length === 0) {
        console.error('No valid product names found');
        return res.status(400).json({ message: 'No valid product names found' });
      }

      // Append the new project names to the existing list
      const updatedDecorationProductNames = [...existingDecorationProductNames, ...validDecorationProductNames];

      console.log('Received project names list (decorationProductNames.js): ', validDecorationProductNames);

      // Store the updated project names list
      await kv.set('decorationproductnames:', updatedDecorationProductNames);

      console.log('Decoration product names list updated successfully');

      res.status(200).json({ message: "Product names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
