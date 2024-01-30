import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GlobalProvider } from "@/components/context/ContextDashboard";

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
      <GlobalProvider>
        <body>{children}</body>
      </GlobalProvider>
    </html>
  );
}
