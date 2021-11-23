
window.addEventListener('load', async function() {

	// post to server. tell server to save file
	fetch('/api/users/USER/class/CLASS/notes/NOTE/edit', {
		method: 'POST', 
		body: JSON.stringify({ body: document.getElementById('notepad-textarea').value }), 
		headers: {
			'Content-Type': 'application/json',
		}
	});

	// sets the file name of the notes
	const url = window.location.pathname;		// reads the url 
	const split = url.split('/');
	document.getElementById('notepad-title').innerHTML = split[split.length-1];
})

document.getElementById('save-btn').addEventListener('click', () => {
	
	// post to server. tell server to save file
	fetch('/api/users/USER/class/CLASS/notes/NOTE/edit', {
		method: 'POST', 
		body: JSON.stringify({ body: document.getElementById('notepad-textarea').value }), 
		headers: {
			'Content-Type': 'application/json',
		}
	});


});

