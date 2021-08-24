const express = require('express');
const cors = require('cors');
const path = require('path');
const controller = require('./controller');


const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: 'e929dd5b24bd443e98ca7dd63900c1f9',
    captureUncaught: true,
    captureUnhandledRejections: true
  });

  const app = express();
  const node_dependencies = ['axios'];
  const port = process.env.PORT || 4141;
  
  // rollbar.log("Hello world!");
  
  app.use(express.json());
  app.use(cors());
  
  app.use('/static', express.static(path.join(__dirname, '../client')));
//   app.use('/scripts', express.static(path.join(__dirname + '../node_modules/axios/dist/')));
  app.get('/axios.min.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../node_modules/axios/dist/axios.min.js'));
});
  
app.get('/', (req, res) => {
    rollbar.log('App.get homepage')
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

app.get('/api/friends', controller.getFriends);
app.delete('/api/friends/:id', controller.removeFriend);

// let friends = ['Matt', 'Brady', 'Eric', 'Stuart'];

// app.get('/api/friends', (req, res) => {
//     // console.log('getFriend Controller')
//     res.status(200).send(friends);
// });

// app.delete('/api/friends/:id', (req, res) => {
//     const { id } =req.params;
//     // id = ''
    
//     if(!id) {
//         rollbar.error("No id for app.delete")
//     } else if (id) {
//         friends = friends.filter(element => {
//             return element !== id
//         })
//     }
//     res.status(200).send(friends);
// });



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});