import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Video from "@/app/Components/Video";
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  iceCandidate: (params: IceCandidateType) => void;
  localDescription: (params: LocalDescriptionType) => void;
  remoteDescription: (params: LocalDescriptionType) => void;
}
interface JoinType {
  roomId: string;
}
interface IceCandidateType {
  candidate: RTCIceCandidate | null;
}
interface LocalDescriptionType {
  description: RTCSessionDescription | null;
}
export interface ClientToServerEvents {
  join: (params: JoinType) => void;
  iceCandidate: (params: IceCandidateType) => void;
  localDescription: (params: LocalDescriptionType) => void;
  iceCandidateReply: (params: IceCandidateType) => void;
  remoteDescription: (params: LocalDescriptionType) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
interface User {
  roomId: string;
}

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
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:3001"
    );
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
