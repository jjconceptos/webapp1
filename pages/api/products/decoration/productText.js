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

      // Use a regular expression to check if name contains only letters
      const nameRegex = /^[A-Za-z]+$/;
      if (!name.match(nameRegex)) {
        console.error('Name must contain only letters');
        return res.status(400).json({ message: 'Name must contain only letters' });
      }

      const decorationProductTextData = {
        name,
        description,
        timestamp,
      };

      // Store product text data using SET command after converting to JSON
      // Assuming you use a unique key for each project
      await kv.set(`decorationproduct:${name}`, JSON.stringify(decorationProductTextData));

      res.status(200).json({ message: "Decoration product text data uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

