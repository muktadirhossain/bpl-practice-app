import fs from "fs/promises";
import path from "path";

/*>>===//===>>=====>> Title: upload File Handler >>===//===>>=====>>
 * Description: This Function will upload a file to the specified folder ,
 
 *Takes 3 required arguments  
    field, 
    Allowed Extension Array, 
    Destination Path
    And 2 Optional Argument : max_Size , mime_type
 * Author: Muktadir Hossain (`https://github.com/muktadirhossain`) ,
 * Date: 22/10/2023 .
 >>===//===>>====>> *** >>===//===>>===>> *** >>===//===>>===>>*/

type UploadFileHandlerParams = {
  file: File;
  extensionArray: string[];
  destinationPath: string;
  maxSize?: number;
  mimeType?: string[];
};

const uploadFileHandler = async ({
  file,
  extensionArray,
  destinationPath,
  maxSize = 5 * 1024 * 1024, // Default to 5MB if not provided
  mimeType = ["image/png", "image/jpeg"], // Default MIME types
}: UploadFileHandlerParams): Promise<string> => {
  try {
    // Extract the file extension
    const fileExtension = file?.name?.split(".").pop()?.toLowerCase() || "";

    if (!extensionArray.includes(fileExtension)) {
      throw new Error(`Invalid file extension: ${fileExtension}`);
    }

    // Check file size
    if (file.size > maxSize) {
      throw new Error("File size exceeds the allowed limit.");
    }

    // Validate MIME type
    if (!mimeType.includes(file.type)) {
      throw new Error("Invalid file type.");
    }

    // Generate file name by removing unwanted characters and appending a timestamp
    const sanitizedFileName = file.name.replace(
      /[ .#]|\.png|\.webp|\.jpg|\.pdf|\.js|\.py|\.php/g,
      "",
    );
    const fileName = `${sanitizedFileName}_${Date.now()}.${fileExtension}`;

    // Construct the full path to save the file
    const publicPath = path.join(process.cwd(), "public", destinationPath);

    // Create the directory if it doesn't exist
    await fs.mkdir(publicPath, { recursive: true });

    // Full file path
    const filePath = path.join(publicPath, fileName);

    // Read the file as ArrayBuffer and write it to the destination
    const fileData = await file.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(fileData as ArrayBuffer)); // Use as ArrayBuffer

    // Construct and return the file URL
    const fileUrl = `${destinationPath}/${fileName}`;

    return fileUrl;
  } catch (error) {
    throw new Error(
      `Failed to upload file ❌📂❌: ${(error as Error).message}`,
    );
  }
};

export default uploadFileHandler;

/* 

const uploadedLink = await uploadFileHandler({
    file: avatar, 
    extensionArray: ["png", "jpg", "jpeg"], 
    destinationPath: "/public/uploads/",
    maxSize: 10 * 1024 * 1024, // Optional, max size of 10MB
    mimeType: ["image/png", "image/jpeg"], // Optional, allowed MIME types
  });

*/
