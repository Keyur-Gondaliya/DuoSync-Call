import express from "express";
const app = express();
import { createServer } from "http";
const server = createServer(app);
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  Rooms,
  ServerToClientEvents,
  SocketData,
  Users,
} from "./general";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const rooms: Rooms = {};
const users: Users = {};

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);

  socket.on("join", (params) => {
    const roomId: string = params.roomId;
    users[socket.id] = {
      roomId: roomId,
    };
    if (!rooms[roomId]) {
      rooms[roomId] = {
        roomId,
        users: [],
      };
    }
    rooms[roomId].users.push(socket.id);
    console.log("user added to room " + roomId);
  });
});

server.listen(3001, () => {
  console.log("DuoSync Call listening on :3001");
});
