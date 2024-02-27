import { connect } from '../../../../config/mongoose.config';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/User.model';

// Import sendEmail from helpers
import { sendEmail } from '../../../../helpers/mailer';

// Connect to the database
connect();


export async function POST(request: NextRequest) {
    try {
        // Get user data from request body
        const { email, emailType } = await request.json();

        // Check if user already exists
        const user = await User.findOne({ email });

        // If user does not exist, return error
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        }

        // Send email verification
        await sendEmail({ email, emailType, userId: user._id });

        // Return success message
        return NextResponse.json({ message: 'Email sent' }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}