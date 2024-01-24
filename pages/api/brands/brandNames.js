import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { brandNames } = req.body;
      console.log('Received request body:', req.body);

      if (!brandNames || !Array.isArray(brandNames)) {
       
        return res.status(400).json({ message: 'Invalid brand names list' });
      }

      // Retrieve the existing brand names from the key-value store
      let existingBrandNames = await kv.get('brandnames:');
      if (!existingBrandNames) {
        existingBrandNames = [];
      }

      // Filter out null values and invalid entries
      const validBrandNames = brandNames
        .filter(brand => typeof brand === "string" && brand.trim().length > 0)
        .map(brand => brand.trim());

      if (validBrandNames.length === 0) {
        console.error('No valid brand names found');
        return res.status(400).json({ message: 'No valid brand names found' });
      }

      // Append the new brand names to the existing list
      const updatedBrandNames = [...existingBrandNames, ...validBrandNames];

      console.log('Received brand names list (brandNames.js): ', validBrandNames);

      // Store the updated brand names list
      await kv.set('brandnames:', updatedBrandNames);

      console.log('Brand names list updated successfully');

      res.status(200).json({ message: "Brand names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
