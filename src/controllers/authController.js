const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/database');
require('dotenv').config();


async function authUser(req, res) {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?'
    const user = await queryPromise(sql, email);

    if (!user[0]) {
        return res.status(401).json({ message: 'Email ou senha invaliod!' });
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email ou senha invaliod!' });
    }

    const token = jwt.sign({ userId: user[0].id, email: user[0].email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIME,
    });

    const { password: _, ...userLogin } = user[0];

    res.json({
        user: userLogin,
        token: token,
        menssage: 'Usuário logado com sucesso!'
    });
}

function queryPromise(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = authUser;