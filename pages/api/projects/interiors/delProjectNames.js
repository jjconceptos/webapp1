import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the project name to delete from the request body
      const { interiorsProjectName } = req.body;

      if (!interiorsProjectName) {
        res.status(400).json({ message: "Invalid request: Provide a project name to delete" });
        return;
      }

      // Define the key for the project names list in your Redis database
      const interiorsProjectNamesKey = "interiorsprojectnames:";

      // Get the current list of project names from Redis
      let interiorsProjectNames = await kv.get(interiorsProjectNamesKey);

      if (!interiorsProjectNames) {
        interiorsProjectNames = [];
      }

      // Remove the specified project name from the list
      interiorsProjectNames = interiorsProjectNames.filter(name => name !== interiorsProjectName);

      // Store the updated list back in Redis
      await kv.set(interiorsProjectNamesKey, interiorsProjectNames);

      // Log that the project name was deleted successfully
      console.log('Interiors project name deleted successfully:', interiorsProjectName);

      res.status(200).json({ message: "Interiors project name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
