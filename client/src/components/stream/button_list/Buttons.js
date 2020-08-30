import React, { useState, useEffect } from "react";
import { Button, Icon, Label, Input } from "semantic-ui-react";

// Custom
import "./buttons.css";

// Buttons List for stream operations
export default function Buttons(props) {
  const [roomId, setRoomId] = useState(props.roomId);

  useEffect(() => {
    setRoomId(props.roomId);
  }, [props]);

  console.log(props);
  return (
    <div id="buttons-outer">
      <div id="buttons-left">
        {/* Search bar here */}
        <Input
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Button as="div" labelPosition="right" id="buttons-btn-add">
          <Button color="black" onClick={() => props.onStreamClick(roomId)}>
            <Icon name="play" />
            Stream/Join
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {props.userCount ? props.userCount : 0}
          </Label>
        </Button>

        {/* Modal window here */}
      </div>

      <div id="buttons-right">
        <Button icon labelPosition="left" id="buttons-btn-record">
          <Icon name="circle" />
          Record
        </Button>
        <Button icon id="buttons-btn-exit" color="grey">
          <Icon name="sign-out" />
        </Button>
      </div>
    </div>
  );
}
