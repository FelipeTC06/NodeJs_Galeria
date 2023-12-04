require('dotenv').config();
const { Pool } = require('pg');

// Configuração da conexão com o banco de dados
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: true,
});

pool.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados PostgreSQL');
  }
});

module.exports = pool;
