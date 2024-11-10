"use client";

import { Input } from "@nextui-org/input";
import { CirclePlusIcon, CloudUploadIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState, useRef, useMemo } from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { SelectItem, Select } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import JoditEditor from "jodit-react";

import { createNewsAction, updateNewsAction } from "@/app/actions/news-actions";
import { cn } from "@/utils/cn";
// import './jodit-theme.css'

export default function NewsForm({ data, news }: { data: any; news?: any }) {
  const router = useRouter();
  const editor = useRef(null);

  const categories = JSON.parse(data);
  const parseNews = JSON.parse(news || "{}");

  const config = useMemo(
    () => ({
      theme: "light",
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
      height: "450px",
      width: "100%",
      enableDragAndDropFileToEditor: true,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
      uploader: { insertImageAsBase64URI: true },
      removeButtons: ["brush", "file"],
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
      toolbarSticky: true,
      style: {
        background: "#27272E",
        color: "rgba(255,255,255,0.5)",
      },
    }),
    [parseNews],
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      headline: parseNews?.headline || "",
      slug: parseNews?.slug || "",
      category: parseNews?.category || "",
      description: parseNews?.content || "",
      cover_photo: parseNews?.cover_photo || "",
    },
  });

  const [headlineValue, setHeadlineValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    parseNews?.cover_photo || null,
  );

  // Automatically create slug from headline
  useEffect(() => {
    if (headlineValue) {
      const slug = headlineValue
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      setValue("slug", slug);
    }
  }, [headlineValue, setValue]);

  // Handle form submission
  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("headline", data.headline);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("cover_photo", data.cover_photo[0]); // Ensure cover_photo is a File

    try {
      // Send the FormData to the server action
      const response = parseNews._id // Check if editing
        ? await updateNewsAction(formData, parseNews._id) // Call update action
        : await createNewsAction(formData); // Otherwise call create action

      // console.log(response);
      if (response.success) {
        toast.success(response.message);
        router?.push("/dashboard/news");
      }
      if (!response.success) {
        toast.error(response.message);
      }
    } catch (error: any) {
      //   console.error("Error submitting form:", error);
      toast.error(error.message || "Something went wrong !");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* News Headline */}
      <Controller
        control={control}
        name="headline"
        render={({ field: { value, onChange } }) => (
          <Input
            className="my-2.5"
            errorMessage={errors?.headline?.message as string}
            isRequired={true}
            label="News Headline"
            placeholder="Write news headline..."
            type="text"
            validationState={errors.headline ? "invalid" : "valid"}
            value={value}
            onChange={(e) => {
              setHeadlineValue(e.target.value);
              onChange(e);
            }}
          />
        )}
        rules={{ required: "Headline is required" }}
      />
      {/* Slug */}
      <Controller
        control={control}
        name="slug"
        render={({ field }) => (
          <Input
            {...field}
            className="my-2.5"
            errorMessage={errors.slug?.message as string}
            isRequired={true}
            label="Slug"
            placeholder="News slug..."
            type="text"
            validationState={errors.slug ? "invalid" : "valid"}
          />
        )}
        rules={{ required: "Slug is required" }}
      />
      {/* Select Category */}
      <Controller
        control={control}
        name="category"
        render={({ field }) => {
          return (
            <Select
              {...field} // Spread field to attach it to the Select component
              isRequired
              className="my-2"
              defaultSelectedKeys={[parseNews?.category]}
              errorMessage={errors?.category?.message as string}
              label="Select Category"
              placeholder="Please select a category"
              variant="flat"
              onChange={field.onChange}
            >
              {categories.map((category: any) => (
                <SelectItem
                  key={category._id}
                  className="capitalize"
                  value={category._id}
                >
                  {category.category}
                </SelectItem>
              ))}
            </Select>
          );
        }}
        rules={{ required: "Please select a category!" }}
      />
      {/* Content with JODIT */}
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <div>
            <JoditEditor
              ref={editor}
              config={config}
              value={field?.value}
              onBlur={(newContent) => field.onChange(newContent)}
            />
            {errors.description && (
              <p className="text-red-500 pl-1 text-xs mt-1">
                {String(errors?.description?.message)}
              </p>
            )}
          </div>
        )}
        rules={{ required: "Description is required" }}
      />
      {/* Image Picker */}
      <Controller
        control={control}
        name="cover_photo"
        render={({ field }) => (
          <div className="my-3 w-96">
            <div className="flex flex-col md:flex-row flex-start gap-x-3 items-center">
              <div
                className={cn(
                  "cursor-pointer bg-default-100 hover:bg-default-200 rounded-lg",
                  {
                    "bg-danger-100 hover:bg-danger-100": errors.cover_photo,
                  },
                )}
              >
                <label htmlFor="cover_photo">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2 w-full">
                    <CloudUploadIcon className="h-10 w-10" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                      <span className="font-semibold text-center">
                        Click to upload
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      PNG, JPG, or JPEG files are allowed!
                    </p>
                    <p className="text-[10px] text-gradient mt-1">
                      Cover Image Size : (1920px * 1080px)
                    </p>
                  </div>
                  <input
                    className="hidden my-2.5"
                    id="cover_photo"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    // Handle file selection and manually update the field value with files
                    onChange={(e) => {
                      const fileList = e.target.files; // Get selected files
                      if (fileList && fileList.length > 0) {
                        field.onChange(fileList); // Call onChange with the FileList

                        //* Generate image preview URL and update state
                        const file = fileList[0];
                        const imageUrl = URL.createObjectURL(file);
                        setImagePreview(imageUrl);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Show image preview if an image is selected */}
              {imagePreview && (
                <div className="mt-3">
                  <Image
                    alt="Selected Preview"
                    className="rounded-lg max-w-full h-auto"
                    height={200}
                    src={imagePreview}
                    width={200}
                  />
                </div>
              )}
            </div>
            {/* Error message if validation fails */}
            {errors.cover_photo && (
              <p className="text-red-500 pl-1 text-xs mt-1">
                {errors.cover_photo.message as string}
              </p>
            )}
          </div>
        )}
        rules={{
          validate: (value) => {
            // If we are editing (parseNews._id exists) and no new image is selected, return true
            if (parseNews._id && !value?.length) {
              return true;
            }

            // Otherwise, ensure a file is selected (for creating or if editing with a new image)
            return value?.length > 0 || "Please upload a valid image file";
          },
        }}
      />
      {/* Submit Button */}
      <Button
        color="warning"
        isLoading={isSubmitting}
        startContent={!isSubmitting && <CirclePlusIcon className="h-4 w-4" />}
        type="submit"
      >
        {parseNews._id ? "Update News" : "Post Latest News"}
      </Button>
    </form>
  );
}
