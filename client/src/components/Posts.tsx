import * as matter from 'gray-matter';
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import content from "../styles/content.module.css";
import heading from "../styles/header.module.css";
import "../styles/reset.module.css";
import { posts, Props } from './Utils';


export const Content = (): JSX.Element => {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    async function getPosts() {
      const result = await posts;
      setData([...result]);
    }
    getPosts();
  }, []);
  return (
    <div className={heading}>
      <div>
      {
        data.map((text: string) => {
          const front = matter.default(text);
          return <BlogPost {...front} key={front.data.title as string}></BlogPost>;
        })
      }
      </div>
    </div>
  );
}


const BlogPost = (props: Props): JSX.Element => {
  return (
    <div className={heading}>
      <div> 
        <h1 className={content.blogtitle}>{props.data.title as string}</h1>
        <ReactMarkdown className={content.posts} remarkPlugins={[gfm]}>{props.content}</ReactMarkdown>
      </div>
    </div>
  )
}