usersAdapt = new UsersAdapter()

function submitUser(){
	event.preventDefault()

	let name = $('#user-name').val()
	let email = $('#user-email').val()


	usersAdapt.createUser(name, email).then(function(){User.renderUsersWithNewUser()})

	event.target.parentElement.reset()

	$('#user-form').hide()

	let user = new User(name, email)
	return user
}



// function renderUsers(){
//       usersAdapt.getUsers().then(function(json){
//         json.forEach(function(userObj){
//           let user = new User(userObj.name, userObj.email)
//         })
//       }).then(function(){User.appendToDom()})
//     }
//
