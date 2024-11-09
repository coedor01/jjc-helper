import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(`request.nextUrl.pathname=${request.nextUrl.pathname}`);

  if (
    request.nextUrl.pathname !== "/setRole" &&
    !(request.cookies.has("server") && request.cookies.has("name"))
  ) {
    return NextResponse.redirect(new URL("/setRole", request.url));
  }
}

export const config = {
  matcher: ["/", "/setRole", "/rooms/:path*"],
};
