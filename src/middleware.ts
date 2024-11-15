import { NextResponse, NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/setRole", request.url));
}
export const config = {
  matcher: [
    {
      source: "/",
      missing: [
        { type: "cookie", key: "fingerprint" },
        { type: "cookie", key: "server" },
        { type: "cookie", key: "name" },
      ],
    },
  ],
};
