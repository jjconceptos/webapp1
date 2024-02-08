import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, timestamp } = req.body.textData || {};

      // Validate fields if needed
      if (!name || !description) {
        console.error('Name and description are required');
        return res.status(400).json({ message: 'Name and description are required' });
      }

      // Use a regular expression to check if name contains only letters, hyphens, and spaces
      
      
      const nameRegex = /^[A-Za-zñÑ -]+$/;
      if (!name.match(nameRegex)) {
        console.error('Name must contain only letters, hyphens, and spaces');
        return res.status(400).json({ message: 'Name must contain only letters, hyphens, and spaces' });
      }

      // Replace spaces with hyphens in the name
      const formattedName = name.replace(/\s+/g, '-');

      const furnitureProjectTextData = {
        name: formattedName, // Use the formatted name
        description,
        timestamp,
      };

      // Store product text data using SET command after converting to JSON
      // Assuming you use a unique key for each project
      await kv.set(`furnitureproject:${formattedName}`, JSON.stringify(furnitureProjectTextData));

      res.status(200).json({ message: "Furniture project text data uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
