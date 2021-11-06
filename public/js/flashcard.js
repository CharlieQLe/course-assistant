'use strict'


/* DOM SURGERY
<div class="row d-flex justify-content-center flex-nowrap p-4">
    <div class="col-3 text-center">
        1 of 3
    </div>
    <div class="col-3 text-center">
        2 of 3
    </div>
    <div class="col-1 text-center">
        <i class="bi bi-x hov"></i>
    </div>
</div>
*/

let flashcards = [];

function render(element) {
    element.innerHTML = '';

    for (let i = 0; i < flashcards.length; i++) {
        const main = document.createElement('div');
        main.classList.add('d-flex', 'justify-content-center', 'flex-nowrap', 'p-4');

        const term = document.createElement('div');
        term.classList.add('col-3', 'text-center', 'word-wrap');
        term.innerText = flashcards[i].term;

        const desc = document.createElement('div');
        desc.classList.add('col-3', 'text-center', 'word-wrap');
        desc.innerText = flashcards[i].desc;

        const xButton = document.createElement('div');
        xButton.classList.add('col-1', 'text-center');

        const x = document.createElement('i');
        x.classList.add('bi', 'bi-x', 'hov');
        x.setAttribute('id', 'add-flashcard-x-btn');
        xButton.appendChild(x);

        main.appendChild(term);
        main.appendChild(desc)
        main.appendChild(xButton);

        x.addEventListener('click', () => {
            let main = x.parentNode.parentNode;

            let obj = { term: main.childNodes[0].innerHTML, desc: main.childNodes[1].innerHTML }
            console.log(obj);

            let deleteAtIndex = -1;
            for (let i = 0; i < flashcards.length; i++) {
                if (flashcards[i].term === obj.term && flashcards[i].desc === obj.desc) {
                    deleteAtIndex = i;
                    console.log(i);
                }
            }
            flashcards.splice(deleteAtIndex, 1);
            console.log(flashcards)
            render(document.getElementById('flashcard'));
        })

        element.appendChild(main);
    }
}


// when client clicks on the initial add flashcard button, it adds an attribute 
// to the modal button which closes it 
document.getElementById('add-flashcard-modal').addEventListener('shown.bs.modal', function (event) {
    document.getElementById('add-flashcard-btn').setAttribute("data-bs-dismiss", "modal")
})


document.getElementById('add-flashcard-btn').addEventListener('click', () => {
    const t = document.getElementById('term-input').value;
    const d = document.getElementById('flashcard-desc-input').value;

    if (t.length === 0 || d.length === 0) {
        return;
    }
    flashcards.push({ term: t, desc: d });

    // clear term and description input box after every added term
    document.getElementById('term-input').value = '';
    document.getElementById('flashcard-desc-input').value = '';


    render(document.getElementById('flashcard'));

});

document.getElementById('study-btn').addEventListener('click', () => {
    // TODO
    document.getElementById('study-and-flashcard').classList.toggle("invisible");
    document.getElementById('review-missed-term').classList.toggle("invisible");
})

document.getElementById('edit-btn').addEventListener('click', () => {
    // TODO
    document.getElementById('study-and-flashcard').classList.toggle("invisible");
    document.getElementById('review-missed-term').classList.toggle("invisible");
})

