import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPath = path === '/signin' || path === '/signup' || path === '/verifyemail';

    // Get the token from the request cookies
    const token = request.cookies.get('token')?.value || ''
    const userId = request.cookies.get('userId')?.value || ''

    // If no token and not in public paths, redirect to signin
    if (!token && !publicPath && !userId) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // If there's a token and it's a public path, redirect to user profile
    if (token && publicPath) {
        return NextResponse.redirect(new URL(`/profile/${userId}`, request.url))
    }

    // If no token and no userId, redirect to signin
    if (!token && !userId) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }
}

export const config = {
    // Set matcher to all available paths
    matcher: [
        '/',
        '/profile/:id',
        '/signin',
        '/signup',
        '/verifyemail'
    ]
};
