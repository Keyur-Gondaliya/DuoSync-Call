"use client";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@keyur-gondaliya/common";
import Video from "@/pageList/includes/Video";
import VideoIcon from "@/icons/Video";
import HangUpIcon from "@/icons/Hang";
import MiceIcon from "@/icons/Mice";
import CallIcon from "@/icons/Call";
import Navbar from "@/pageList/includes/Navbar";
import HomePage from "@/pageList/HomePage";
import { meImg, theyImg } from "@/icons/imageURL";

interface ActionType {
  mute: boolean;
  video: boolean;
  hangUp: boolean;
}
export default function Home() {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();
  const [meetingJoined, setMeetingJoined] = useState<boolean>(false);
  const [videoStream, setVideoStream] = useState<MediaStream>();
  const [remoteVideoStream, setRemoteVideoStream] = useState<MediaStream>();
  const [pc, setPC] = useState<RTCPeerConnection>();
  const [action, setAction] = useState<ActionType>({
    mute: true,
    video: true,
    hangUp: false,
  });
  useEffect(() => {
    try {
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
          video: action.video,
          audio: action.mute,
        })
        .then(async (stream) => {
          setVideoStream(stream);
        });

      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
      const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
        io(baseUrl);

      let roomId = "paramsTokenId101";
      socket.on("connect", () => {
        setSocket(socket);
        socket.emit("join", {
          roomId,
        });
      });

      socket.on("localDescription", async ({ description }) => {
        if (description) {
          // Receiving video -
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
        }
      });
    } catch (err: any) {
      console.log(err); /* handle the error */
      if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
        window.alert("Required track is missing.");
      } else if (
        err.name == "NotReadableError" ||
        err.name == "TrackStartError"
      ) {
        window.alert("Webcam or microphone are already in use.");
      } else if (
        err.name == "OverconstrainedError" ||
        err.name == "ConstraintNotSatisfiedError"
      ) {
        window.alert("Constraints cannot be satisfied by available devices.");
      } else if (
        err.name == "NotAllowedError" ||
        err.name == "PermissionDeniedError"
      ) {
        window.alert("Permission denied in the browser.");
      } else if (err.name == "TypeError" || err.name == "TypeError") {
        window.alert("Empty constraints object.");
      } else {
        window.alert("An unknown error occurred.");
      }
    }
    return () => {
      // Clean-up function to disconnect the socket
      if (socket) {
        socket.disconnect();
      }
      if (pc) {
        pc.close();
      }
    };
  }, [action]);

  if (!videoStream)
    return (
      <div
        role="status"
        className="w-full h-screen flex justify-center items-center"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

  if (socket && pc && videoStream && !meetingJoined)
    return (
      <div className="flex flex-col justify-between h-screen ">
        <Navbar />

        <div className="flex flex-col justify-center h-screen p-3">
          <HomePage
            createMeeting={async () => {
              pc.onicecandidate = ({ candidate }) => {
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
          />
        </div>
      </div>
    );

  return (
    <div className="relative w-full h-screen bg-primary">
      <div className="w-full h-screen p-2">
        <Video
          stream={remoteVideoStream}
          muted={false}
          key="1"
          poster={theyImg}
        />
      </div>
      <div className="flex justify-end pr-3 w-full ">
        <div className="absolute bottom-3 w-40 ">
          <Video stream={videoStream} muted={true} key="2" poster={meImg} />
        </div>
      </div>
      <div className="flex ml-8 w-full">
        <div className="absolute top-6  flex ">
          <div className="tracking-[.5em]">
            <div className="flex text-coral-blue text-xl">
              <CallIcon />
              Duo
              <div className="text-white p-0 pb-1 bg-secoundary inline mr-1 text-center">
                S
              </div>
              ync
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="absolute bottom-6  flex ">
          <div
            className="bg-primary rounded-full p-2 mr-2 cursor-pointer"
            onClick={() => {
              setAction((prev: ActionType) => ({ ...prev, mute: !prev.mute }));
            }}
            style={{ opacity: !action.mute ? "0.7" : "1" }}
          >
            <MiceIcon disable={!action.mute} />
          </div>
          <div
            className="bg-primary rounded-full p-2 mr-2 cursor-pointer"
            onClick={() => {
              setAction((prev: ActionType) => ({
                ...prev,
                video: !prev.video,
              }));
            }}
            style={{ opacity: !action.video ? "0.7" : "1" }}
          >
            <VideoIcon disable={!action.video} />
          </div>
          <div
            className="rounded-full bg-red-500 p-2 mr-2 cursor-pointer"
            onClick={() => {
              setAction((prev: ActionType) => ({
                ...prev,
                hangUp: !prev.hangUp,
              }));
            }}
            style={{ opacity: action.hangUp ? "0.7" : "1" }}
          >
            <HangUpIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
