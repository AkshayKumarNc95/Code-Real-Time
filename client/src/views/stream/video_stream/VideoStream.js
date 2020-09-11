import React, { useEffect, useState, useRef } from "react";
import { Grid, Image } from "semantic-ui-react";

// Custom
import "./videostream.css";
import VideoPlayer from "../../home/video_player";
import { commands } from "codemirror";

export default function VideoStream(props) {
  // Props
  let auth = props.auth;
  const users = props.users;
  const roomId = props.roomId;
  const userName = auth.userName;

  // State.
  const [stream, setStream] = useState();

  // Declarations
  const peers = new Set();
  const FATAL_ERRORS = [
    "invalid-id",
    "invalid-key",
    "network",
    "ssl-unavailable",
    "server-error",
    "socket-error",
    "socket-closed",
    "unavailable-id",
    "webrtc",
    "peer-unavailable"
  ];
  // Video refs
  const myVideo = useRef();
  const peerVideo_1 = useRef();
  const peerVideo_2 = useRef();
  const peerVideo_3 = useRef();

  //#region Effects

  useEffect(() => {
    navigator.getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    // If roomId exists => then its time to start the stream!
    if (props.roomId && !stream) {
      if (navigator.getUserMedia) {
        navigator
          .getUserMedia({ video: true, audio: true })
          .then((stream_myne) => {
            setStream(stream_myne);
            if (myVideo.current) {
              window.myVid = myVideo;
              myVideo.current.srcObject = stream_myne;
            }
          });
      } else {
        alert("Method - getUserMedia is not supported!");
      }
    } else {
      stopVideoStreaming();
    }
  }, [props.roomId]);

  useEffect(() => {
    if (!stream) {
      return;
    }
    // Start streaming!
    startVideoStreaming();
  }, [stream]);

  //#endregion Effects

  //#region Setup
  function setupPeerEvents(peer) {
    peer.on("open", () => {
      console.log(`Connected to the peer server - ${peer.id}`);
      // Call other users in the room;
      callOtherUsers(peer);
    });

    peer.on("call", (call) => {
      console.log(`Answering the call from - `, call.peer);
      call.answer(stream);

      call.on("stream", function (remoteStream) {
        console.log(`The Peer - ${call.peer} is sending the stream!`);
        if (peers.has(call.peer)) {
          return;
        }
        // Show stream in some video/canvas element.
        let freeVideo = getNextFreeVideo();
        if (freeVideo) {
          console.log(
            `The Stream from the peer - ${call.peer} accepted -> pairing it with the video object`
          );
          freeVideo.current.srcObject = remoteStream;
          peers.add(call.peer);
        } else {
          console.log("No free video objects found!");
          alert("Couldnot display the video of the new user!");
        }
      });
    });

    peer.on("close", () => {
      console.log("Call has been stopped by the server!");
    });

    peer.on("error", (e) => {
      console.log(e);
      peer.destroy(); 
      if (FATAL_ERRORS.includes(e.type)) {
        startVideoStreaming(); // this function waits then tries the entire connection over again
      } else {
        console.log("Non fatal error: ", e.type);
      }
    });
  }

  // Make a call to all of the users in the room!
  function callOtherUsers(peer) {
    let count = 1;
    users.map((user) => {
      // Max 3 users allowed...
      if (count > 3) {
        return;
      }
      // If it is me, don't call.
      if (user.userName == userName) {
        return;
      }

      const call = peer.call(user.userName + roomId, stream, {
        metadata: { userId: userName },
      });

      console.log(`Calling the user - ${user.userName}`);

      call.on("stream", function (remoteStream) {
        // This event is firing twice! So dont proceed if it's the second one!
        if (peers.has(call.peer)) {
          return;
        }

        // Show stream in some video/canvas element.
        let who = getNextFreeVideo();
        // switch (count) {
        //   case 1: {
        //     who = peerVideo_1;
        //     break;
        //   }
        //   case 2: {
        //     who = peerVideo_2;
        //     break;
        //   }
        //   case 3: {
        //     who = peerVideo_3;
        //     break;
        //   }
        // }
        // Assign the src object;
        who && (who.current.srcObject = remoteStream);

        count++;
        peers.add(call.peer);
        console.log(`Connected to the user - ${user.userName}`);
      });

      call.on("close", () => {
        console.log("Call has been stopped by the server!");
      });
      call.on("error", (err) => {
        console.log(err);
        if (FATAL_ERRORS.includes(err.type)) {
          peer.destroy();
          // peer.reconnect(); // this function waits then tries the entire connection over again
          startVideoStreaming(); 
        } else {
          console.log("Non fatal error: ", err.type);
        }
      });
    });
  }

  function getNextFreeVideo() {
    if (!peerVideo_1.current.srcObject) {
      return peerVideo_1;
    } else if (!peerVideo_2.current.srcObject) {
      return peerVideo_2;
    } else if (!peerVideo_3.current.srcObject) {
      return peerVideo_3;
    }
    return null;
  }
  //#endregion Setup

  // stop both mic and camera
function stopBothVideoAndAudio(stream) {
  stream.getTracks().forEach(function(track) {
      if (track.readyState == 'live') {
          track.stop();
      }
  });
}

  function startVideoStreaming() {
    const Peer = window.Peer;

    // Setup a peer!
    var peer = (window.myPeer = new Peer(userName + roomId));

    // Setup my peer events.
    setupPeerEvents(peer);
  }

  function stopVideoStreaming() {
    if (window.myPeer) {
      stopBothVideoAndAudio(stream); 
      window.myPeer.destroy(); // destroy the link
      window.myPeer = null; // destroy the conn
      setStream(null);
      myVideo.current.srcObject = null;
    }
  }

  return (
    <div id="video-container">
      <Grid id="video-grid-out">
        <Grid.Row columns="2" id="grid-row-1" id="grid-row-1">
          <Grid.Column className="video-user" id="video-you">
            <video
              width="320"
              height="340"
              controls
              autoPlay
              muted
              id="my-video"
              ref={myVideo}
            />
          </Grid.Column>
          <Grid.Column className="video-user">
            <video
              controls
              autoPlay
              ref={peerVideo_1}
              id="second-video"
            ></video>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="2" id="grid-row-2">
          <Grid.Column className="video-user">
            <video autoPlay controls ref={peerVideo_2} id="third-video"></video>
          </Grid.Column>
          <Grid.Column className="video-user">
            <video
              autoPlay
              controls
              ref={peerVideo_3}
              id="fourth-video"
            ></video>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
