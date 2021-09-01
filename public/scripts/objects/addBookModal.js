import Book from "./book.js";

export default class AddBookModal {
    constructor(main) {
        this.main = main;
        this.modal = new bootstrap.Modal(
            document.querySelector("#addBookModal"));
    }

    setUpCancelButton() {
        this.cancelButton = document.querySelector("#addBookModalCancelButton");
        this.cancelButton.addEventListener("click" , () => {
            this.resetForm();
        });
    }

    getInputFields() {
        return [
            document.querySelector("#inputBookTitle"),
            document.querySelector("#inputBookAuthor"),
            document.querySelector("#inputBookPages"),
            document.querySelector("#inputBookISBN")
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

    isInputValid() {
        const inputs = this.getInputFields();
        let isValid = true;
        for(let i = 0; i < inputs.length; i++) {
            if(inputs[i].value == "") {
                isValid = false;
            }
        const ISBNInputValue = document.querySelector("#inputBookISBN").value;
        if(ISBNInputValue.length != 13 || ISBNInputValue.length != 10) {
            isValid = false;
        }
        return isValid;
        }
    }

    saveBook() {
        if(document.querySelector("#inputBookISBN").value !== "") {
            let results = [];
            const isbn = document.getElementById("inputBookISBN").value.toString();
            const url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
            fetch(url)
            .then(response => {
                return response.json();
            }).then(data => {
                results[0] = data.items[0].volumeInfo.title;
                results[1] = data.items[0].volumeInfo.authors[0];
                results[2] = Number(data.items[0].volumeInfo.pageCount);
                return results;
            }).then(finalInfo => {
                console.log(finalInfo);
                console.log(finalInfo[0]);
                console.log(finalInfo[1]);
                console.log(finalInfo[2]);
                return new Book(
                    this.main,
                    finalInfo[0],
                    finalInfo[1],
                    finalInfo[2],
                    document.querySelector('#inputBookReadStatus').checked,
                    );
                
            }).then(book => {
                console.log(book);
                book.display();
                this.main.library.addBook(book);
            }).catch(e => {
                console.log("Error!");
            })
            document.querySelector("#inputBookISBN").value = "";
        } else {
            const newBook = this.createBookObject(); 
            newBook.display();
            this.main.library.addBook(newBook);
        }
    }

    setUpSaveButton() {
        const saveButton = document.querySelector("#addBookModalSaveButton");
        saveButton.addEventListener("click" , () => {
                this.saveBook();
                this.modal.hide();
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