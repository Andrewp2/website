
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import heading from "../styles/header.module.css";
import "../styles/reset.module.css";


export const Header = (): JSX.Element => (
<h1 className={heading.heading}>
  <div className={heading.flexbox}>
    <div className={heading.item}>
      <img src={logo} className={heading.logo} />
    </div>
    <Link to="/" className={`${heading.links} ${heading.item}`}>Home</Link>
    <Link to="/about" className={`${heading.links} ${heading.item}`}>About</Link>
    <div className={`${heading.item} ${heading.title}`}>
      Andrew Peterson&apos;s Blog
    </div>
  </div>
</h1>
);