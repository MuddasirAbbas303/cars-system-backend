const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

const signUp = async (req, res) => {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) return res.status(400).json({ error: error.message });

    await supabase.auth.resend({ email})
    

    res.status(200).json({ message: 'User signed up successfully' });
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return res.status(400).json({ error: error.message });

    const token = jwt.sign({ userId: data.user.id }, config.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
};

module.exports = { signUp, signIn };
