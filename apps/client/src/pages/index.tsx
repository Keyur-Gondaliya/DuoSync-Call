import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Video from "@/app/Components/Video";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@keyur-gondaliya/common";

export default function Home() {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [meetingJoined, setMeetingJoined] = useState<boolean>(false);
  const [videoStream, setVideoStream] = useState<MediaStream>();
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream>();
  const [pc, setPC] = useState<RTCPeerConnection>();
  useEffect(() => {
    let pcTemp = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    setPC(pcTemp);
    window.navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(async (stream) => {
        setVideoStream(stream);
      });
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    console.log(process.env.NEXT_PUBLIC_BASE_URL);

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
      io(baseUrl);
    let roomId = "paramsTokenId";
    socket.on("connect", () => {
      setSocket(socket);
      socket.emit("join", {
        roomId,
      });
    });
    socket.on("localDescription", async ({ description }) => {
      if (description) {
        // Receiving video -
        console.log({ description });
        pcTemp.setRemoteDescription(description);
        pcTemp.ontrack = (e) => {
          setRemoteVideoStream(new MediaStream([e.track]));
        };

        socket.on("iceCandidate", ({ candidate }) => {
          if (candidate) pcTemp.addIceCandidate(candidate);
        });

        pcTemp.onicecandidate = ({ candidate }) => {
          socket.emit("iceCandidateReply", { candidate });
        };
        await pcTemp.setLocalDescription(await pcTemp.createAnswer());
        socket.emit("remoteDescription", {
          description: pcTemp.localDescription,
        });
      }
    });
    socket.on("remoteDescription", async ({ description }) => {
      if (description) {
        // Receiving video -
        console.log({ description });
        pcTemp.setRemoteDescription(description);
        pcTemp.ontrack = (e) => {
          setRemoteVideoStream(new MediaStream([e.track]));
        };

        socket.on("iceCandidate", ({ candidate }) => {
          if (candidate) pcTemp.addIceCandidate(candidate);
        });

        pcTemp.onicecandidate = ({ candidate }) => {
          socket.emit("iceCandidateReply", { candidate });
        };

        //socket.emit("remoteDescription", { description: pcTemp.localDescription });
      }
    });
  }, []);
  if (!videoStream) return <>Loading ...</>;

  if (socket && pc && videoStream && !meetingJoined)
    return (
      <>
        <button
          onClick={async () => {
            pc.onicecandidate = ({ candidate }) => {
              console.log(candidate);
              socket.emit("iceCandidate", { candidate });
            };
            pc.addTrack(videoStream.getVideoTracks()[0]);
            try {
              await pc.setLocalDescription(await pc.createOffer());
              socket.emit("localDescription", {
                description: pc.localDescription,
              });
            } catch (err: any) {
              console.log({ msg: err?.message });
              console.error(err);
            }
            setMeetingJoined(true);
          }}
        >
          Join
        </button>
      </>
    );
  console.log(remoteVideoStream);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        padding: "10px",
      }}
    >
      <div
        style={{
          width: "48%",
          minHeight: "500px",
          border: "1px solid black",
          borderRadius: "10px",
          margin: "10px",
        }}
      >
        <Video stream={videoStream} />
      </div>
      <div
        style={{
          width: "48%",
          minHeight: "500px",
          border: "1px solid black",
          borderRadius: "10px",
          margin: "10px",
        }}
      >
        <Video stream={remoteVideoStream} />
      </div>
    </div>
  );
}
