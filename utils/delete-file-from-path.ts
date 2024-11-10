import fs from "fs/promises";
import path from "path";

async function deleteFilePath(filePath: string): Promise<void> {
  try {
    // Construct the full path to save the file
    const fullPath = path.join(
      process.cwd(),
      "public",
      filePath.replace("/api", ""),
    );

    await fs.access(fullPath);
    await fs.unlink(fullPath);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // console.log("File does not exist");

      // throw new Error("File does not exist!");
      return;
    } else {
      // console.error("Error deleting file:", err);
      throw err; // Rethrow the original error
    }
  }
}

export default deleteFilePath;
