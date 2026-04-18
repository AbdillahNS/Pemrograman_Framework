import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const hanyaAdmin = ["/admin"];
const hanyaEditor = ["/editor"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const isProtectedRoute = requireAuth.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
    const isAdminRoute = hanyaAdmin.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
    const isEditorRoute = hanyaEditor.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (isProtectedRoute) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const Url = new URL("/auth/login", req.url);
        Url.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}` || "/");
        return NextResponse.redirect(Url);
      }

      const tokenRole = token.role as string | undefined;
      const isAdmin = tokenRole === "admin";
      const isEditor = tokenRole === "editor";

      if (isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      if (isEditorRoute && !(isEditor || isAdmin)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return middleware(req, next);
  };
}