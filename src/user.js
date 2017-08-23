const User = (function() {
  let nextId = 1
  const users = []
	return class User {

		constructor(name, email) {
      this.name = name
      this.email = email
			this.games = []
      this.id = nextId++
      users.push(this)
		}

    static all() {
      return users
    }

	}
})()
