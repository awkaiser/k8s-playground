import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.redirect("/");
}

export const config = {
  matcher: "/go-home",
};
