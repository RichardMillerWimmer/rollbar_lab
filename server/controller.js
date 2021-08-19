

let friends = ['Matt', 'Brady', 'Eric', 'Stuart'];

module.exports = {
    getFriends: (req, res) => {
        // console.log('getFriend Controller')
        res.status(200).send(friends);
    },
    removeFriend: (req, res) => {
        let { id } = req.params
        id = ''
        // console.log(id)

        if(!id) {
            // rollbar.error('No id for app.delete')
        } else if (id) {
            friends = friends.filter(element => {
                return element !== id
            })
        }

        res.status(200).send(friends);
    }
}