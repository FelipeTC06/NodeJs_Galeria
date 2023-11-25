const express = require('express');
const cors = require('cors');
const usersRouter = require('./src/routes/user');
const photosRouter = require('./src/routes/photos');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', usersRouter);
app.use('/api/photo', photosRouter);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
