// Import mongoose connection
import { connect } from '../../../../config/mongoose.config';

// Import User model
import User from '../../../../models/User.model';

// Import bycrypt
import bcryptjs from 'bcryptjs';

import { NextRequest, NextResponse } from 'next/server';

// Connect to MongoDB
connect();

// Sign Up function
export async function POST(request: NextRequest) {
    try {
        // Get user data from request body
        const { username, email, password } = await request.json();

        // Check if user already exists
        const user = await User.findOne({ email });

        // If user already exists, return error
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Salt and hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save new user
        await newUser.save();

        // Return success message
        return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
