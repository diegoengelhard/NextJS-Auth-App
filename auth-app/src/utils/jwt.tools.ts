import jwt, { Secret } from 'jsonwebtoken';

// Import ENV variables
const TOKEN_SECRET = process.env.TOKEN_SECRET as Secret;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION as string;

interface JwtPayload {
  userId: string;
}

const jwtTools = {
  // Create token
  createToken: (_id: string): string => {
    const payload: JwtPayload = { userId: _id };
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRATION });
  },
};

export default jwtTools;