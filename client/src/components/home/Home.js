import React from "react";
import { Button, Header, Image } from "semantic-ui-react";

//My css
import "./home.css";

//My sub-components
import TimeLine from "../../sub_components/timeline/TimeLine";
import Chat from "../../sub_components/chats/Chat";
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
            <TimeLine />
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
