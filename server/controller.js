let friends = ['Matt', 'Brady', 'Eric', 'Stuart'];

module.exports = {
    getFriends: (req, res) => {
        // console.log('getFriend Controller')
        res.status(200).send(friends);
    },
    removeFriend: (req, res) => {
        const { id } = req.params
        // console.log(id)

        friends = friends.filter(element => {
            return element !== id
        })

        res.status(200).send(friends);
    }
}