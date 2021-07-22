import React from "react";

export const importAll = (r: __WebpackModuleApi.RequireContext) =>
  r.keys().map(
    (
      fileName: string
    ): {
      slug: string;
    } => ({
      slug: fileName.substr(2)
    })
  );

export interface Props {
  data: Record<string, unknown>;
  content: string;
  excerpt?: string;
  empty?: string;
  isEmpty?: boolean;
}

export const markdownFiles: {slug: string}[] = importAll(require.context('../../public/posts/', false, /\.md$/)).sort();
export const posts: Promise<string[]> = Promise.all(markdownFiles.map(async (value) => {
  const { default: url} = await import(`../../public/posts/${value.slug}`);
  return await fetch(url).then((file) => file.text());
}));