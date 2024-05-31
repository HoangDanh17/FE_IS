import HeaderWelcomePage from "@/layout/headerWelcomePage/Header";
import "./globals.css";
import AppProvider from "@/app/app-provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
