import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username must not exceed 30 characters'],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, 'Email must be unique'],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpires: {
        type: Date,
    },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;