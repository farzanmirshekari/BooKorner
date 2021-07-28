import Book from "./book.js";

export default class AddBookModal {
    constructor(main) {
        this.main = main;
        this.modal = new bootstrap.Modal(
            document.querySelector("#addBookModal"));
    }

    getInputFields() {
        return [
            document.querySelector("#inputBookTitle"),
            document.querySelector("#inputBookAuthor"),
            document.querySelector("#inputBookPages"),
        ];
    }

    resetForm() {
        const inputs = this.getInputFields();
        for(let i = 0; i<inputs.length; i++) {
            inputs[i].value = "";
            inputs[i].classList.remove("is-invalid");
        }
        document.querySelector("#inputBookReadStatus").checked = false;
    }

    setUpCancelButton() {
        this.cancelButton = document.querySelector("#addBookModalCancelButton");
        this.cancelButton.addEventListener("click" , () => {
            this.resetForm();
        });
    }

    isInputValid() {
        const inputs = this.getInputFields();
        let isValid = true;
        for(let i = 0; i < inputs.length; i++) {
            if(inputs[i].value == "") {
                isValid = false;
            }
        }
        return isValid;
    }

    createBookObject() {
        return new Book(
            this.main,
            document.querySelector('#inputBookTitle').value,
            document.querySelector('#inputBookAuthor').value,
            document.querySelector('#inputBookPages').value,
            document.querySelector('#inputBookReadStatus').checked,
        );
    }

    saveBook() {
        const newBook = this.createBookObject(); 
        newBook.display();
        this.main.library.addBook(newBook);
    }

    invalidateForm() {
        const inputs = this.getInputFields();
        for(let i = 0; i < inputs.length; i++) {
            if(inputs[i].value == "") {
                inputs[i].classList.add("is-invalid");
            } else {
                inputs[i].classList.remove("is-invalid");
            }
        }    
    }

    setUpSaveButton() {
        const saveButton = document.querySelector("#addBookModalSaveButton");
        saveButton.addEventListener("click" , () => {
            if(this.isInputValid()) {
                this.saveBook();
                this.modal.hide();
                this.resetForm();
            } else {
                this.invalidateForm();
            }
        });
    }

    setUpAddBookCard() {
        const addBookCardBody = document.querySelector("#addBookButton");
        addBookCardBody.addEventListener("click" , () => {
            this.modal.show();
        });
    }

    setUp() {
        this.setUpCancelButton();
        this.setUpSaveButton();
        this.setUpAddBookCard();
    }
}