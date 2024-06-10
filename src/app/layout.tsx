import "./globals.css";
import AppProvider from "@/app/app-provider";
import Loading from "@/app/loading";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
