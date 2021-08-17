let friends = ['Matt', 'Brady', 'Eric', 'Stuart'];

module.exports = {
    getFriends: (req, res) => {
        res.status(200).send(friends);
    },
    removeFriend: (req, res) => {
        res.status(200).send(friends);
    }
}