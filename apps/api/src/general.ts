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
