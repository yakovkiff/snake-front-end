class UsersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/users'
  }

  getUsers() {
    return fetch(this.baseUrl).then(resp => resp.json())
    //fetch is a get request to the URL
    //then it is parsed in JSON

  }

  createUser(name, email) {
    const userCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({users: {name: name, email: email}})
    }
    return fetch(this.baseUrl,userCreateParams).then( resp => resp.json() ).then(resp=>console.log("from usersAdapter.js #createUser", resp))
  }

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
