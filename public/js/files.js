'use strict';

import * as notification from "./notification.js"

// URL
const url = window.location.pathname;
const splitUrl = url.split('/');
const regularPrefix = `/users/${splitUrl[2]}`;
const apiPrefix = `/api/users/${splitUrl[2]}`;

// Search inputs
const fileNameInput = document.getElementById('fileNameInput');
const includeTagInput = document.getElementById('includeTagInput');
const excludeTagInput = document.getElementById('excludeTagInput');

// Create inputs
const createTitle = document.getElementById('createTitle');
const createLabelInput = document.getElementById('createLabelInput');
const createAddedTagList = document.getElementById('createAddedTagList');
const createAddTagList = document.getElementById('createAddTagList');
const createCreateTagInput = document.getElementById('createCreateTagInput');

// Tag inputs
const tagTitle = document.getElementById('tagTitle');
const tagAllTagList = document.getElementById('tagAllTagList');
const tagAddTagButton = document.getElementById('tagAddTagButton');
const tagAddTagList = document.getElementById('tagAddTagList');
const tagCreateTagInput = document.getElementById('tagCreateTagInput');

// Delete elements
const deleteTitle = document.getElementById('deleteTitle');
const deleteMessage = document.getElementById('deleteMessage');
const confirmDeleteButton = document.getElementById('confirmDeleteButton');

// File display
const fileList = document.getElementById('fileList');

// Cache
let foundTags = [];
let newFileTags = [];

// Events
window.addEventListener('load', () => {
    document.getElementById('searchFilesButton').addEventListener('click', () => getFileSearch().catch(notification.showDangerToast));

    document.getElementById('createNote').addEventListener('click', () => {
        removeChildren(createTitle);
        createTitle.appendChild(document.createTextNode("Create Note"));
        createLabelInput.value = '';
        createLabelInput.setAttribute('placeholder', 'note name');
        newFileTags = [];
        modifyNewFileTagsList();
        const createCreateButton = document.getElementById('createCreateButton');
        createCreateButton.replaceWith(createCreateButton.cloneNode(true));
        document.getElementById('createCreateButton').addEventListener('click', () => {
            createNote(createLabelInput.value)
                .then(_ => {
                    window.open(encodeURI(`${regularPrefix}/files/notes/${createLabelInput.value}`), "_blank");
                    bootstrap.Modal.getInstance(document.getElementById('createModal')).hide();
                    return getFileSearch();
                })
                .catch(notification.showDangerToast);
        });
    });

    document.getElementById('createFlashcard').addEventListener('click', () => {
        removeChildren(createTitle);
        createTitle.appendChild(document.createTextNode("Create Flashcard"));
        createLabelInput.value = '';
        createLabelInput.setAttribute('placeholder', 'flashcard name');
        newFileTags = [];
        modifyNewFileTagsList();
        const createCreateButton = document.getElementById('createCreateButton');
        createCreateButton.replaceWith(createCreateButton.cloneNode(true));
        document.getElementById('createCreateButton').addEventListener('click', () => {
            createFlashcards(createLabelInput.value)
                .then(_ => {
                    window.open(encodeURI(`${regularPrefix}/files/flashcards/${createLabelInput.value}`), "_blank");
                    bootstrap.Modal.getInstance(document.getElementById('createModal')).hide();
                    return getFileSearch();
                })
                .catch(notification.showDangerToast);
        });
    });

    document.getElementById('createCreateTagButton').addEventListener('click', () => {
        createTag(createCreateTagInput.value)
            .then(_ => {
                newFileTags.push(createCreateTagInput.value);
                modifyNewFileTagsList();
                createCreateTagInput.value = "";
                return getAllTags();
            })
            .catch(notification.showDangerToast);
    });

    document.getElementById('showAllTags').addEventListener('click', () => {
        function reloadTags() {
            return getAllTags().then(tags => {
                updateTagSearch(tags);
                updateTagsDropdown(tags);
                removeChildren(tagAllTagList);
                tags.forEach(tag => {
                    const tagItem = document.createElement('li');
                    tagItem.classList.add('list-group-item');
                    const tagName = document.createElement('span');
                    tagName.classList.add('tag-name');
                    tagName.appendChild(document.createTextNode(tag));
                    tagItem.appendChild(tagName);
                    const deleteButton = createDangerButton(() => {
                        removeChildren(deleteTitle);
                        deleteTitle.appendChild(document.createTextNode("Delete Tag"));
                        removeChildren(deleteMessage);
                        deleteMessage.appendChild(document.createTextNode(`Are you sure you want to remove "${tag}?"`));
                        const confirmDeleteButton = document.getElementById('confirmDeleteButton');
                        confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
                        document.getElementById('confirmDeleteButton').addEventListener('click', () => {
                            deleteTag(tag)
                                .then(_ => reloadTags())
                                .catch(notification.showDangerToast);
                            bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
                            bootstrap.Modal.getInstance(document.getElementById('tagModal')).show();
                        });
                    });
                    deleteButton.setAttribute('data-bs-toggle', 'modal');
                    deleteButton.setAttribute('data-bs-target', '#deleteModal');
                    tagItem.appendChild(deleteButton);
                    tagAllTagList.appendChild(tagItem);
                });
            });
        }

        reloadTags().catch(notification.showDangerToast);

        removeChildren(tagTitle);
        tagTitle.appendChild(document.createTextNode('Tags'));
        tagCreateTagInput.value = '';
        tagAddTagButton.style.display = 'none';
        const tagCreateTagButton = document.getElementById('tagCreateTagButton');
        tagCreateTagButton.replaceWith(tagCreateTagButton.cloneNode(true));
        document.getElementById('tagCreateTagButton').addEventListener('click', () => {
            createTag(tagCreateTagInput.value)
                .then(_ => {
                    tagCreateTagInput.value = "";
                    return reloadTags();
                })
                .catch(notification.showDangerToast);
        });
    });

    // Retrieve tags
    getAllTags()
        .then(tags => {
            updateTagSearch(tags);
            updateTagsDropdown(tags);
        })
        .catch(notification.showDangerToast);

    // Retrieve files
    getAllFiles().catch(notification.showDangerToast);
})

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
        return Promise.resolve().then(() => { throw "File name is empty!" });
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
        return Promise.resolve(() => { throw "File name is empty!" });
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
function updateTagSearch(tags) {
    removeChildren(includeTagInput);
    removeChildren(excludeTagInput);
    tags.forEach((tag, index) => {
        includeTagInput.appendChild(createOption(tag, index + 1));
        excludeTagInput.appendChild(createOption(tag, index + 1));
    });
}

