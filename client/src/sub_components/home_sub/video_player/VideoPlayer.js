import React from "react";
import { Embed, Button } from "semantic-ui-react";

import "./videoplayer.css";

export default function VideoPlayer(props) {
  return (
    <div id="video-outer">
      <div>
        <Button onClick = {props.onCloseClick}> X </Button>
      </div>
      <video width="780" controls>
        <source src="mov_bbb.mp4" type="video/mp4" />
        <source src="mov_bbb.ogg" type="video/ogg" />
        Your browser does not support HTML video.
      </video>
    </div>
  );
}
