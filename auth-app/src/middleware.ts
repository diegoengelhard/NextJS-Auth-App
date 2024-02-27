import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, response: NextResponse) {
    const path = request.nextUrl.pathname;
    const publicPath = path === '/signin' || path === '/signup' || path === '/forgotpassword' || path === '/verifyemail' || path === '/updatepassword';

    // // Get the token from the request cookies
    const token = request.cookies.get('token')?.value || '';
    const userId = request.cookies.get('userId')?.value || '';
    console.log('token: ', token);
    console.log('userId: ', userId);

    if (publicPath && token) {
        return NextResponse.redirect(new URL(`/profile/${userId}`, request.nextUrl))
    }

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }
}

export const config = {
    // Set matcher to all available paths
    matcher: [
        '/',
        '/profile',
        '/profile/:path*',
        '/signin',
        '/signup',
        '/verifyemail',
        '/forgotpassword',
        '/updatepassword'
    ]
};
