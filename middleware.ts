import NextAuth from "next-auth";

import { authConfig } from "./auth.config";
import { AUTH_ROUTES, LOGIN, PUBLIC_ROUTES, ROOT } from "./config/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  // console.log("HIT middleware", isAuthenticated)

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
  if (isAuthenticated && isAuthRoute) {
    return Response.redirect(new URL(ROOT, nextUrl));
  }
});

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// OLD CODE ::
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
