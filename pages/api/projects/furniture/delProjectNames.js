import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the project name to delete from the request body
      const { furnitureProjectName } = req.body;

      if (!furnitureProjectName) {
        res.status(400).json({ message: "Invalid request: Provide a project name to delete" });
        return;
      }

      // Define the key for the project names list in your Redis database
      const furnitureProjectNamesKey = "furnitureprojectnames:";

      // Get the current list of project names from Redis
      let furnitureProjectNames = await kv.get(furnitureProjectNamesKey);

      if (!furnitureProjectNames) {
        furnitureProjectNames = [];
      }

      // Remove the specified project name from the list
      furnitureProjectNames = furnitureProjectNames.filter(name => name !== furnitureProjectName);

      // Store the updated list back in Redis
      await kv.set(furnitureProjectNamesKey, furnitureProjectNames);

      // Log that the project name was deleted successfully
      console.log('Furniture project name deleted successfully:', furnitureProjectName);

      res.status(200).json({ message: "Furniture project name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
