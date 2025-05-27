import jwt from 'jsonwebtoken'
import { env } from '../lib/env';

interface User {
    id: string
    name: string;
    email: string;
    phone: string
    password: string;
}
const jwt_secret = env.JWT_SECRET

// Generate JWT token
export const token = (user: User)=>{
return  jwt.sign(
    { 
        userId: user.id,
        name: user.name
    },
    jwt_secret,
    { expiresIn: '999999h' } // Token valid for 24 hours
);
}