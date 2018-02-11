class UsersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/users'
    // this.baseUrl = 'https://snake-web-game-api.herokuapp.com/api/v1/users'
  }

  getUsers() {
    return fetch(this.baseUrl).then(resp => resp.json())
  }

  // createUser(name, email, highScore) {
  //   const userCreateParams = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify({users: {name: name, email: email, high_score: highScore}})
  //   }
  //   return fetch(this.baseUrl,userCreateParams).then( resp => resp.json() ).then(resp=>console.log("from usersAdapter.js #createUser", resp))
  // }

}

//   deleteUser(userId) {
//     const deleteUrl = `${this.baseUrl}/${noteId}`
//     const noteDeleteParams = {
//       method: 'DELETE',
//       headers: {
//         'Content-Type':'application/json'
//       }
//       }
//       return fetch(deleteUrl,noteDeleteParams).then( resp => resp.json() )
//   }
