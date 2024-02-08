import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, price, image } = req.body.textData || {};

      // Validate fields if needed
      if (!name || !description || !price || !image) {
        console.error('Name, description, price, and image are required');
        return res.status(400).json({ message: 'Name, description, price, and image are required' });
      }

      // Use a regular expression to check if name contains only letters
      const nameRegex = /^[A-Za-zñÑ -]+$/;
      if (!name.match(nameRegex)) {
        console.error('Name must contain only letters');
        return res.status(400).json({ message: 'Name must contain only letters' });
      }

      // Replace spaces with hyphens in the name
      const formattedName = name.trim().replace(/\s+/g, '-');

      // Generate timestamp (first 6 digits)
      const timestamp = Date.now().toString().slice(2, 8);

      const furnitureProductTextData = {
        name: formattedName,
        description,
        price, // Include the price in the stored data
        timestamp,
        image: `${formattedName}-${timestamp}00`, // Include the formatted image name
      };

      // Store product text data using SET command after converting to JSON
      // Assuming you use the same key format as productNames.js
      await kv.set(`furnitureproduct:${formattedName}-${timestamp}`, JSON.stringify(furnitureProductTextData));

      res.status(200).json({ message: "Furniture product text data uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}


