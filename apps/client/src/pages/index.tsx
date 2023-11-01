import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}
interface JoinType {
  roomId: string;
}
export interface ClientToServerEvents {
  join: (params: JoinType) => void;
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
  useEffect(() => {
    // socket.on("join", (arg) => {
    //   console.log(arg); // "123"
    // });
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:3001"
    );
    let roomId = "paramsTokenId";
    socket.on("connect", () => {
      // setSocket(s);
      socket.emit("join", {
        roomId,
      });
    });
  }, []);

  return <>pGae1</>;
}
