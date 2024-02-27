import User from '../../../../models/User.model';
import { connect } from '../../../../config/mongoose.config';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

// Connect to the database
connect();

// Update password
export async function PUT(request: NextRequest) {
    try {
        // obtain token from the request
        const { token, userId, oldPassword, newPassword, confirmPassword } = await request.json();

        // find user via id
        const user = await User.findById(userId);

        // check if user exists
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // check if old password is correct
        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid old password' }, { status: 400 });
        }

        // check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
        }

        // find the user with the token
        const userToUpdate = await User.findOne(
            {
                forgotPasswordToken: token,
                forgotPasswordTokenExpires: { $gt: Date.now() }
            }
        );

        // check token to validate user
        if (!userToUpdate) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        // hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        // update the user
        userToUpdate.password = hashedPassword;
        userToUpdate.forgotPasswordToken = undefined;
        userToUpdate.forgotPasswordTokenExpires = undefined;
        await userToUpdate.save();
        
        // return the response
        return NextResponse.json({ message: 'Password updated successfully', user: userToUpdate }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}