const pool = require('../database/database');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
    const { username, email, age, password } = req.body;

    if (!username || !email || !age || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, email, age, password) VALUES ($1, $2, $3, $4)';

    const newUser = {
        name: username,
        email: email,
        age: age,
    };

    try {
        const results = await queryPromise(sql, [username, email, age, hashPassword]);
        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal error creating user' });
    }
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

module.exports = createUser;
