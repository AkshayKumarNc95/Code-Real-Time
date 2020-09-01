import React, { useState, useContext, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";
//Custom
import "./streamer.css";
import CodeStream from "./code_stream";
import Buttons from "./button_list";
import config from "../../api/config.js";

export default function Streamer(props) {
  // Declaration -
  let editor = null;
  let socket = null;
  let client = null;

  //Props
  const auth = props.Auth;

  // Const
  const END_POINT = config.SERVER_ADDRESS;

  // State
  const [roomId_state, setRoomId_state] = useState("");


  function onStreamClick(roomId) {
    
    if (socket) {
      socket.disconnect(); 
      socket.off();
      socket.close();
    }
    // Create the socket; 
    socket  = window.socket = io(END_POINT);

    if (window.editor == null) {
      alert("Editor not mounted yet!");
    }
    
    if(editor == null){
      editor = window.editor;
    }
    
    let RoomId = roomId.trim();
    if (RoomId === "") {
      // Generate a roomId
      RoomId = uuid();
    }

    const editorClient = window.ot.EditorClient;

    function init(str, revision, clients, serverAdaptor) {
      editor.setValue(str);
      client = window.client = new editorClient(
        revision,
        clients,
        serverAdaptor,
        new window.ot.CodeMirrorAdapter(editor)
      );
    }

    socket.on("doc", (obj) => {
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
      editor = window.editor = edr;
    }
  }

  function disconnectSocket(socket){
    if(!socket){
      return; 
    }
    
    socket.emit("leave", roomId_state);
    socket.disconnect();
    socket.off();
    socket.close();
  }

  function disconnectOTClient(client){
    if(!client){
      return;
    }

    // Disconnect from the server 
    client.serverAdapter.socket.emit("leave", roomId_state);
    client.serverAdapter.socket.disconnect();
    client.serverAdapter.socket.off();
    client.serverAdapter.socket.close();

    // Disconnect from the editor
    client.editorAdapter.detach();

  }

  function dropMeFromRoom() {
    // Close the socket! 
    disconnectSocket(window.socket); 

    // Close the editor socket;   
    // Close editor sync with the OT.js
    disconnectOTClient(window.client); 

    // Update the code mirror to offline message... 
    window.editor.setValue("//You are Offline... ")

    // Room Id Input should be empty now! 
    setRoomId_state("");
  }

  return (
    <div id="stream-outer">
      <div id="stream-body">
        <div id="stream-code-panel">
          <CodeStream
            editorMounted={editorMounted}
            theme="material"
          />
        </div>
        <div id="stream-video-panel">Videos Here;</div>
      </div>
      <div id="stream-footer">
        <Buttons
          onStreamClick={onStreamClick}
          roomId={roomId_state}
          dropMe={dropMeFromRoom}
        />
      </div>
    </div>
  );
}
