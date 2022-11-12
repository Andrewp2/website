import type { PageData, PageHelpers } from "lume/core.ts";

export default ({ date, tags }: PageData, h: PageHelpers) => (
  <div className="post-meta">
    <time dateTime={h.date(date)}>{h.date(date, "HUMAN_DATE")}</time>
    {tags &&
      tags.map((tag) => (
        <a className="tag" href="#">
          {tag}
        </a>
      ))}
  </div>
);