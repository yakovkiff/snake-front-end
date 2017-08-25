const User = (function() {
  let nextId = 0
  const users = []
	return class User {

		constructor(name, email) {
      this.name = name
      this.email = email
			this.games = []
      this.id = nextId++
      users.push(this)
      // this.constructor.renderUsers()
		}

    static all() {
      return users
    }

    render(){
      return `<li id="${this.id}">Name: ${this.name}, HighScore:___</li>`
    }

    static renderAll(){
      let usersHTML = users.map(user => user.render()).join('')
      return `
      <h3>High Scores</h3>
      <ul id="users">${usersHTML}</ul>
      `
    }

    static appendToDom(){
      $("#users-container").html(this.renderAll())
    }

    static renderUsersAtStart(){
      usersAdapt = new UsersAdapter()
      usersAdapt.getUsers().then(function(json){
        json.forEach(function(userObj){
          let user = new User(userObj.name, userObj.email)
        })
      }).then(function(){User.appendToDom()})  
    }

    static renderUsersWithNewUser(){
      usersAdapt = new UsersAdapter()
      usersAdapt.getUsers().then(function(jsonArray){
        let userObj = jsonArray[jsonArray.length-1]

        let user = new User(userObj.name, userObj.email)
      }).then(function(){User.appendToDom()}) 
    }
  
  }

})()
