import React from "react";
import { Button, Header, Image } from "semantic-ui-react";

//My css
import "./home.css";

//My sub-components
import TimeLine from "../../sub_components/home_sub/timeline/TimeLine";
import Chat from "../../sub_components/home_sub/chats/Chat";
import VideoPlayer from '../../sub_components/home_sub/video_player';

function HomePage(props) {
  return (
    <div id="home-outer">
      <div>
        {/* Headers */}
        <Header as="h3" block color="grey">
          Welcome to the `RealStreamer` - v1
        </Header>

        <div id="home-in">
          <div id="home-time-line">
            <Header as="h3" block>
              Your TimeLine:
            </Header>
            {/* <TimeLine /> */}
            {/* Video player here!  */}
            
            <VideoPlayer />
          </div>
          <div id="home-chats">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
