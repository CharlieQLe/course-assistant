'use strict';

// URL
const url = window.location.pathname;
const splitUrl = url.split('/');
const apiPrefix = `/api/users/${splitUrl[2]}`;

// Search inputs
const fileNameInput = document.getElementById('fileNameInput');
const includeTagInput = document.getElementById('includeTagInput');
const excludeTagInput = document.getElementById('excludeTagInput');
const searchFilesButton = document.getElementById('searchFilesButton');

// Create note inputs

// Create flashcard inputs
const allTagList = document.getElementById('allTagList');
const addTagInput = document.getElementById('addTagInput');
const addTagButton = document.getElementById('addTagButton');

// Upload inputs

// Tag inputs

// File display
const fileList = document.getElementById('fileList');

/*** EVENTS ***/
searchFilesButton.addEventListener('click', retrieveSearch);
addTagButton.addEventListener('click', () => {
    const tag = addTagInput.value.trim();
    if (tag !== '') {
        fetch(`${apiPrefix}/tags/${tag}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(response => {
                if (response.statusCode === 0) {
                    retrieveTags();
                } else {
                    // todo
                }
            })
            .catch(console.log);
    }
    addTagInput.value = "";
});

// Retrieve tags
retrieveTags();

// Retrieve files
retrieveFiles();

/*** FUNCTIONS ***/
function retrieveFiles() {
    fetch(`${apiPrefix}/files`)
        .then(response => response.json())
        .then(response => {
            if (response.statusCode === 0) {
                renderFiles(response.data);
            }
        })
        .catch(console.log);
}

function retrieveSearch() {
    let selectedIncludes = [];
    for (let i = 0; i < includeTagInput.options.length; i++) {
        if (includeTagInput.options[i].selected) {
            selectedIncludes.push(includeTagInput.options[i]);
        }
    }

    let selectedExcludes = [];
    for (let i = 0; i < excludeTagInput.options.length; i++) {
        if (excludeTagInput.options[i].selected) {
            selectedExcludes.push(excludeTagInput.options[i]);
        }
    }
    
    fetch(`${apiPrefix}/files/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName: fileNameInput.value,
            includeTags: selectedIncludes,
            excludeTags: selectedExcludes
        })
    })
        .then(response => response.json())
        .then(response => {
            if (response.statusCode === 0) {
                renderFiles(response.data);
            }
        })
        .catch(console.log);
}

function retrieveTags() {
    fetch(`${apiPrefix}/tags`)
        .then(response => response.json())
        .then(response => {
            if (response.statusCode === 0) {
                while (includeTagInput.firstChild) {
                    includeTagInput.firstChild.remove();
                }
                while (excludeTagInput.firstChild) {
                    excludeTagInput.firstChild.remove();
                }
                while (allTagList.firstChild) {
                    allTagList.firstChild.remove();
                }
                response.data.forEach((tag, index) => {
                    const includeOption = document.createElement("option");
                    includeOption.setAttribute("value", index+1);
                    includeOption.appendChild(document.createTextNode(tag));
                    includeTagInput.appendChild(includeOption);
                    
                    const excludeOption = document.createElement("option");
                    excludeOption.setAttribute("value", index+1);
                    excludeOption.appendChild(document.createTextNode(tag));
                    excludeTagInput.appendChild(excludeOption);

                    // Set all tag list
                    const display = document.createElement('li');
                    display.classList.add('list-group-item');
                    
                    const tagName = document.createElement('span');
                    tagName.classList.add('tag-name');
                    tagName.appendChild(document.createTextNode(tag));
                    display.appendChild(tagName);

                    const tagDelete = document.createElement('button');
                    tagDelete.classList.add('tag-delete', 'btn', 'btn-outline-danger');
                    tagDelete.setAttribute('type', 'button');
                    tagDelete.appendChild(document.createTextNode('Delete'));
                    tagDelete.addEventListener('click', () => {
                        fetch(`${apiPrefix}/tags/${tag}/remove`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({})
                        })
                            .then(response => response.json())
                            .then(_ => retrieveTags())
                            .catch(console.log);
                    });
                    display.appendChild(tagDelete);

                    allTagList.appendChild(display);
                });
            } else {
                console.log(response);
            }
        })
        .catch(console.log);
}

function renderFiles(files) {
    while (fileList.firstChild) {
        fileList.firstChild.remove();
    }
    files.forEach(file => {
        const display = document.createElement('li');
        display.classList.add('list-group-item');
        
        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.appendChild(document.createTextNode(file.name));
        display.appendChild(fileName);

        const fileDelete = document.createElement('button');
        fileDelete.classList.add('file-delete', 'btn', 'btn-outline-danger');
        fileDelete.setAttribute('type', 'button');
        fileDelete.appendChild(document.createTextNode('Delete'));
        fileDelete.addEventListener('click', () => {
            if (file.type === "note") {
                fetch(`${apiPrefix}/file/notes/${file.name}/remove`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({})
                })
                    .then(response => response.json())
                    .then(_ => retrieveSearch())
                    .catch(console.log);
            } else if (file.type === "flashcard") {
                fetch(`${apiPrefix}/file/flashcards/${file.name}/remove`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({})
                })
                    .then(response => response.json())
                    .then(_ => retrieveSearch())
                    .catch(console.log);
            }
        });
        display.appendChild(fileDelete);
        
        fileList.append(display);
    });
}