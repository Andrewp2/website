import lume from "lume/mod.ts";
import pagefind from "lume/plugins/pagefind.ts";
import sass from "lume/plugins/sass.ts";
import date from "lume/plugins/date.ts";
import inline from "lume/plugins/inline.ts";
import minify_html from "lume/plugins/minify_html.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import mdx from "https://raw.githubusercontent.com/lumeland/lume/master/plugins/mdx.ts";
import jsx from "lume/plugins/jsx.ts";

const site = lume({
  src: "./src",
  location: new URL("https://andrewpeterson.dev"),
});

site.use(pagefind());
site.use(sass());
site.use(date());
site.use(jsx());
site.use(mdx());
site.use(inline());
site.use(minify_html());
site.use(code_highlight());

site.remoteFile(
  "/styles/code.css",
  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/base16/framer.min.css"
);

site.copy("styles/code.css");

site.copy("fonts");

export default site;
