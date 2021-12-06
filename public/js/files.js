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

// Tag inputs
const allTagList = document.getElementById('allTagList');
const addTagInput = document.getElementById('addTagInput');
const fileTagModalTitle = document.getElementById('fileTagModalTitle');
const fileAllTagList = document.getElementById('fileAllTagList');
const fileAddTagList = document.getElementById('fileAddTagList');
const fileCreateTagInput = document.getElementById('fileCreateTagInput');
const fileCreateTagButtonContainer = document.getElementById('fileCreateTagButtonContainer');

// Delete modal
const deleteModal = document.getElementById('deleteModal');
const fileDeleteMessage = document.getElementById('fileDeleteMessage');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');

// File display
const fileList = document.getElementById('fileList');

// Cache
let foundTags = [];
let newFileTags = [];

// Events
document.getElementById('searchFilesButton').addEventListener('click', () => getFileSearch().catch(console.log));

document.getElementById('addTagButton').addEventListener('click', () => {
    createTag(addTagInput.value)
        .then(_ => {
            addTagInput.value = "";
            return getAllTags();
        })
        .catch(console.log);
});

document.getElementById('createNoteModal').addEventListener('show.bs.modal', () => {
    newFileTags = [];
    modifyNoteTagsList();
});

document.getElementById('createFlashcardModal').addEventListener('show.bs.modal', () => {
    newFileTags = [];
    modifyFlashcardTagsList();
});

document.getElementById('noteCreateTagButton').addEventListener('click', () => {
    createTag(noteCreateTagInput.value)
        .then(_ => {
            newFileTags.push(noteCreateTagInput.value);
            modifyNoteTagsList();
            noteCreateTagInput.value = "";
            return getAllTags();
        })
        .catch(console.log);
});

document.getElementById('flashcardCreateTagButton').addEventListener('click', () => {
    createTag(flashcardCreateTagInput.value)
        .then(_ => {
            newFileTags.push(flashcardCreateTagInput.value);
            modifyFlashcardTagsList();
            flashcardCreateTagInput.value = "";
            return getAllTags();
        })
        .catch(console.log);
});

document.getElementById('createNoteButton').addEventListener('click', () => {
    createNote(noteLabelInput.value)
        .then(_ => {
            window.open(encodeURI(`${regularPrefix}/files/notes/${noteLabelInput.value}`), "_blank");
            return getFileSearch();
        })
        .catch(console.log);
});

document.getElementById('createFlashcardButton').addEventListener('click', () => {
    createFlashcards(flashcardLabelInput.value)
        .then(_ => {
            window.open(encodeURI(`${regularPrefix}/files/flashcards/${flashcardLabelInput.value}`), "_blank");
            return getFileSearch();
        })
        .catch(console.log);
});

// Retrieve tags
getAllTags().catch(console.log);

// Retrieve files
getAllFiles().catch(console.log);

/*** PROMISES ***/

/**
 * Get every file.
 * 
 * @returns Promise<string[]>
 */
