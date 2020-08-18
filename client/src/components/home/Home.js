import React, { useState } from "react";
import { Button, Header, Image } from "semantic-ui-react";

//My css
import "./home.css";

//My sub-components
import TimeLine from "../../sub_components/home_sub/timeline/TimeLine";
import Chat from "../../sub_components/home_sub/chats/Chat";
import VideoPlayer from "../../sub_components/home_sub/video_player";

function HomePage(props) {
  const [state, setState] = useState({ path: null });

  function onThumbClick(id) {
    // Set the state with the path;1
    setState({ path: "abcd" });
  }

  function onCloseClick() {
    setState({ path: null });
  }

  return (
    <div id="home-outer">
      {/* Headers */}
      <Header as="h3" block color="grey">
        Welcome to the `RealStreamer` - v1
      </Header>

      <div id="home-in">
        <div id="home-time-line">
          {state.path ? (
            <VideoPlayer onCloseClick={onCloseClick} />
          ) : (
            <TimeLine onThumbClick={onThumbClick} />
          )}
        </div>
        <div id="home-chats">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
