import React from "react";
import Emoji from 'a11y-react-emoji';
import "../styles/reset.module.css";
import about from '../styles/about.module.css';

export const AboutMe = (): JSX.Element => (
  <div> 
    <div className={about.aboutTitle}>About</div>
    <div className={about.aboutText}>
      Hi, my name is Andrew Peterson. I&apos;m a software engineer who is interested in... <br /> <br />

      Motion Planning <Emoji symbol="🦿" label="Mechanical Leg" /> <br />

      Quantum Computing <Emoji symbol="⚛️" label="Atom Symbol" /> <br />

      Machine Learning <Emoji symbol="🧠" label="Brain" /> <br />

      Functional Programming λ <br />

      Philosophy <Emoji symbol="🤔" label="Thinking" /> <br />

      Politics <Emoji symbol="👨‍💼" label="Politician" /> <br />

      Control Theory <Emoji symbol="✈️" label="Plane" /> <br />

      Chess <Emoji symbol="♟️" label="Chess Pawn" /> <br />

      Video Games <Emoji symbol="🎮" label="Video Game Controller" /> <br />

      Algorithms <Emoji symbol="🧮" label="Abacus" /> <br />

      System Design <Emoji symbol="📈" label="Chart with Upwards Trend" /> <br />

      Robotics <Emoji symbol="🤖" label="Robot"/> <br /> <br />
      and all other things nerdy, intellectual, and pseudo-intellectual <Emoji symbol="📚" label="Stack of Books"/> <br /> <br />

      Any opinions represented within this blog are solely my own, and are not necessarily endorsed by my employer.  
    </div>
  </div>
)
