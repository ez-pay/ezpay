import { config } from 'dotenv';
config();

const nextConfig = {
  env: {
    NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
    NEXT_PUBLIC_ACTION: process.env.NEXT_PUBLIC_ACTION,
    // Add other variables here as needed
  },
};

export default nextConfig;