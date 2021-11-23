
window.addEventListener('load', async function() {
	const url = window.location.pathname;       // reads url
	const split = url.split('/');
	// post to server. tell server to save file
	fetch(`/api/users/${split[2]}/class/${split[4]}/notes/${split[6]}`)
	.then(response => {
        return response.json();
    }).then(obj => {
        // if we get a status code of 200, set the client-side flashcard set 
        // with flashcard set from server
        console.log(obj)
        if (obj.status === 200) {
            document.getElementById('notepad-textarea').value = obj.result;
        } else {
            throw 'something went wrong with getting the notes from the server: ' + obj.result;
        }

    }).catch(e => {
        console.log(e);
    });
	
	// fetch('/api/users/USER/class/CLASS/notes/NOTE/edit', {
	// 	method: 'POST', 
	// 	body: JSON.stringify({ body: document.getElementById('notepad-textarea').value }), 
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	}
	// });

	// sets the file name of the notes
	document.getElementById('notepad-title').innerHTML = split[split.length-1];
})

document.getElementById('save-btn').addEventListener('click', () => {
	const url = window.location.pathname;       // reads url
	const split = url.split('/');
	console.log(split);
	console.log(document.getElementById('notepad-textarea').value)
	// post to server. tell server to save file
	fetch(`/api/users/${split[2]}/class/${split[4]}/notes/${split[6]}/edit`, {
		method: 'POST', 
		body: JSON.stringify({ body: document.getElementById('notepad-textarea').value }), 
		headers: {
			'Content-Type': 'application/json',
		}
	});


});

