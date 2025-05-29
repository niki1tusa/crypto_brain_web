import jwt from 'jsonwebtoken';
import { env } from '../lib/env';


const jwt_secret = env.JWT_SECRET;

// Generate JWT token
export const tokenSign = (userId: string):string => {
	return jwt.sign(
		{userId},
		jwt_secret,
		{ expiresIn: '999999h' } // Token valid for 24 hours
	);
};
