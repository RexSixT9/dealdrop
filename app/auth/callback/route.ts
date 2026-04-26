import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

function getSafeNextPath(nextParam: string | null) {
  if (!nextParam) {
    return "/";
  }

  if (!nextParam.startsWith("/") || nextParam.startsWith("//")) {
    return "/";
  }

  return nextParam;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const next = getSafeNextPath(searchParams.get("next"));

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL("/error", request.url));
}
