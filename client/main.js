const friendsBtn = document.getElementById('friendsBtn');

const friendsConteiner = document.getElementById('friendsContainer');

function getFriends() {
    console.log('getFriend Main.js')
    friendsConteiner.innerHTML = '';
    axios.get('/api/friends')
    .then(res => {
        let friends = res.data
        friends.forEach(element => {
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
};

friendsBtn.addEventListener('click', getFriends)