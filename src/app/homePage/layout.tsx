import { LoadingSpinner } from "@/app/loading";
import MainLayout from "@/layout/mainlayout/Mainlayout";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
        <MainLayout>{children}</MainLayout>
    </div>
  );
}
