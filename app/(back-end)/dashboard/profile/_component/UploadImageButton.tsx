"use client";
import ImageUploadButton from "./ImageUploadButton";

import { uploadUserAvatarAction } from "@/app/actions/user-actions";

const UploadImageButton = () => {
  const handleFileChange = (e: any) => {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
  };

  return (
    <div>
      <form action={uploadUserAvatarAction}>
        <input
          accept=".png, .jpg, .jpeg"
          className="hidden"
          id="avatar"
          multiple={false}
          name="avatar"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="avatar">
          <ImageUploadButton />
        </label>
      </form>
    </div>
  );
};

export default UploadImageButton;
