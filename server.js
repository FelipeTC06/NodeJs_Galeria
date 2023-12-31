const express = require('express');
const cors = require('cors');
const usersAuthRouter = require('./src/routes/userAuth');
const photosRouter = require('./src/routes/photos');
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', usersAuthRouter);
app.use('/api/photo', photosRouter);
app.use(express.static(__dirname + '/photos-galery'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