function getAllFiles() {
    return fetch(`${apiPrefix}/files`)
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                modifyFiles(response.result);
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Get every file matching the filter.
 * 
 * @returns Promise<string[]>
 */
function getFileSearch() {
    return fetch(`${apiPrefix}/files/search`, {
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
            if (response.status === 0) {
                modifyFiles(response.result);
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Get every tag.
 * 
 * @returns Promise<string[]>
 */
function getAllTags() {
    return fetch(`${apiPrefix}/tags`)
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                modifyTagSearch(response.result);
                modifyTagsModal(response.result);
                modifyTagsDropdown(response.result);
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Create a tag.
 * 
 * @param {string} tagName 
 * @return Promise<string[]>
 */
function createTag(tagName) {
    const tag = tagName.trim();
    if (tag === '') {
        throw "Tag name is empty!";
    }
    return fetch(`${apiPrefix}/tags/${tag}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Delete a tag.
 * 
 * @param {string} tagName 
 * @return Promise<string[]>
 */
function deleteTag(tagName) {
    const tag = tagName.trim();
    if (tag === '') {
        throw "Tag name is empty!";
    }
    return fetch(`${apiPrefix}/tags/${tag}/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Create a note.
 * 
 * @param {string} fileName 
 * @returns 
 */
function createNote(fileName) {
    fileName = fileName.trim();
    if (fileName === '') {
        throw "File name is empty!";
    }
    return fetch(`${apiPrefix}/files/notes/${fileName}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            body: '',
            tags: newFileTags
        })
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Create a set of flashcards.
 * 
 * @param {string} fileName 
 * @returns 
 */
function createFlashcards(fileName) {
    fileName = fileName.trim();
    if (fileName === '') {
        throw "File name is empty!";
    }
    return fetch(`${apiPrefix}/files/flashcards/${fileName}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: newFileTags })
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Delete a note.
 * 
 * @param {string} fileName 
 * @returns Promise<object>
 */
function deleteNote(fileName) {
    return fetch(`${apiPrefix}/files/notes/${fileName}/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Delete a flashcard set.
 * 
 * @param {string} fileName 
 * @returns Promise<object>
 */
function deleteFlashcards(fileName) {
    return fetch(`${apiPrefix}/files/flashcards/${fileName}/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Get the tags of a note.
 * 
 * @param {string} fileName 
 * @returns 
 */
function getTagsOfNote(fileName) {
    return fetch(`${apiPrefix}/files/notes/${fileName}/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Get the tags of a flashcard.
 * 
 * @param {string} fileName 
 * @returns 
 */
function getTagsOfFlashcard(fileName) {
    return fetch(`${apiPrefix}/files/flashcards/${fileName}/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Add a tag to a note.
 * 
 * @param {string} fileName 
 * @param {string} tag 
 * @returns Promise<object>
 */
function addTagToNote(fileName, tag) {
    return fetch(`${apiPrefix}/files/notes/${fileName}/tags/${tag}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Add a tag to a set of flashcards.
 * 
 * @param {string} fileName 
 * @param {string} tag 
 * @returns Promise<object>
 */
function addTagToFlashcards(fileName, tag) {
    return fetch(`${apiPrefix}/files/flashcards/${fileName}/tags/${tag}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Remove a tag from a note.
 * 
 * @param {string} fileName 
 * @param {string} tag 
 * @returns Promise<object>
 */
function removeTagFromNote(fileName, tag) {
    return fetch(`${apiPrefix}/files/notes/${fileName}/tags/${tag}/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/**
 * Remove a tag from a set of flashcards.
 * 
 * @param {string} fileName 
 * @param {string} tag 
 * @returns Promise<object>
 */
function removeTagFromFlashcards(fileName, tag) {
    return fetch(`${apiPrefix}/files/flashcards/${fileName}/tags/${tag}/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                return Promise.resolve(response.result);
            }
            throw response.result;
        });
}

/*** DOM SURGERY FUNCTIONS ***/

/**
 * Get the selected options of an HTMLElement.
 * 
 * @param {HTMLElement} element 
 * @returns Array<HTMLElement>
 */
function getSelected(element) {
    let selected = [];
    for (let i = 0; i < element.options.length; i++) {
        if (element.options[i].selected) {
            selected.push(element.options[i].innerHTML);
        }
    }
    return selected;
}

/**
 * Remove the children of an HTMLElement.
 * 
 * @param {HTMLElement} element 
 */
function removeChildren(element) {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}

/**
 * Create an HTMLOptionElement.
 * 
 * @param {string} name 
 * @param {number} index 
 * @returns an HTMLOptionElement to append.
 */
function createOption(name, index) {
    const option = document.createElement("option");
    option.setAttribute("value", index + 1);
    option.appendChild(document.createTextNode(name));
    return option;
}

/**
 * Create a danger button.
 * 
 * @param {Function} onClick 
 * @returns an HTMLButtonElement to append.
 */
function createDangerButton(onClick) {
    const button = document.createElement('button');
    button.classList.add('delete-button', 'btn', 'btn-outline-danger');
    button.setAttribute('type', 'button');

    const i = document.createElement('i');
    i.classList.add('bi', 'bi-trash');
    button.appendChild(i);

    button.addEventListener('click', onClick);
    return button;
}

/**
 * Create a list item for tags.
 * 
 * @param {string} tag 
 * @param {Function} onDanger 
 * @returns HTMLLIElement to append.
 */
function createTagListItem(tag, onDanger) {
    const tagItem = document.createElement('li');
    tagItem.classList.add('list-group-item');
    const tagName = document.createElement('span');
    tagName.classList.add('tag-name');
    tagName.appendChild(document.createTextNode(tag));
    tagItem.appendChild(tagName);
    tagItem.appendChild(createDangerButton(onDanger));
    return tagItem;
}

/**
 * Create a dropdown item.
 * 
 * @param {string} label
 * @param {Function} onClick 
 * @returns HTMLLIElement to append.
 */
function createDropdownItem(label, onClick) {
    let dropdownItem = document.createElement('li');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.appendChild(document.createTextNode(label));
    dropdownItem.addEventListener('click', onClick);
    return dropdownItem;
}

/**
 * Modify the tag search with DOM surgery.
 * 
 * @param {string[]} tags 
 */
function modifyTagSearch(tags) {
    removeChildren(includeTagInput);
    removeChildren(excludeTagInput);
    tags.forEach((tag, index) => {
        includeTagInput.appendChild(createOption(tag, index + 1));
        excludeTagInput.appendChild(createOption(tag, index + 1));
    });
}

/**
 * Modify the tags modal with DOM surgery.
 * 
 * @param {string[]} tags 
 */
function modifyTagsModal(tags) {
    removeChildren(allTagList);
    tags.forEach(tag => allTagList.appendChild(createTagListItem(tag, () => deleteTag(tag).then(_ => getAllTags()).catch(console.log))));
}

/**
 * Modify all of the tag dropdowns with DOM surgery.
 * 
 * @param {string[]} tags 
 */
function modifyTagsDropdown(tags) {
    removeChildren(noteAddTagList);
    removeChildren(flashcardAddTagList);
    tags.forEach(tag => {
        noteAddTagList.appendChild(createDropdownItem(tag, () => {
            newFileTags.push(tag);
            modifyNoteTagsList();
        }));

        flashcardAddTagList.appendChild(createDropdownItem(tag, () => {
            newFileTags.push(tag);
            modifyFlashcardTagsList();
        }));
    });
}

/**
 * Modify the tag list for the create note modal with DOM surgery.
 */
function modifyNoteTagsList() {
    removeChildren(noteAddedTagList);
    newFileTags.forEach(tag => {
        noteAddedTagList.appendChild(createTagListItem(tag, () => {
            newFileTags = newFileTags.filter(x => x != tag);
            modifyNoteTagsList();
        }));
    });
}

/**
 * Modify the tag list for the create flashcard modal with DOM surgery.
 */
function modifyFlashcardTagsList() {
    removeChildren(flashcardAddedTagList);
    newFileTags.forEach(tag => {
        flashcardAddedTagList.appendChild(createTagListItem(tag, () => {
            newFileTags = newFileTags.filter(x => x != tag);
            modifyFlashcardTagsList();
        }));
    });
}

/**
 * Modify the file drawers with DOM surgery.
 * 
 * @param {object[]} files 
 */
function modifyFiles(files) {
    removeChildren(fileList);
    files.forEach(file => {
        const fileItem = document.createElement('li');
        fileItem.classList.add('list-group-item');

        // File icon
        const fileTypeIcon = document.createElement('i');
        fileTypeIcon.classList.add('bi');
        if (file.type === 'note') {
            fileTypeIcon.classList.add('bi-card-text');
        } else if (file.type === 'flashcard') {
            fileTypeIcon.classList.add('bi-archive');
        } else {
            fileTypeIcon.classList.add('bi-file-earmark');
        }
        fileItem.appendChild(fileTypeIcon);

        // File label
        const fileNameLabel = document.createElement('span');
        fileNameLabel.classList.add('file-name');
        fileNameLabel.appendChild(document.createTextNode(file.name));
        fileItem.appendChild(fileNameLabel);

        // Delete file button
        const deleteButton = createDangerButton(() => {
            removeChildren(fileDeleteMessage);
            fileDeleteMessage.appendChild(document.createTextNode(`Are you sure you want to remove "${file.name}?"`));
            const confirmDeleteButton = document.getElementById('confirmDeleteButton');
            confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
            document.getElementById('confirmDeleteButton').addEventListener('click', () => {
                if (file.type === "note") {
                    deleteNote(file.name)
                            .then(_ => getFileSearch())
                            .catch(console.log);
                } else if (file.type === "flashcard") {
                    deleteFlashcards(file.name)
                            .then(_ => getFileSearch())
                            .catch(console.log);
                } else {
        
                    // todo
        
                }
                bootstrap.Modal.getInstance(deleteModal).hide();
            });
        });
        deleteButton.setAttribute('data-bs-toggle', 'modal');
        deleteButton.setAttribute('data-bs-target', '#deleteModal');
        fileItem.appendChild(deleteButton);

        // Open file tags button
        const tagsButton = document.createElement('button');
        tagsButton.classList.add('open-button', 'btn', 'btn-outline-primary');
        tagsButton.setAttribute('type', 'button');
        tagsButton.setAttribute('data-bs-toggle', 'modal');
        tagsButton.setAttribute('data-bs-target', '#fileTagModal');
        tagsButton.appendChild(document.createTextNode('Tags'));
        tagsButton.addEventListener('click', () => {
            removeChildren(fileTagModalTitle);
            fileTagModalTitle.appendChild(document.createTextNode(`Tags for "${file.name}"`));

            const modifyFileTagsList = () => {
                let promise;
                if (file.type === 'note') {
                    promise = getTagsOfNote(file.name);
                } else if (file.type === 'flashcard') {
                    promise = getTagsOfFlashcard(file.name);
                } else {
                    promise = Promise.resolve().then(() => {
                        throw "Unknown file type!"
                    });
                }
                promise.then(tags => {
                    removeChildren(fileAllTagList);
                    tags.forEach(tag => {
                        fileAllTagList.appendChild(createTagListItem(tag, () => {
                            let promise;
                            if (file.type === 'note') {
                                promise = removeTagFromNote(file.name, tag);
                            } else if (file.type === 'flashcard') {
                                promise = removeTagFromFlashcards(file.name, tag);
                            } else {
                                promise = Promise.resolve().then(_ => {
                                    throw "Unknown file type!"
                                });
                            }
                            promise.then(_ => modifyFileTagsList())
                                .catch(console.log);
                        }));
                    });
                }).catch(console.log);
            }

            const modifyFileTagsDropdown = () => {
                getAllTags()
                    .then(tags => {
                        removeChildren(fileAddTagList);
                        tags.forEach(tag => {
                            fileAddTagList.appendChild(createDropdownItem(tag, () => {
                                addTagToNote(file.name, tag)
                                    .then(_ => modifyFileTagsList())
                                    .catch(console.log);
                            }));
                        });
                    })
                    .catch(console.log);
            };

            modifyFileTagsDropdown();
            modifyFileTagsList();

            removeChildren(fileCreateTagButtonContainer);
            const fileCreateTagButton = document.createElement('input');
            fileCreateTagButton.classList.add('btn', 'btn-primary');
            fileCreateTagButton.value = 'Create Tag';
            fileCreateTagButton.setAttribute('type', 'button');
            fileCreateTagButton.addEventListener('click', () => {
                createTag(fileCreateTagInput.value)
                    .then(_ => addTagToNote(file.name, fileCreateTagInput.value).then(_ => {
                        modifyFileTagsList();
                        fileCreateTagInput.value = '';
                        return modifyFileTagsDropdown();
                    }))
                    .catch(console.log);
            });
            fileCreateTagButtonContainer.appendChild(fileCreateTagButton);
        });
        fileItem.appendChild(tagsButton);

        // Open file button
        const openButton = document.createElement('button');
        openButton.classList.add('open-button', 'btn', 'btn-primary');
        openButton.setAttribute('type', 'button');
        openButton.appendChild(document.createTextNode('Open'));
        openButton.addEventListener('click', () => {
            if (file.type === 'note') {
                window.open(encodeURI(`${regularPrefix}/files/notes/${file.name}`), "_blank");
            } else if (file.type === 'flashcard') {
                window.open(encodeURI(`${regularPrefix}/files/flashcards/${file.name}`), "_blank");
            }
        });
        fileItem.appendChild(openButton);
        fileList.append(fileItem);
    });
}