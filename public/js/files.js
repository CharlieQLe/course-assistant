'use strict';

// URL
const url = window.location.pathname;
const splitUrl = url.split('/');
const regularPrefix = `/users/${splitUrl[2]}`;
const apiPrefix = `/api/users/${splitUrl[2]}`;

// Search inputs
const fileNameInput = document.getElementById('fileNameInput');
const includeTagInput = document.getElementById('includeTagInput');
const excludeTagInput = document.getElementById('excludeTagInput');
const searchFilesButton = document.getElementById('searchFilesButton');

// Create note inputs
const noteLabelInput = document.getElementById('noteLabelInput');
const noteAddedTagList = document.getElementById('noteAddedTagList');
const noteAddTagList = document.getElementById('noteAddTagList');
const noteCreateTagInput = document.getElementById('noteCreateTagInput');

// Create flashcard inputs
const flashcardLabelInput = document.getElementById('flashcardLabelInput');
const flashcardAddedTagList = document.getElementById('flashcardAddedTagList');
const flashcardAddTagList = document.getElementById('flashcardAddTagList');
const flashcardCreateTagInput = document.getElementById('flashcardCreateTagInput');

// Upload inputs

// Tag inputs
const allTagList = document.getElementById('allTagList');
const addTagInput = document.getElementById('addTagInput');

// File display
const fileList = document.getElementById('fileList');

// Cache
let newFileTags = [];

// Events
searchFilesButton.addEventListener('click', retrieveSearch);
document.getElementById('addTagButton').addEventListener('click', () => addTag(addTagInput.value, () => addTagInput.value = ""));

document.getElementById('createNoteModal').addEventListener('show.bs.modal', () => {
    newFileTags = [];
    renderNoteTagList();
});

document.getElementById('createNoteButton').addEventListener('click', () => {
    let name = noteLabelInput.value.trim();
    if (name !== '') {
        fetch(encodeURI(`${apiPrefix}/files/notes/${name}/create`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tags: newFileTags,
                body: ""
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === 0) {
                    retrieveSearch();
                    console.log(`${regularPrefix}/files/notes/${name}`);
                    window.open(`${regularPrefix}/files/notes/${name}`, "_blank");
                } else {
                    console.log(response);
                }
            })
            .catch(console.log)
    }
});

document.getElementById('noteCreateTagButton').addEventListener('click', () => addTag(noteCreateTagInput.value, () => noteCreateTagInput.value = ""));

document.getElementById('createFlashcardModal').addEventListener('show.bs.modal', () => {
    newFileTags = [];
    renderFlashcardTagList();
});
document.getElementById('flashcardCreateTagButton').addEventListener('click', () => addTag(flashcardCreateTagInput.value, () => flashcardCreateTagInput.value = ""));

document.getElementById('createFlashcardButton').addEventListener('click', () => {
    let name = flashcardLabelInput.value.trim();
    if (name !== '') {
        fetch(encodeURI(`${apiPrefix}/files/flashcards/${name}/create`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tags: newFileTags })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                retrieveSearch();
                window.open(encodeURI(`${regularPrefix}/files/flashcards/${name}`), "_blank");
            } else {
                console.log(response);
            }
        })
        .catch(console.log)
    }
});

// Retrieve tags
retrieveTags();

// Retrieve files
retrieveFiles();

/*** HELPER FUNCTIONS ***/

function getSelected(element) {
    let selected = [];
    for (let i = 0; i < element.options.length; i++) {
        if (element.options[i].selected) {
            selected.push(element.options[i].innerHTML);
        }
    }
    return selected;
}

function clearChildren(element) {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}

function createOption(name, index) {
    const option = document.createElement("option");
    option.setAttribute("value", index + 1);
    option.appendChild(document.createTextNode(name));
    return option;
}

function createDeleteButton(onClick, label='Delete') {
    const button = document.createElement('button');
    button.classList.add('delete-button', 'btn', 'btn-outline-danger');
    button.setAttribute('type', 'button');
    button.appendChild(document.createTextNode(label));
    button.addEventListener('click', onClick);
    return button;
}

function addTag(tagName, onSuccess=()=>{}) {
    const tag = tagName.trim();
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
                    onSuccess();
                    retrieveTags();
                } else {
                    // todo
                }
            })
            .catch(console.log);
    }
}

/*** MAIN FUNCTIONS ***/

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
    fetch(`${apiPrefix}/files/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName: fileNameInput.value,
            includeTags: getSelected(includeTagInput),
            excludeTags: getSelected(excludeTagInput)
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
                renderTagModal(response.data);
                renderCreateTagOptions(response.data);
            } else {
                console.log(response);
            }
        })
        .catch(console.log);
}

function renderTagModal(tags) {
    clearChildren(includeTagInput);
    clearChildren(excludeTagInput);
    clearChildren(allTagList);
    tags.forEach((tag, index) => {
        includeTagInput.appendChild(createOption(tag, index + 1));
        excludeTagInput.appendChild(createOption(tag, index + 1));

        // Set all tag list
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        const tagName = document.createElement('span');
        tagName.classList.add('tag-name');
        tagName.appendChild(document.createTextNode(tag));
        li.appendChild(tagName);
        li.appendChild(createDeleteButton(() => {
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
        }));
        allTagList.appendChild(li);
    });
}

function renderCreateTagOptions(tags) {
    clearChildren(noteAddTagList);
    clearChildren(flashcardAddTagList);
    tags.forEach(tag => {
        let li = document.createElement('li');
        li.classList.add('dropdown-item');
        li.appendChild(document.createTextNode(tag));
        li.addEventListener('click', () => {
            newFileTags.push(tag);
            renderNoteTagList();
        });
        noteAddTagList.appendChild(li);

        li = document.createElement('li');
        li.classList.add('dropdown-item');
        li.appendChild(document.createTextNode(tag));
        li.addEventListener('click', () => {
            newFileTags.push(tag);
            renderFlashcardTagList();
        });
        flashcardAddTagList.appendChild(li);
    });
}

function renderNoteTagList() {
    clearChildren(noteAddedTagList);
    newFileTags.forEach(tag => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        let tagName = document.createElement('span');
        tagName.classList.add('tag-name');
        tagName.appendChild(document.createTextNode(tag));
        li.appendChild(tagName);
        li.appendChild(createDeleteButton(() => {
            newFileTags.filter(x => x != tag);
            renderNoteTagList();
        }, 'Remove'));
        noteAddedTagList.appendChild(li);
    });
}

function renderFlashcardTagList() {
    clearChildren(flashcardAddedTagList);
    newFileTags.forEach(tag => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        let tagName = document.createElement('span');
        tagName.classList.add('tag-name');
        tagName.appendChild(document.createTextNode(tag));
        li.appendChild(tagName);
        li.appendChild(createDeleteButton(() => {
            newFileTags = newFileTags.filter(x => x != tag);
            renderFlashcardTagList();
        }, 'Remove'));
        flashcardAddedTagList.appendChild(li);
    });
}

function renderFiles(files) {
    clearChildren(fileList);
    files.forEach(file => {
        const display = document.createElement('li');
        display.classList.add('list-group-item');
        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.appendChild(document.createTextNode(file.name));
        display.appendChild(fileName);
        display.appendChild(createDeleteButton(() => {
            if (file.type === "note") {
                fetch(`${apiPrefix}/files/notes/${file.name}/remove`, {
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
                fetch(`${apiPrefix}/files/flashcards/${file.name}/remove`, {
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
        }));
        
        fileList.append(display);
    });
}