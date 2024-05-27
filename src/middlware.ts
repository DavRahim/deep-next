import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";


export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (token &&
        (
            url.password.startsWith("/sign-in") ||
            url.password.startsWith("/sign-up") ||
            url.password.startsWith("/verify") ||
            url.password.startsWith("/")
        )) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
}

export const config = {
    matcher: [
        '/sign-in',
        'sign-up',
        '/',
        '/dashboard/:path*',
        'verify/:path*'
    ]
}