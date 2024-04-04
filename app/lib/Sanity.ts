//creating sanity client
import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  apiVersion: "2021-03-25",
  dataset: "production",
  projectId: "9ynsi01w",
  useCdn: false,
});
const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
