import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getUserDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';

        // If there is no token, return null
        if (!token) return null;

        // If there is a token, verify it and return the user id
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}