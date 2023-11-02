"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = require("http");
const server = (0, http_1.createServer)(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const rooms = {};
const users = {};
io.on("connection", (socket) => {
    console.log("a user connected " + socket.id);
    // socket.on("disconnect", (params) => {
    //   Object.keys(rooms).map(roomId => {
    //     rooms[roomId].users = rooms[roomId].users.filter(x => x !== socket.id)
    //   })
    //   delete users[socket.id];
    // })
    socket.on("join", (params) => {
        const roomId = params.roomId;
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
    // socket.on("localDescription", (params) => {
    //   let roomId = users[socket.id].roomId;
    //   let otherUsers = rooms[roomId].users;
    //   otherUsers.forEach(otherUser => {
    //     if (otherUser !== socket.id) {
    //       io.to(otherUser).emit("localDescription", {
    //           description: params.description
    //       })
    //     }
    //   })
    // })
    // socket.on("remoteDescription", (params) => {
    //   let roomId = users[socket.id].roomId;
    //   let otherUsers = rooms[roomId].users;
    //   otherUsers.forEach(otherUser => {
    //     if (otherUser !== socket.id) {
    //       io.to(otherUser).emit("remoteDescription", {
    //           description: params.description
    //       })
    //     }
    //   })
    // });
    socket.on("iceCandidate", (params) => {
        console.log("hgg", params);
        let roomId = users[socket.id].roomId;
        let otherUsers = rooms[roomId].users;
        // otherUsers.forEach(otherUser => {
        //   if (otherUser !== socket.id) {
        //     io.to(otherUser).emit("iceCandidate", {
        //       candidate: params.candidate
        //     })
        //   }
        // })
    });
    // socket.on("iceCandidateReply", (params) => {
    //   let roomId = users[socket.id].roomId;
    //   let otherUsers = rooms[roomId].users;
    //   otherUsers.forEach(otherUser => {
    //     if (otherUser !== socket.id) {
    //       io.to(otherUser).emit("iceCandidateReply", {
    //         candidate: params.candidate
    //       })
    //     }
    //   })
    // });
});
server.listen(3001, () => {
    console.log("DuoSync Call listening on :3001");
});
