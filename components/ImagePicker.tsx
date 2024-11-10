"use client";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { useState, ChangeEvent } from "react";

interface ImagePickerProps {
  image?: string[];
  fieldName?: string;
  title?: string;
  imageSize?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  image: updateImg,
  title = "",
  imageSize = "",
  fieldName = "image",
  props,
}) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    setImage(file);
  };

  return (
    <div className="flex justify-between items-center w-full my-2">
      <div className="flex items-center justify-center w-full">
        <label
          className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          htmlFor="image"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2 w-full">
            <CloudUploadIcon className="h-5 w-5" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span className="font-semibold text-center">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              PNG, JPG or JPEG files are allowed!
            </p>
            {imageSize && <p className="text-xs mt-1">{imageSize}</p>}
          </div>
          <input
            className="hidden"
            id="image"
            name={fieldName}
            required={!updateImg}
            type="file"
            onChange={handleImageChange}
            {...props}
          />
        </label>
      </div>
      {image && (
        <div className="mx-5">
          <Image
            alt={image.name}
            className="block mx-5 object-contain"
            height={200}
            src={URL.createObjectURL(image)}
            width={200}
          />
        </div>
      )}
      {!image && updateImg && (
        <div className="mx-5">
          <Image
            alt={title}
            className="block mx-5 object-contain"
            height={200}
            src={updateImg[0]}
            width={200}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
