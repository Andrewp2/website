import React from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { AboutMe, Header, Content } from ".";
import { Footer } from "./Footer";

export const BlogRouter = (): JSX.Element => (
  <Router>
    <div>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
)

export const About = (): JSX.Element => (
    <div>
        <Header />
        <AboutMe />
        <Footer />
    </div>
)

export const Archive = (): JSX.Element => (
    <div>
        <Header />
        <Content />
        <Footer />
    </div>
)

export const Home = (): JSX.Element => (
    <div>
        <Header />
        <Content />
        <Footer />
    </div>
)