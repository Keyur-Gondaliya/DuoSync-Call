interface LocalDescriptionType {
  description: RTCSessionDescription | null;
}
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  iceCandidate: (params: IceCandidateType) => void;
  localDescription: (params: LocalDescriptionType) => void;
  iceCandidateReply: (params: IceCandidateType) => void;
  remoteDescription: (params: LocalDescriptionType) => void;
}
interface JoinType {
  roomId: string;
}

interface IceCandidateType {
  candidate: RTCIceCandidate | null;
}

export interface ClientToServerEvents {
  join: (params: JoinType, callback: (e: string) => void) => void;
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

export interface Users {
  [socketId: string]: User;
}
interface Room {
  roomId: string;
  users: string[];
}
export interface Rooms {
  [socketId: string]: Room;
}
