import User from '../../../../models/User.model';
import { connect } from '../../../../config/mongoose.config';
import { NextRequest, NextResponse } from 'next/server';

// Connect to the database
connect();

// Verify email
export async function POST(request: NextRequest) {
    try {
        // obtain token from the request
        const { token } = await request.json();

        // find the user with the token
        const user = await User.findOne(
            {
                verificationToken: token,
                verificationTokenExpires: { $gt: Date.now() }
            }
        );

        // check if the user exists
        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // update the user
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        console.log('User verified:', user);

        // return the response
        return NextResponse.json({ message: 'Email verified successfully', user: user }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}