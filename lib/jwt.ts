import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (payload: any) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is undefined");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};


export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};