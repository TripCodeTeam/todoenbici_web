"use client";

import React from "react";
import { WebSocketProvider } from "next-ws/client";

function WsProvider({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider url="wss://todoenbici.vercel.app/api/ws">
      {children}
    </WebSocketProvider>
  );
}

export default WsProvider;
