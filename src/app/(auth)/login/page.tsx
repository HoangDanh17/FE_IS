import LoginForm from "@/app/(auth)/login/login-form";
import { auth } from "@/app/auth";
import { useEffect } from "react";

const loginPage = async () => {
  const session = await auth();
  if (session) {
    console.log(session);
  }

  return (
    <div>
      <LoginForm></LoginForm>
    </div>
  );
};

export default loginPage;
