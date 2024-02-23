import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// Import User model
import User from '../../../../models/User.model';

// Import mongoose connection
import { connect } from '../../../../config/mongoose.config';

// Get data from token
import { getUserDataFromToken } from '../../../../helpers/getUserData';

// connect to db
connect();

// Get user data
export async function GET(request: Request, context: any) {
    try {
        // Get user id from params
        const { id } = context.params;
        
        // Find user by id
        const user = await User.findById(id);

        // Check if user exists
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        // Return user data
        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}