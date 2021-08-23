const friendsBtn = document.getElementById('friendsBtn');

const friendsContainer = document.getElementById('friendsContainer');

// console.log('hit')

function getFriends() {
    // console.log('getFriend Main.js')
    friendsContainer.innerHTML = '';
    axios.get('/api/friends')
    .then(res => {
        let friends = res.data
        friends.forEach(element => {
            friendsContainer.innerHTML += `<p name=${element}>${element}</p>`

            document.querySelectorAll('p').forEach(element => {
                const id = element.getAttribute('name')

                element.addEventListener('click', () => {
                    // console.log('remove hit')
                    axios.delete(`/api/friends/${id}`)
                    .then(res => {
                        getFriends()
                    })
                    .catch(error => console.log(error))
                })
            })
        });
    })
};

friendsBtn.addEventListener('click', getFriends)