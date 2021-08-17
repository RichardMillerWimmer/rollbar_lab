const express = require('express');
const path = require('path');

const controller = require('./controller');

const app = express();

app.use(express.json());

const port = process.env.PORT || 4141;

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '/client/index.html'))
});

app.get('/api/friends', controller.getFriends)
app.delete('/api/friends/:id', controller.removeFriend)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});