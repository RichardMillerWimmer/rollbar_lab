const express = require('express');
const path = require('path');

const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'e929dd5b24bd443e98ca7dd63900c1f9',
    captureUncaught: true,
    captureUnhandledRejections: true
  });

// const controller = require('./controller');

const app = express();

const port = process.env.PORT || 4141;

// rollbar.log("Hello world!");

app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '../client')));


app.get('/', (req, res) => {
    rollbar.log('App.get homepage hit')
    res.sendFile(path.join(__dirname, '../client/index.html'))
});

app.get('/friends', (req, res) => {
    try {
        friends();
    } catch (err) {
        console.log(err);
        rollbar.error(err)
    }
});

let friends = ['Matt', 'Brady', 'Eric', 'Stuart'];

app.get('/api/friends', (req, res) => {
    // console.log('getFriend Controller')
    res.status(200).send(friends);
});

app.delete('/api/friends/:id', (req, res) => {
    const { id } =req.params;
    // id = ''

    if(!id) {
        rollbar.error("No id for app.delete")
    } else if (id) {
        friends = friends.filter(element => {
            return element !== id
        })
    }
    res.status(200).send(friends);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});