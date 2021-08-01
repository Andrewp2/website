
import React from "react";
import "../styles/reset.module.css";
import sidebar from "../styles/sidebar.module.css";


export const Sidebar = (): JSX.Element => (
<div className={sidebar.flexbox}>
    <div>
        <h1>
            Some Blog Aggregators:
        </h1>
        <ul>
            <li>
                <a href="https://refined.blog/">
                    refined.blog
                </a>
                <a href="https://collection.mataroa.blog/">
                    mataroa.blog
                </a>
            </li>
            <li>

            </li>

        </ul>
    </div>
    <div>
        <h1>
        Some Blogs I've Personally Enjoyed:
        </h1>
        <ul>
            <li>
                <a href="https://www.scottaaronson.com/blog/">
                    Shtetl-Optimized
                </a>
                author: Scott Aaronson
                tags: Statistics, psychology, Quantified Self, philosophy, poetry, programming, anime
            </li>
            <li>
                <a href="https://astralcodexten.substack.com/">
                    Astral Codex Ten (Slate Star Codex)
                </a>
                author: Scott Alexander
                tags: 	Science, medicine, philosophy, politics, and futurism.
            </li>
            <li>
                <a href="https://www.gwern.net/index">
                    gwern.net
                </a>
                author: Gwern
                tags: Statistics, psychology, Quantified Self, philosophy, poetry, programming, anime
            </li>
            <li>
                <a href="https://lilianweng.github.io/lil-log/">
                    Lil'Log
                </a>
                <div>
                    author: Lilian Weng
                    tags: Machine Learning
                </div>
            </li>
        </ul>
    </div>
</div>
);