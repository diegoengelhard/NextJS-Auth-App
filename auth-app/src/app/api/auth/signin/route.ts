// Import mongoose connection
import { connect } from '../../../../config/mongoose.config';

// Import User model
import User from '../../../../models/User.model';

// Import createToken function
import jwtTools from '../../../../utils/jwt.tools';

// Import bycrypt
import bcryptjs from 'bcryptjs';

import { NextRequest, NextResponse } from 'next/server';

// Connect to MongoDB
connect();

// Sign In function
export async function POST(request: NextRequest) {
    try {
        // Get user data from request body
        const { email, password } = await request.json();

        // Check if user exists
        const user = await User.findOne({ email });

        // If user does not exist, return error
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        // If password is incorrect, return error
        if (!validPassword) {
            return NextResponse.json({ error: 'Password is incorrect' }, { status: 400 });
        }

        // Create token
        const token = jwtTools.createToken(user._id);

        const response = NextResponse.json({
            message: 'Sign in successful',
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            success: true,
        });

        // Set token in cookie
        response.cookies.set('token', token, {
            httpOnly: true,
        });

        // Return success message
        return response;

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
