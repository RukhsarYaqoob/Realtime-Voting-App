import { io } from "socket.io-client";
import { BASE_URL } from "./api/axiosConfig";

const SOCKET_URL = BASE_URL.replace("/api", "");

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export function joinPollRoom(pollId) {
  if (socket.connected) {
    socket.emit("join_poll", String(pollId));
  }
}

if (import.meta.env.DEV) {
  socket.on("connect", () => console.log("✅ Socket connected:", socket.id));
  socket.on("disconnect", () => console.log("❌ Socket disconnected"));
}