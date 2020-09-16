import React, { useState, useEffect } from "react";
import { Button, Icon, Label, Input } from "semantic-ui-react";
import useScreenRecording from "use-screen-recording";

// Custom
import "./buttons.css";
import Popup from "../../../components/common/popup/";

import Recorder from "../screen_record/ScreenRecord";

// Buttons List for stream operations
export default function Buttons(props) {
  const [roomId, setRoomId] = useState(props.roomId);
  const {
    isRecording,
    recording,
    toggleRecording,
    startRecording,
    stopRecording,
  } = useScreenRecording();
  //
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (recording) {
      // save
      console.log(recording);
    }
  }, [recording]);

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

  function toggleRecording_() {
    toggleRecording();
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
          disabled={true || !started}
          id="buttons-btn-record"
          onClick={toggleRecording_}
        >
          <Icon name="circle" />
          {isRecording ? "Stop Recording" : "Start Recording"}
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
