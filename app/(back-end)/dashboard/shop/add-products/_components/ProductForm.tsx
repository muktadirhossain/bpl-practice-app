"use client";

import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { SelectItem, Select, Badge, Chip } from "@nextui-org/react";
import { CloudUploadIcon, CrossIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { ProductInterface } from "@/service/product-service";
import { DeleteIcon } from "@/components/icons";
import {
  addProductAction,
  updateProductAction,
} from "@/app/actions/product-actions";
import VariantsArea from "./VariantsArea";

const ProductForm = ({
  categories: data,
  product: prevProduct,
}: {
  categories: string;
  product?: string;
}) => {
  const categories = JSON.parse(data || "{}");
  const product = JSON.parse(prevProduct || "{}");
  const [imagePreview, setImagePreview] = useState<string[]>(
    product?.images || []
  );
  const [filePickerChanged, setFilePickerChanged] = useState(false);
  // Variant data::
  const [userData, setUserData] = useState({});
  const handleUserDataUpdate = (updatedData: any) => {
    setUserData(updatedData);
  };

  const router = useRouter();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: product?.title || "",
      itemCode: product?.itemCode || "",
      description: product?.description || "",
      price: product?.price || "",
      category: product?.category?._id || "",
      images: product?.images || "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "images") {
          formData.append(key, value as string);
        }
      });

      const imageFiles = data.images;

      if (filePickerChanged && imageFiles && imageFiles.length > 0) {
        Array.from(imageFiles).forEach((file) => {
          formData.append("images", file as unknown as Blob);
        });
      }

      const res = product?._id
        ? await updateProductAction(product._id, formData)
        : await addProductAction(formData);

      if (res.success) {
        toast.success(res.message);
        reset();
        setImagePreview([]);
        router.back();
      }

      if (res.isError) {
        // If there's an error, set it in react-hook-form
        const errorFields = res.error?.fields || {};

        // Loop through each error field and set it in the form
        for (const [field, message] of Object.entries(errorFields)) {
          setError(field as keyof ProductInterface, {
            type: "manual",
            message: message as string,
          });
        }

        toast.error(res.message || "Something went wrong !");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong !");
    }
  };

  // test:🧮

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            className="my-2.5"
            errorMessage={errors?.title?.message as string}
            isInvalid={!!errors?.title}
            isRequired={true}
            label="Product Title"
            size="lg"
            type="text"
            value={value}
            onBlur={onBlur}
            onChange={(e) => onChange(e)}
          />
        )}
        rules={{ required: "Product title is required!" }}
      />
      <Controller
        control={control}
        name="category"
        render={({ field }) => {
          return (
            <Select
              {...field} // Spread field to attach it to the Select component
              isRequired
              defaultSelectedKeys={[product?.category?._id]}
              errorMessage={errors?.category?.message as string}
              label="Select Category"
              placeholder="--Select Category--"
              variant="flat"
              onBlur={field.onBlur}
              onChange={field.onChange}
            >
              {categories.map((category: any) => (
                <SelectItem
                  key={category?.id}
                  className="capitalize"
                  value={category.id}
                >
                  {category?.category}
                </SelectItem>
              ))}
            </Select>
          );
        }}
        rules={{ required: "Please select a category!" }}
      />
      {/* itemCode */}
      <Controller
        control={control}
        name="itemCode"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            className="my-2.5"
            errorMessage={errors?.itemCode?.message as string}
            isInvalid={!!errors?.itemCode}
            isRequired={true}
            label="Product Code"
            size="lg"
            type="text"
            value={value}
            onBlur={onBlur}
            onChange={(e) => onChange(e)}
          />
        )}
        rules={{ required: "Product Code is required!" }}
      />
      {/* Desc */}
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange, onBlur } }) => (
          <Textarea
            className="my-2.5"
            errorMessage={errors?.description?.message as string}
            isInvalid={!!errors?.description}
            isRequired={true}
            label="Product Description"
            size="lg"
            type="text"
            value={value}
            onBlur={onBlur}
            onChange={(e) => onChange(e)}
          />
        )}
        rules={{ required: "Product description is required!" }}
      />

      <VariantsArea
        attributes={["size", "color", "material"]}
        userData={userData}
        onUserDataChange={handleUserDataUpdate}
      />

      {/* Price */}
      <Controller
        control={control}
        name="price"
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            className="my-2.5"
            errorMessage={errors?.price?.message as string}
            isInvalid={!!errors?.price}
            isRequired={true}
            label="Price"
            size="lg"
            type="number"
            value={value}
            onBlur={onBlur}
            onChange={(e) => onChange(e)}
          />
        )}
        rules={{ required: "Product price is required!" }}
      />
      {/* Images */}
      <Controller
        control={control}
        name="images"
        render={({ field }) => (
          <div>
            <label
              className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              htmlFor="images"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2 w-full">
                <CloudUploadIcon className="h-10 w-10" />
                <p className=" text-sm text-gray-500 dark:text-gray-400 text-center">
                  <span className="font-semibold text-center">
                    Click to upload
                  </span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  PNG, JPG or JPEG files are allowed!
                </p>
                <p className="text-xs mt-1">( 500px * 500px )</p>
              </div>
            </label>
            <input
              hidden
              multiple
              accept=".png,.jpg,.jpeg"
              className="hidden"
              id="images"
              name="images"
              type="file"
              onChange={(e) => {
                const fileList = e.target.files;
                if (fileList && fileList.length > 0) {
                  field.onChange(fileList);
                  // Generate an array of image preview URLs
                  const previewUrls = Array.from(fileList).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setImagePreview(previewUrls);
                  setFilePickerChanged(true);
                }
              }}
            />
            {imagePreview && (
              <div className="flex items-center gap-1 my-2">
                {imagePreview.map((previewUrl: string, idx: number) => (
                  <div key={idx} className="w-40 h-40 relative rounded-md">
                    <Image
                      alt={`Image Preview ${idx}`}
                      className="object-contain h-40 w-40 rounded-md"
                      height={100}
                      src={previewUrl}
                      width={100}
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-rose-500/30 hover:bg-rose-500/90 text-rose-500 hover:text-white transition ease-in-out"
                      onClick={() => {
                        const updatedImages = [...imagePreview];
                        updatedImages.splice(idx, 1);
                        setImagePreview(updatedImages);
                      }}
                    >
                      <DeleteIcon className=" h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        rules={{ required: "Product images is required!" }}
      />
      {/* Submit BTN */}
      <Button
        className="my-3"
        color="warning"
        isLoading={isSubmitting}
        size="lg"
        startContent={!isSubmitting && <PlusIcon className="h-4 w-4" />}
        type="submit"
      >
        {product._id ? "Update Product" : "Add New Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
