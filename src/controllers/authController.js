const connection = require('../database/database');
const bcrypt = require('bcrypt');

async function createUser(req, res) {
  const { username, email, age, password } = req.body;

  if (!username || !email || !age || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (username, email, age, password) VALUES (?, ?, ?, ?)';
  
  const newUser = {
    name: username,
    email: email,
    age: age,
};

  try {
    const results = await queryPromise(sql, [username, email, age, hashPassword]);
    res.status(201).json({ message: 'Usuário criado com sucesso', newUser });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao criar usuário' });
  }
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

module.exports = createUser;
