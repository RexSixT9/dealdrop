import { NextRequest, NextResponse } from "next/server";

function getSafeRedirectTarget(target: string | null) {
  if (!target) {
    return null;
  }

  try {
    const url = new URL(target);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

export function GET(request: NextRequest) {
  const target = getSafeRedirectTarget(request.nextUrl.searchParams.get("u"));

  if (!target) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(target);
}