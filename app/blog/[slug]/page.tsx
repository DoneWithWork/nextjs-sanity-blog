import { FullBlog } from "@/app/lib/Interface";
import { client, urlFor } from "@/app/lib/Sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == "${slug}"]{
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
       }[0]`;
  const data = await client.fetch(query);
  return data;
}

async function page({ params }: { params: { slug: string } }) {
  const data: FullBlog = await getData(params.slug);
  return (
    <div>
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide">
          Joshua K - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-black dark:text-white sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt={data.title}
        width={800}
        height={800}
        priority
        className="rounded-lg mt-8 border"
      />
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}

export default page;
