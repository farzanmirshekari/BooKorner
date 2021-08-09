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

    isInputValid() {
        const ISBNInputValue = document.querySelector("#inputBookISBN").value;
        let isValid = false;
        if(ISBNInputValue.length == 13 || ISBNInputValue.length == 10) {
            isValid = true;
        }
        return isValid;
    }

    saveBook() {
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
    }

    invalidateForm() {
        const input = document.getElementById("inputBookISPN");
        if(input == "" || input.length != 10 || input.length != 13) {
            inputs[i].classList.add("is-invalid");
         } else {
            inputs[i].classList.remove("is-invalid");
         }
    }    

    setUpSaveButton() {
        const saveButton = document.querySelector("#addBookModalSaveButton");
        saveButton.addEventListener("click" , () => {
            if(this.isInputValid()) {
                this.saveBook();
                this.modal.hide();
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