const express = require('express');
const path = require('path');

const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: '',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

const controller = require('./controller');

const app = express();

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '../client')));

const port = process.env.PORT || 4141;

app.get('/', (req, res) => {
    rollbar.log('App.get homepage hit')
    res.sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/api/friends', controller.getFriends)
app.delete('/api/friends/:id', controller.removeFriend)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});