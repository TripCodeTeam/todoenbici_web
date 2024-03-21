import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import axios from "axios";

export function SOCKET(
  client: WebSocket,
  request: IncomingMessage,
  server: WebSocketServer
) {
  // console.log("A client connected!");

  client.on("message", async (message) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  client.on("close", () => {
    console.log("A client disconnected!");
  });
}
