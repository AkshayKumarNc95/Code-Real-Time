import React, { useState, useEffect } from "react";
import { Button, Icon, Label, Input } from "semantic-ui-react";

// Custom
import "./buttons.css";
import Popup from "../../../components/common/popup/";

// Buttons List for stream operations
export default function Buttons(props) {
  const [roomId, setRoomId] = useState(props.roomId);

  //
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setRoomId(props.roomId);
  }, [props]);

  function startStreaming() {
    props.onStreamClick(roomId);
    setStarted(true);
  }

  function stopStreaming() {
    props.dropMe();
    setStarted(false);
  }

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
          <Button color="black" onClick={startStreaming} disabled={started}>
            <Icon name="play" />
            Stream
          </Button>

          <Popup users={props.users}></Popup>
        </Button>

        {/* Modal window here */}
      </div>

      <div id="buttons-right">
        <Button
          icon
          labelPosition="left"
          disabled={!started}
          id="buttons-btn-record"
        >
          <Icon name="circle" />
          Record
        </Button>

        <Button
          color="red"
          icon
          id="buttons-btn-exit"
          disabled={!started}
          labelPosition="right"
          onClick={stopStreaming}
        >
          Exit
          <Icon name="sign-out" />
        </Button>
      </div>
    </div>
  );
}
