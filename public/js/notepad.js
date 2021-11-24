
window.addEventListener('load', async function() {
	const url = window.location.pathname;       // reads url
	const split = url.split('/');

	// GET request to server: asking for the file
	fetch(`/api/users/${split[2]}/class/${split[4]}/notes/${split[6]}`)
	.then(response => {
        return response.json();
    }).then(obj => {
        // console.log(obj)
        if (obj.status === 200) {
            document.getElementById('notepad-textarea').value = obj.result;

			// sets the file name of the notes
			document.getElementById('notepad-title').innerHTML = split[split.length-1];
        } else {
            throw 'something went wrong with getting the notes from the server: ' + obj.result;
        }

    }).catch(e => {
		// set page to 404 error if there is an error
		document.body.innerHTML = '404' + ' ' + e;
        // console.log(e);
    });

})

document.getElementById('save-btn').addEventListener('click', () => {
	const url = window.location.pathname;       // reads url
	const split = url.split('/');
	
	// console.log(split);
	// console.log(document.getElementById('notepad-textarea').value)

	// post to server. tell server to save file
	fetch(`/api/users/${split[2]}/class/${split[4]}/notes/${split[6]}/edit`, {
		method: 'POST', 
		body: JSON.stringify({ body: document.getElementById('notepad-textarea').value }), 
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(response => response.json())
	.then(obj => {
		if(obj.status !== 200) {
			throw obj.result;
		}
	}).catch(e => {
		// set page to error if server could not save it
		document.body.innerHTML = '404' + ' ' + e;
	});

});

