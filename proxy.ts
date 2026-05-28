// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const proxy = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 獲取當前使用者資訊
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 權限判斷邏輯
  // 1. 如果沒登入，且想進 /pocket 或 /settings，強制導向 /auth
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/pocket") ||
      request.nextUrl.pathname.startsWith("/settings"))
  ) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // 2. 如果已經登入，且想進 /auth，強制導向回 /pocket (避免登入後又跑去註冊頁)
  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/pocket", request.url));
  }

  return response;
};

// 設定攔截範圍，排除靜態檔案（圖片、CSS 等）
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
