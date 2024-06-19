require('dotenv/config');

module.exports = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT
};
