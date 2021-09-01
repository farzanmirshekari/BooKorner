import bookButton from './bookButton.js';

export default class BookDeleteButton extends bookButton {
    constructor(main, parentBook) {
        super(main, parentBook);
        this.button.innerHTML = 'Delete';
        this.button.classList.add('btn-outline-danger');
        this.setUp();
    }

    setUp() {
        this.button.addEventListener('click', () => {
            this.main.library.removeBook(this.parentBook);
            document.getElementById(this.parentBook.id).remove()
        });
    }
}