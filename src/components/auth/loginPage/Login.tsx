"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // Giả sử bạn có API để xác thực người dùng
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username, password }),
    // });

    // if (res.ok) {
    // const data = await res.json();
    // document.cookie = `token=${data.token}; path=/;`; // Lưu token vào cookies
    const data = "12123456";
    document.cookie = `token=${data}; path=/; SameSite=Lax; Secure`; // Lưu token vào cookies
    router.push("/homePage"); // Chuyển hướng tới trang homePage
    // } else {
    //   // Xử lý lỗi đăng nhập
    // }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
