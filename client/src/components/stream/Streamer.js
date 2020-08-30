import React, { useState, useContext } from "react";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";
//Custom
import "./streamer.css";
import CodeStream from "./code_stream";
import Buttons from "./button_list";
import config from "../../api/config.js";

export default function Streamer(props) {
  let editor = null;
  const auth = props.Auth;

  const [roomId_state, setRoomId_state] = useState("");

  function onStreamClick(roomId) {
    if (editor == null) {
      alert("Editor not mounted yet!");
    }
    let RoomId = roomId.trim();
    if (RoomId === "") {
      // Generate a roomId
      RoomId = uuid();
    }
    // Connect to the socket server.
    const socket = io(config.SERVER_ADDRESS);

    const editorClient = window.ot.EditorClient;
    let client;
    function init(str, revision, clients, serverAdaptor) {
      editor.setValue(str);
      client = new editorClient(
        revision,
        clients,
        serverAdaptor,
        new window.ot.CodeMirrorAdapter(editor)
      );
    }

    socket.on("doc", (obj) => {
      console.log(obj);
      init(
        obj.str,
        obj.revision,
        obj.clients,
        new window.ot.SocketIOAdapter(socket)
      );
    });

    socket.emit(
      "join",
      (message) => {
        console.log(message);
      },
      { userId: auth.userId, roomId: RoomId, userName: auth.userName }
    );
    setRoomId_state(RoomId);
  }

  function editorMounted(edr) {
    if (!editor) {
      editor = edr;
    }
  }

  return (
    <div id="stream-outer">
      <div id="stream-body">
        <div id="stream-code-panel">
          <CodeStream editorMounted={editorMounted} />
        </div>
        <div id="stream-video-panel">Videos Here;</div>
      </div>
      <div id="stream-footer">
        <Buttons onStreamClick={onStreamClick} roomId={roomId_state} />
      </div>
    </div>
  );
}
