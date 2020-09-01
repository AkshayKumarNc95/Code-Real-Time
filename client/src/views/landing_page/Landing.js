import React from "react";

import "./landing.css";

// const styles = {
//   backgroundImage: `url(${Background})`,
// };

function Landing(props) {
  return (
    <div>
      <div id="background"></div>
      <div id="foreground">
        <h1>Hello, Welcome to the Real Time Streaming!</h1>

        <p> Login to connect with friends and stream it off...</p>
      </div>
    </div>
  );
}

export default Landing;
