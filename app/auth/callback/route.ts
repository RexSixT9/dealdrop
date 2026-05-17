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
  const authError = searchParams.get("error");
  const authErrorDescription = searchParams.get("error_description");

  if (!code) {
    if (authError || authErrorDescription) {
      console.error("OAuth callback error", {
        error: authError,
        description: authErrorDescription,
      });

      const url = new URL("/", request.url);
      if (authError) url.searchParams.set("auth_error", authError);
      if (authErrorDescription) {
        url.searchParams.set("auth_error_description", authErrorDescription);
      }
      return NextResponse.redirect(url);
    }

    return new Response("Missing code", { status: 400 });
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }

    console.error("exchangeCodeForSession failed", {
      message: error.message,
      status: error.status,
    });

    const url = new URL("/", request.url);
    url.searchParams.set("auth_error", "session_exchange_failed");
    url.searchParams.set("auth_error_description", error.message);
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(new URL("/error", request.url));
}
