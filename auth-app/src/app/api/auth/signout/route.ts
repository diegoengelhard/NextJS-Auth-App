import { NextResponse } from "next/server";

// Sign Out function
export async function GET() {
    try {
        // Set success message
        const response = NextResponse.json({
            message: 'Sign out successful',
            success: true,
        });

        // Remove token from cookie
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        // Remove user id from cookie
        response.cookies.set('userId', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        // Return respones
        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}