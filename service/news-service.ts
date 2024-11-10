import { cache } from "react";

import connectDB from "@/lib/connectdb";
import News from "@/models/news/news.model";
import deleteFilePath from "@/utils/delete-file-from-path";

interface NewsInterface {
  headline: string;
  slug: string;
  content: string;
  category: string;
  cover_photo: string;
}

// Connect Database 🧮:
connectDB();

export const createNews = async ({
  headline,
  slug,
  category,
  content,
  cover_photo,
}: NewsInterface) => {
  try {
    const news = await News.create({
      headline,
      category,
      slug,
      content,
      cover_photo,
    });

    return news;
  } catch (error) {
    return error;
  }
};

export const deleteNewsById = async (id: string) => {
  try {
    const news = await News.findByIdAndDelete(id);

    await deleteFilePath(news?.cover_photo);

    return news;
  } catch (error) {
    return error;
  }
};

export const newsBySlug = cache(async (slug: string) => {
  try {
    const news = await News.findOne({ slug });

    return news;
  } catch (error) {
    return error;
  }
});

export const newsById = cache(async (id: string) => {
  try {
    const news = await News.findOne({ _id: id });

    return news;
  } catch (error) {
    return error;
  }
});

// Update News Service
export const updateNewsById = async (
  id: string,
  { headline, slug, category, content, cover_photo }: NewsInterface,
) => {
  try {
    // Find the news by id and update it
    const updatedNews = await News.findByIdAndUpdate(
      id,
      {
        headline,
        slug,
        category,
        content,
        cover_photo,
      },
      { new: true }, // This option returns the updated document
    );

    // Check if the news was found and updated
    if (!updatedNews) {
      throw new Error("News not found");
    }

    return updatedNews;
  } catch (error) {
    return error;
  }
};
