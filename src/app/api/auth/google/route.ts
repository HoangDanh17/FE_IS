import authApiRequest from "@/apiRequests/auth";
import { toast } from "@/components/ui/use-toast";
import { NextResponse } from "next/server";
import { object } from "zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    if (!code) {
      console.log("no see code");
    }
    console.log("code in api: ", code);

    const result = await fetch("http://localhost:8080/api/v1/auth/login-google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });

    // const body = {code: code}
    // const result = await authApiRequest.loginByGoogle(body)

    const data = await result.json();
    console.log("Response data:", data.data.token);
    toast({
          title: `Chào mừng đăng nhập ${data.data.account_info["user-name"]}`,
          duration: 2000,
          variant: "info",
        });
    // localStorage.setItem("sessionToken", data.data.token);
    // const re = await fetch("http://localhost:3000/api/auth", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ sessionToken: data.data.token }),
    // });
    //console.log("ditcommmmmmmm: ", re)
    // await authApiRequest.auth({
    //   sessionToken: data.data.token,
    // });
    // if (data.data.account_info.role === "admin") {
    //   await authApiRequest.auth({
    //     sessionToken: data.data.token,
    //   });
    //   toast({
    //     title: `Chào mừng đăng nhập ${data.data.account_info["user-name"]}`,
    //     duration: 2000,
    //     variant: "info",
    //   });
    //   return NextResponse.redirect(new URL("/homePage", request.url));
    // }


    // } else if (data.data.account_info.role === "user") {
    //   toast({
    //     title: `Thực tập sinh vui lòng sử dụng app`,
    //     duration: 2000,
    //     variant: "destructive",
    //   });
    // } else {
    //   await authApiRequest.auth({
    //     sessionToken: data.data.token,
    //   });
    //   toast({
    //     title: `Chào mừng đăng nhập ${data.data.account_info["user-name"]}`,
    //     duration: 2000,
    //     variant: "info",
    //   });
    //   return NextResponse.redirect(new URL("/listCard", request.url));
    // }
    return NextResponse.redirect(new URL("/homePage", request.url));

  } catch (error) {
    console.log("Error during OAuth callback", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
