const connection = require('../database/database');

async function createUser(req, res) {
  const { username, email, age, password } = req.body;

  if (!username || !email || !age || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
  }

  const sql = 'INSERT INTO users (username, email, age, password) VALUES (?, ?, ?, ?)';
  const values = [username, email, age, password];

  try {
    const results = await queryPromise(sql, values);
    res.status(201).json({ message: 'Usuário criado com sucesso' });
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
