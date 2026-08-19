import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/sign-in", "/sign-up", "/faq", "/contact", "/mentors"];

function isPublic(pathname: string) {
  if (pathname === "/" || pathname === "/_not-found") return true;
  return PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function isApiPath(pathname: string) {
  return pathname.startsWith("/api/");
}

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/favicon") ||
    /\.(png|jpe?g|svg|webp|avif|gif|ico|woff2?|css|js)$/.test(pathname)
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isApiPath(pathname) || isStaticAsset(pathname) || isPublic(pathname)) {
    return NextResponse.next();
  }

  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ??
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  if (!sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};