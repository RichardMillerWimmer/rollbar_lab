const express = require('express');
const path = require('path');

const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'e929dd5b24bd443e98ca7dd63900c1f9',
    captureUncaught: true,
    captureUnhandledRejections: true
  });

const controller = require('./controller');

const app = express();

// rollbar.log("Hello world!");

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, '../client')));

const port = process.env.PORT || 4141;

app.get('/', (req, res) => {
    rollbar.log('App.get homepage hit')
    res.sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/friends', (req, res) => {
    try {
        friends();
    } catch (error) {
        console.log(error);
        rollbar.error(error);
    }
})

app.get('/api/friends', controller.getFriends)
app.delete('/api/friends/:id', controller.removeFriend)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});