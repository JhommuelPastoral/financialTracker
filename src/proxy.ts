import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
 
export const proxy = auth((req) => {
  const isAuth = !!req.auth;
  const path = req.nextUrl.pathname;

  if (!isAuth && path === "/") {
    return NextResponse.next();
  }

  if (!isAuth && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAuth && (path === "/" || path=== "/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }  
});
 
// Optionally, don't invoke Proxy on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}