import LoginPage from "@/components/auth/loginPage/Login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginPage />
    </main>
  );
}
