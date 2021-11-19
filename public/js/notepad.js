

document.getElementById('save-btn').addEventListener('click', () => {
	
	// post to server. tell server to save file
	// fetch('http://localhost:8080/api/users/USER/class/CLASS/notes/NOTE/edit', {
	fetch('https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/edit', {
		method: 'POST', 
		body: JSON.stringify({Tags: [], Body: document.getElementById('notepad-textarea').value}), 
		headers: {
			'Content-Type': 'application/json',
		}
	})
	// used for debug
	// .then(function(response) {
    //     return response.text()
    // }).then(function(text) {
    //     console.log(text)
    // }).catch(function(error) {
    //     console.log(error)
    // });
})


document.getElementById('add-tags').addEventListener('click', () => {
	const tags = document.getElementById('tags').value.split(',');
	
	// post to server. tell server to save tags
	// fetch('https://cs326-final-kappa.herokuapp.com/api/users/USER/class/CLASS/notes/NOTE/edit', {
	// 	method: 'POST', 
	// 	body: JSON.stringify({Tags: tags, Body: document.getElementById('notepad-textarea').value}), 
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	}
	// })

	// clear tag input field after clicking add
	document.getElementById('tags').value = '';


})