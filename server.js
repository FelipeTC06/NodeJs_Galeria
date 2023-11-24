const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/routes');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
