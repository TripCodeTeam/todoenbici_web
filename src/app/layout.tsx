"use client";

import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GlobalProvider } from "@/components/context/ContextDashboard";
import { WebSocketProvider } from "next-ws/client";

const wsUrl = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + '/api/ws';

const metadata: Metadata = {
  title: "TodoEnBici",
  description: "development by TripCode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <WebSocketProvider url={wsUrl}>
        <GlobalProvider>
          <body>{children}</body>
        </GlobalProvider>
      </WebSocketProvider>
    </html>
  );
}
