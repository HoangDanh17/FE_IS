import authApiRequest from "@/apiRequests/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "No code provided" }, { status: 400 });
  }
  try {
    console.log("code", code);
    // const result = await fetch(
    //   "http://localhost:8080/api/v1/auth/login-google",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ code: code }),
    //   }
    // );
    // const data = await result.json();
    // console.log("Response data:", data);
    // Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    console.error("Error during OAuth callback", error);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}
