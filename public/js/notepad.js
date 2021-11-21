

document.getElementById('save-btn').addEventListener('click', () => {
	
	// post to server. tell server to save file
	fetch('/api/users/USER/class/CLASS/notes/NOTE/edit', {
		method: 'POST', 
		body: JSON.stringify({ body: document.getElementById('notepad-textarea').value }), 
		headers: {
			'Content-Type': 'application/json',
		}
	})
});

