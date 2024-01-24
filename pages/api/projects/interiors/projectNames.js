import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { interiorsProjectNames } = req.body;
      console.log('Received request body:', req.body);

      if (!interiorsProjectNames || !Array.isArray(interiorsProjectNames)) {
       
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Retrieve the existing project names from the key-value store
      let existingInteriorsProjectNames = await kv.get('interiorsprojectnames:');
      if (!existingInteriorsProjectNames) {
        existingInteriorsProjectNames = [];
      }

      // Filter out null values and invalid entries
      const validInteriorsProjectNames = interiorsProjectNames
        .filter(project => typeof project === "string" && project.trim().length > 0)
        .map(project => project.trim());

      if (validInteriorsProjectNames.length === 0) {
        console.error('No valid project names found');
        return res.status(400).json({ message: 'No valid project names found' });
      }

      // Append the new project names to the existing list
      const updatedInteriorsProjectNames = [...existingInteriorsProjectNames, ...validInteriorsProjectNames];

      console.log('Received project names list (interiorsProjectNames.js): ', validInteriorsProjectNames);

      // Store the updated project names list
      await kv.set('interiorsprojectnames:', updatedInteriorsProjectNames);

      console.log('Interiors project names list updated successfully');

      res.status(200).json({ message: "Project names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