/**
 * Modify all of the tag dropdowns with DOM surgery.
 * 
 * @param {string[]} tags 
 */
function updateTagsDropdown(tags) {
    removeChildren(createAddTagList);
    tags.forEach(tag => {
        createAddTagList.appendChild(createDropdownItem(tag, () => {
            newFileTags.push(tag);
            modifyNewFileTagsList();
        }));
    });
}

/**
 * Modify the tag list for the create modal with DOM surgery.
 */
function modifyNewFileTagsList() {
    removeChildren(createAddedTagList);
    newFileTags.forEach(tag => {
        createAddedTagList.appendChild(createTagListItem(tag, () => {
            newFileTags = newFileTags.filter(x => x != tag);
            modifyNewFileTagsList();
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
            removeChildren(deleteTitle);
            deleteTitle.appendChild(document.createTextNode("Delete File"));
            removeChildren(deleteMessage);
            deleteMessage.appendChild(document.createTextNode(`Are you sure you want to remove "${file.name}?"`));
            const confirmDeleteButton = document.getElementById('confirmDeleteButton');
            confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
            document.getElementById('confirmDeleteButton').addEventListener('click', () => {
                if (file.type === "note") {
                    deleteNote(file.name)
                        .then(_ => getFileSearch())
                        .catch(notification.showDangerToast);
                } else if (file.type === "flashcard") {
                    deleteFlashcards(file.name)
                        .then(_ => getFileSearch())
                        .catch(notification.showDangerToast);
                }
                bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
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
        tagsButton.setAttribute('data-bs-target', '#tagModal');
        tagsButton.appendChild(document.createTextNode('Tags'));
        tagsButton.addEventListener('click', () => {
            removeChildren(tagTitle);
            tagTitle.appendChild(document.createTextNode(`Tags for "${file.name}"`));
            tagCreateTagInput.value = '';
            tagAddTagButton.style.display = 'inline';

            function updateTagList() {
                if (file.type === 'note') {
                    return getTagsOfNote(file.name)
                        .then(tags => {
                            removeChildren(tagAllTagList);
                            tags.forEach(tag => {
                                tagAllTagList.appendChild(createTagListItem(tag, () => removeTagFromNote(file.name, tag).then(_ => updateTagList()).catch(notification.showDangerToast)));
                            });
                        });
                } else if (file.type === 'flashcard') {
                    return getTagsOfFlashcard(file.name)
                        .then(tags => {
                            removeChildren(tagAllTagList);
                            tags.forEach(tag => {
                                tagAllTagList.appendChild(createTagListItem(tag, () => removeTagFromFlashcards(file.name, tag).then(_ => updateTagList()).catch(notification.showDangerToast)));
                            });
                        });
                }
                return Promise.resolve(() => { throw "Unknown file type!" });
            }

            function updateTagDropdown() {
                if (file.type === 'note') {
                    return getAllTags().then(tags => {
                        removeChildren(tagAddTagList);
                        tags.forEach(tag => tagAddTagList.appendChild(createDropdownItem(tag, () => addTagToNote(file.name, tag).then(_ => updateTagList()).catch(notification.showDangerToast))));
                    });
                } else if (file.type === 'flashcard') {
                    return getAllTags().then(tags => {
                        removeChildren(tagAddTagList);
                        tags.forEach(tag => tagAddTagList.appendChild(createDropdownItem(tag, () => addTagToFlashcards(file.name, tag).then(_ => updateTagList()).catch(notification.showDangerToast))));
                    });
                }
                return Promise.resolve().then(() => { throw "Unknown file type!" });
            };

            updateTagList().catch(notification.showDangerToast);
            updateTagDropdown().catch(notification.showDangerToast);

            const tagCreateTagButton = document.getElementById('tagCreateTagButton');
            tagCreateTagButton.replaceWith(tagCreateTagButton.cloneNode(true));
            document.getElementById('tagCreateTagButton').addEventListener('click', () => {
                createTag(tagCreateTagInput.value)
                    .then(_ => {
                        let promise;
                        if (file.type === "note") {
                            promise = addTagToNote(file.name, tagCreateTagInput.value);
                        } else if (file.type === "flashcard") {
                            promise = addTagToFlashcards(file.name, tagCreateTagInput.value);
                        } else {
                            promise = Promise.resolve().then(() => { throw "Unknown file type!" });
                        }
                        return promise.then(_ => getAllTags().then(tags => {
                            tagCreateTagInput.value = "";
                            updateTagSearch(tags);
                            updateTagsDropdown(tags);
                            return updateTagDropdown();
                        }));
                    })
                    .catch(notification.showDangerToast);
            });
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

