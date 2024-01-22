import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { productNames } = req.body;

      if (!productNames || !Array.isArray(productNames)) {
        console.error('Invalid project names list');
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Retrieve the existing project names from the key-value store
      let existingProductNames = await kv.get('productnames:');
      if (!existingProductNames) {
        existingProductNames = [];
      }

      // Filter out null values and invalid entries
      const validProductNames = productNames
        .filter(product => typeof product === "string" && product.trim().length > 0)
        .map(product => product.trim());

      if (validProductNames.length === 0) {
        console.error('No valid product names found');
        return res.status(400).json({ message: 'No valid product names found' });
      }

      // Append the new project names to the existing list
      const updatedProductNames = [...existingProductNames, ...validProductNames];

      console.log('Received project names list (productNames.js): ', validProductNames);

      // Store the updated project names list
      await kv.set('productnames:', updatedProductNames);

      console.log('Product names list updated successfully');

      res.status(200).json({ message: "Product names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
