import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { furnitureProjectNames } = req.body;
      console.log('Received request body:', req.body);

      if (!furnitureProjectNames || !Array.isArray(furnitureProjectNames)) {
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Replace spaces with hyphens in the project names
      const formattedProjectNames = furnitureProjectNames.map(projectName => projectName.trim().replace(/\s+/g, '-'));

      // Retrieve the existing project names from the key-value store
      let existingFurnitureProjectNames = await kv.get('furnitureprojectnames:');
      if (!existingFurnitureProjectNames) {
        existingFurnitureProjectNames = [];
      }

      // Filter out null values and invalid entries
      const validFurnitureProjectNames = formattedProjectNames
        .filter(project => typeof project === "string" && project.trim().length > 0);

      if (validFurnitureProjectNames.length === 0) {
        console.error('No valid project names found');
        return res.status(400).json({ message: 'No valid project names found' });
      }

      // Append the new project names to the existing list
      const updatedFurnitureProjectNames = [...existingFurnitureProjectNames, ...validFurnitureProjectNames];

      console.log('Received project names list (projectNames.js): ', validFurnitureProjectNames);

      // Store the updated project names list
      await kv.set('furnitureprojectnames:', updatedFurnitureProjectNames);

      console.log('Furniture project names list updated successfully');

      res.status(200).json({ message: "Project names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
