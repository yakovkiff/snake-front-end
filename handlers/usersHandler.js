usersAdapt = new UsersAdapter()

function submitUser(){
	event.preventDefault()	

	let name = $('#user-name').val()
	let email = $('#user-email').val()

	usersAdapt.createUser(name, email).then(function(){User.renderUsersWithNewUser()})

	event.target.reset()

	$('#user-form').hide()

	Game.gameReady = true

	alert("game will start in 1 second.")
	setTimeout(time => Game.gameOn = true, 1000)

}



// function renderUsers(){
//       usersAdapt.getUsers().then(function(json){
//         json.forEach(function(userObj){
//           let user = new User(userObj.name, userObj.email)
//         })
//       }).then(function(){User.appendToDom()})  
//     }
//  