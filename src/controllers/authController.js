const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/database');
require('dotenv').config();



async function authUser(req, res) {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = $1';
    const result = await queryPromise(sql, [email]);
    const user = result.rows[0];

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password!' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIME,
    });

    const { password: _, ...userLogin } = user;

    res.json({
        user: userLogin,
        token: token,
        menssage: 'User logged in successfully!'
    });
}

function queryPromise(sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = authUser;