import mongoose from 'mongoose';

const mongodbUri: string = process.env.MONGODB_URI || '';
const port: string = process.env.PORT || '';

const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(mongodbUri);
        console.log(`Successfully connected to MongoDB! Listening on port ${port}...`);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export {
    connect
}