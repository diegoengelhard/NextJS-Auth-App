import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, response: NextResponse) {
    const path = request.nextUrl.pathname;
    const publicPath = path === '/signin' || path === '/signup' || path === '/verifyemail';

    // // Get the token from the request cookies
    const token = request.cookies.get('token')?.value || '';
    console.log('token: ', token);
    const userId = request.cookies.get('userId')?.value || '';
    console.log('userId: ', userId);

    if (publicPath && token) {
        return NextResponse.redirect(new URL(`/profile/${userId}`, request.nextUrl))
    }

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }

    // // If no token and no userId, redirect to signin
    // if (!token && !userId) {
    //     return NextResponse.redirect(new URL('/signin', request.url));
    // }
}

export const config = {
    // Set matcher to all available paths
    matcher: [
        '/',
        '/profile',
        '/profile/:path*',
        '/signin',
        '/signup',
        '/verifyemail'
    ]
};
