import Book from "./book.js";

export default class Library {
    constructor(main) {
        this.main =main;
        this.books = this.getBooksFromLocalStorage();
    }

    changeDisplayIfEmpty() {
        const emptyLibraryText = document.querySelector("#emptyLibraryText");
        if(this.books.length <= 0) {
            emptyLibraryText.hidden = false;
        } else {
            emptyLibraryText.hidden = true;
        }
    }

    addBookToLocalStorage(book) {
        const bookJsonString = JSON.stringify({
            "title": book.title,
            "author": book.author,
            "pages": book.pages,
            "read": book.read,
            "id": book.id,
        });
        this.main.localLibrary.push(bookJsonString);
        this.main.saveLocalStorage();
    }

    addBook(book) {
        this.addBookToLocalStorage(book);
        this.books.push(book);
        this.changeDisplayIfEmpty();
    } 

    removeBookFromLocalStorage(bookToDelete) {
        this.main.localLibrary = this.main.localLibrary.filter(
            function(book) {
                const bookObject = JSON.parse(book);
                return bookObject.id != bookToDelete.id;
            }
        );
        this.main.saveLocalStorage();
    }

    removeBook(bookToDelete) {
        this.removeBookFromLocalStorage(bookToDelete);
        this.books = this.books.filter(function(book) {
            return book.id != bookToDelete.id;
        });
        this.changeDisplayIfEmpty();
    }

    getBooksFromLocalStorage() {
        let books = [];
        const localLibrary = this.main.getLocalStorage();
        for(let i = 0; i < localLibrary.length; i++) {
            let book = JSON.parse(localLibrary[i]);
            book = new Book(this.main, book.title, book.author, book.pages, book.read, book.id);
            books.push(book);
        }
        return books;
    }

    display() {
        this.changeDisplayIfEmpty();
        for(let i = 0; i < this.books.length; i++) {
            this.books[i].display();
        }
    }
}