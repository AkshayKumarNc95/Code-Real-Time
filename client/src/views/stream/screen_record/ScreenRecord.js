import React, { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Button, Icon, Label, Input } from "semantic-ui-react";

function RecordView(props) {
  let start = false;

  function startRecord(startRec, stopRec, mediaObj, srt) {
    start = srt;

    srt ? stopRec() : startRec();

    console.log(mediaObj);
    // If stop => then do save the stream!
  }
  return (
    <div>
      <ReactMediaRecorder
        screen
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <Button
            icon
            labelPosition="left"
            id="buttons-btn-record"
            onClick={() =>
              startRecord(startRecording, stopRecording, mediaBlobUrl, !start)
            }
          >
            <Icon name="circle" />
            {start ? "Stop Recording" : "Start Recording"}
          </Button>
        )}
      />
    </div>
  );
}

export default RecordView;
