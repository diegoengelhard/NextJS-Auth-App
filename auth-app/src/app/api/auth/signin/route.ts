// Import mongoose connection
import { connect } from '../../../../config/mongoose.config';

// Import User model
import User from '../../../../models/User.model';

// Import bycrypt
import bcryptjs from 'bcryptjs';

import { NextRequest, NextResponse } from 'next/server';

// Connect to MongoDB
connect();

