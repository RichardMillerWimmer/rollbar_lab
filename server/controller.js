let friends = ['Matt', 'Brady', 'Eric', 'Stuart'];

module.exports = {
    getFriends: (req, res) => {
        console.log('getFriend Controller')
        res.status(200).send(friends);
    },
    removeFriend: (req, res) => {
        res.status(200).send(friends);
    }
}