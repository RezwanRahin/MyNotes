const addBtn = document.getElementById('plus');
const notesContainer = document.querySelector('.notes-container');

let newNote = document.createElement('div');
let allNotes = document.createElement('div');


const updateNotes = () => {
    localStorage.setItem('allNotes', allNotes.innerHTML);
}

const getNotes = () => {
    allNotes.innerHTML = localStorage.getItem('allNotes');
}

const creatingNote = (operation) => {
    if (operation) {
        addBtn.style.display = 'none';
        newNote.style.display = 'block';
        allNotes.style.display = 'none';
    } else {
        addBtn.style.display = 'inline-block';
        newNote.style.display = 'none';
        allNotes.style.display = 'block';
    }
}

const addInputToDiv = (element) => {
    element.classList.add('note');

    let txt = document.createElement('textarea');
    txt.classList.add('input');
    txt.setAttribute('cols', '50');
    txt.setAttribute('rows', '10');

    let saveBtn = document.createElement('button');
    saveBtn.classList.add('saveBtn');
    saveBtn.textContent = 'Save';

    let cancelBtn = document.createElement('button');
    cancelBtn.classList.add('cancelBtn');
    cancelBtn.textContent = 'Cancel';

    notesContainer.appendChild(element);
    element.appendChild(txt)
    element.appendChild(saveBtn);
    element.appendChild(cancelBtn);
}

const addAllDiv = () => {
    notesContainer.appendChild(newNote);
    notesContainer.appendChild(allNotes);
    addInputToDiv(newNote);
    creatingNote(false);
}


addBtn.addEventListener('click', () => {
    creatingNote(true);
});


const createCard = (txt) => {
    let card = document.createElement('p');
    card.classList.add('card');
    card.setAttribute('cols', '50');
    card.setAttribute('rows', '10');
    card.textContent = txt;

    let editBtn = new Image();
    editBtn.src = "images/edit.png";
    editBtn.alt = 'edit';

    let deleteBtn = new Image();
    deleteBtn.src = "images/trash_can.png";
    deleteBtn.alt = 'delete';

    card.appendChild(editBtn);
    card.appendChild(deleteBtn);
    return card;
}

newNote.addEventListener('click', (e) => {
    if (e.target.classList.contains('saveBtn')) {
        const saveBtn = e.target;
        let noteTxt = saveBtn.previousElementSibling.value;
        // console.log(noteTxt);

        if (noteTxt === '') {
            alert('Blank Note');
        } else if (saveBtn.hasAttribute('edit')) {
            let noteIndex = saveBtn.getAttribute('edit');
            // allNotes.children[noteIndex].value = noteTxt;
            let card = createCard(noteTxt);
            // allNotes.children[noteIndex].textContent = noteTxt;
            // allNotes.children[noteIndex] = card;
            allNotes.replaceChild(card, allNotes.children[noteIndex]);
            saveBtn.removeAttribute('edit');
            saveBtn.previousElementSibling.value = '';
            updateNotes();

            creatingNote(false);
        } else {
            saveBtn.previousElementSibling.value = '';

            allNotes.classList.add('allNotes')
            notesContainer.appendChild(allNotes);

            let card = createCard(noteTxt);
            allNotes.prepend(card);
            updateNotes();

            creatingNote(false);
        }
    } else if (e.target.classList.contains('cancelBtn')) {
        e.target.previousElementSibling.previousElementSibling.value = '';
        // newNote.parentNode.firstChild.textContent = '';
        creatingNote(false);
    }
});


const editNote = (selectedNote) => {
    const currentTxt = selectedNote.textContent;
    const selectedIndex = Array.prototype.indexOf.call(selectedNote.parentElement.children, selectedNote);

    newNote.children[1].setAttribute('edit', selectedIndex);
    creatingNote(true);
    newNote.firstChild.value = currentTxt;
}

allNotes.addEventListener('click', (e) => {
    if (e.target.alt === 'edit') {
        const selectedNote = e.target.parentElement;
        editNote(selectedNote);
    } else if (e.target.alt === 'delete') {
        e.target.parentElement.remove();
        updateNotes();
    }
});


const main = () => {
    addAllDiv();
    creatingNote(false);
    getNotes();
}
main();
