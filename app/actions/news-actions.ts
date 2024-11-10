"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { handleError } from "./errorHandler";

import uploadFileHandler from "@/utils/file-upload-helpers";
import deleteFilePath from "@/utils/delete-file-from-path";
import {
  createNews,
  deleteNewsById,
  newsById,
  updateNewsById,
} from "@/service/news-service";

const newsSchema = z.object({
  headline: z.string(),
  slug: z.string(),
  category: z.string(),
  description: z.string(),
});

export const createNewsAction = async (formData: FormData) => {
  let uploadedLink = "";

  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { headline, slug, description, category } =
      newsSchema.parse(formDataObj);
    const file = formData.get("cover_photo") as File;

    // upload file
    uploadedLink = await uploadFileHandler({
      file,
      extensionArray: ["png", "jpg", "jpeg"],
      destinationPath: "/images/news",
    });
    const res = await createNews({
      headline,
      slug,
      category,
      content: description,
      cover_photo: uploadedLink,
    });

    return {
      success: true,
      message: "News posted successfully!!!",
      data: {},
    };
  } catch (error) {
    if (uploadedLink) {
      await deleteFilePath(uploadedLink);
    }

    return handleError(error);
  } finally {
    revalidatePath("/dashboard/news");
  }
};

export const deleteNewsAction = async (id: string) => {
  try {
    const res = await deleteNewsById(id);

    return {
      success: true,
      message: "News deleted successfully!!!",
      data: res,
    };
    // return new SuccessHandler("News deleted successfully!!!", res);
  } catch (error) {
    return handleError(error);
  } finally {
    revalidatePath("/dashboard/news");
  }
};

export const updateNewsAction = async (formData: FormData, newsId: string) => {
  let uploadedLink = "";
  let oldImageLink = "";

  try {
    const formDataObj = Object.fromEntries(formData.entries());
    const { headline, slug, description, category } =
      newsSchema.parse(formDataObj);
    const file = formData.get("cover_photo") as File | null; // cover_photo is optional

    // Fetch the existing news data to handle image updates
    const existingNews = await newsById(newsId);

    oldImageLink = existingNews.cover_photo;

    // If a new image is uploaded, handle the file upload
    if (file && file instanceof File && file.size > 0) {
      uploadedLink = await uploadFileHandler({
        file,
        extensionArray: ["png", "jpg", "jpeg"],
        destinationPath: "/images/news",
      });

      // If the upload is successful and there's an old image, delete the old one
      if (oldImageLink) {
        await deleteFilePath(oldImageLink);
      }
    } else {
      // console.log("NO new cover photo found ...");
      // If no new image is provided, keep the old one
      uploadedLink = oldImageLink;
    }

    // Update the news with the new or existing image link
    const updatedNews = await updateNewsById(newsId, {
      headline,
      slug,
      category,
      content: description,
      cover_photo: uploadedLink,
    });

    return {
      success: true,
      message: "News updated successfully!!!",
      data: updatedNews,
    };
  } catch (error) {
    // If there was an error and a new image was uploaded, delete it
    if (uploadedLink && uploadedLink !== oldImageLink) {
      await deleteFilePath(uploadedLink);
    }

    return handleError(error);
  } finally {
    revalidatePath("/dashboard/news");
  }
};
