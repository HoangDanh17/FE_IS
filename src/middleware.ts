import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Lấy token từ cookies (hoặc bạn có thể sử dụng bất kỳ phương pháp lưu trữ nào khác)
  console.log("token", req);
  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Tiếp tục nếu người dùng có token hoặc đang ở trang /login
}

// Chỉ định các đường dẫn mà middleware sẽ được áp dụng
export const config = {
  matcher: ["/homePage/:path*"],
};
