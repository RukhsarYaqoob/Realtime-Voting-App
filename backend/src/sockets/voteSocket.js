import Poll from "../models/Poll.js";

export default function voteSocket(io) {
  io.on("connection", (socket) => {

    socket.join("polls");

    socket.on("join_poll", (pollId) => {
      socket.join(pollId);
    });

    socket.on("disconnect", () => {
    });
  });
}