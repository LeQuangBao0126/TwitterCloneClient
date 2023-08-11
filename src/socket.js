import { io } from "socket.io-client";

console.log(import.meta.env.VITE_API_URL);

export const socket = io(
  import.meta.env.VITE_API_URL || "http://localhost:5000",
  {
    transports: ["websocket"],
  }
);
