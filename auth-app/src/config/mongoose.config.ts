import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const mongodbUri: string = process.env.MONGODB_URI || '';

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(mongodbUri);
        console.log(`Successfully connected to MongoDB!`);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export {
    connect
}