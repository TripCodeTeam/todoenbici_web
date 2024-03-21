export function SOCKET(
  client: import("ws").WebSocket,
  request: import("http").IncomingMessage,
  server: import("ws").WebSocketServer
) {
  // console.log("A client connected!");

  client.on("message", async (message) => {
    server.clients.forEach(async (client) => {
      if (client.readyState === (await import("ws")).WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  client.on("close", () => {
    console.log("A client disconnected!");
  });
}
