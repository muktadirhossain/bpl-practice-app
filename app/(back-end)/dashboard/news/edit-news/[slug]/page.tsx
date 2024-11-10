import React from "react";
import { notFound } from "next/navigation";

import NewsForm from "../../create-news/_component/NewsForm";

import { getAllCategories } from "@/service/category-service";
import { newsBySlug } from "@/service/news-service";

export default async function page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const news = await newsBySlug(slug);

  if (!news) return notFound();
  const categories = await getAllCategories();
  // console.log(categories, 'news categories');
  // console.log(news, 'news categories');

  return (
    <section>
      <h2>Edit News</h2>
      <div>
        <NewsForm
          data={JSON.stringify(categories)}
          news={JSON.stringify(news || {})}
        />
      </div>
    </section>
  );
}
