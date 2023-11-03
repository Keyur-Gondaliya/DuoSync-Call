export interface ServerToClientEvents {
  join: (params: JoinType) => void;
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
