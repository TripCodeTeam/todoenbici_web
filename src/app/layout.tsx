import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GlobalProvider } from "@/components/context/ContextDashboard";
import { WebSocketProvider } from "next-ws/client";
import { Toaster } from "sonner";
import WsProvider from "./providerWs";

export const metadata: Metadata = {
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
      <WsProvider>
        <GlobalProvider>
          <body>
            <Toaster richColors position="bottom-right" />
            {children}
          </body>
        </GlobalProvider>
      </WsProvider>

    </html>
  );
}
