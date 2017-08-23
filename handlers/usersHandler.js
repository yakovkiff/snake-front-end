usersAdapt = new UsersAdapter()

function submitUser(){

	let name = $('#user-name').val()
	let email = $('#user-email').val()

	usersAdapt.createUser(name, email).then(function(){User.renderUsersWithNewUser})

	event.target.parentElement.reset()
	$('#game-container').focus()
}



// function renderUsers(){
//       usersAdapt.getUsers().then(function(json){
//         json.forEach(function(userObj){
//           let user = new User(userObj.name, userObj.email)
//         })
//       }).then(function(){User.appendToDom()})  
//     }
//  