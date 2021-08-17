const friendsBtn = document.getElementById('friendsBtn');

const friendConteiner = document.getElementById('friendContainer');

function getFriends() {
    axios.get('/api/friends')
    .then(res => {
        let friends = res.data
        friends.forEach((element) => {
            friendConteiner.innerHTML += `<p name=${element}>${element}</p>`

            document.querySelectorAll('p').forEach(element => {
                const id = element.getAttribute('name')

                element.addEventListener('click', () => {
                    axios.delete(`/api/friends/${id}`)
                    .then(res => {
                        getFriends()
                    })
                })
            })
        });
    })
}