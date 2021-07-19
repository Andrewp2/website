import React, { useEffect, useState } from "react";
import heading from "./styles/heading.module.css";
import content from "./styles/content.module.css";
import robot from "./images/robot.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./styles/reset.module.css";
import ReactMarkdown from "react-markdown";
import gfm from 'remark-gfm';
import * as matter from 'gray-matter';

const App = (): JSX.Element => (
  <Router>
    <div>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/archive">
          <Archive />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
)

export const Home = (): JSX.Element => (
    <>
      <Heading />
      <Content/>
    </>
)

export const About = (): JSX.Element => (
    <>
      <Heading />
      <Content/>
    </>
)

export const Archive = (): JSX.Element => (
    <>
      <Heading />
      <Content/>
    </>
)

export const Heading = (): JSX.Element => (
<h1 className={heading.heading}>
  <div className={heading.flexbox}>
    <div className={heading.item}>
      <img src={robot} className={heading.robot} />
    </div>
    <Link to="/" className={`${heading.links} ${heading.item}`}>Home</Link>
    <Link to="/about" className={`${heading.links} ${heading.item}`}>About Me</Link>
    <Link to="/archive" className={`${heading.links} ${heading.item}`}>Archive</Link>
    <div className={`${heading.item} ${heading.title}`}>
      Andrew Peterson&apos;s Blog
    </div>
  </div>
</h1>
);

export const importAll = (r: __WebpackModuleApi.RequireContext) =>
	r.keys().map((fileName: string): {
    slug: string;
  } => ({
		slug: fileName.substr(2),
	}));
const markdownFiles: {slug: string}[] = importAll(require.context('./posts', false, /\.md$/)).sort();
const posts: Promise<string[]> = Promise.all(markdownFiles.map(async (value) => {
  const { default: url} = await import(`./posts/${value.slug}`);
  return await fetch(url).then((file) => file.text());
}));


const Content = (): JSX.Element => {

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
        data.map((text: string) => <BlogPost {...matter.default(text)} key={matter.default(text).data.title as string}></BlogPost>)
      }
      </div>
    </div>
  );
}

interface Props {
  data: Record<string, unknown>;
  content: string;
  excerpt?: string;
  empty?: string;
  isEmpty?: boolean;
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

export default App;
