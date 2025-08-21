import dotenv from 'dotenv';
dotenv.config();


export const env = {
PORT: process.env.PORT || 5000,
MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/webrtc',
JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'dev-access',
JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev-refresh',
ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL || '15m',
REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL || '7d',
CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
};