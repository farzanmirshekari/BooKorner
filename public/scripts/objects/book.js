import BookDeleteButton from "./bookDeleteButton.js";
import BookReadButton from "./bookReadButton.js";

export default class Book {
    constructor(main, title, author, pages, read, id) {
        this.main = main;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = this.getId(id);

        this.card = this.createBookCard();
        this.deleteButton = new BookDeleteButton(this.main, this);
        this.readButton = new BookReadButton(this.main, this);
    }

    getId(id) {
        if(id) {
            return id;
        } else {
            return Math.random().toString(36).substr(2,9);
        }
    }

    createBookCard() {
        const bookCardTemplate = document.querySelector("#bookCard");
        const newBookCard = bookCardTemplate.content;
        return document.importNode(newBookCard, true);
    }

    getReadStatus() {
        let newStatus = document.createElement("span");
        if(this.read) {
            newStatus.innerHTML = "Read";
        } else {
            newStatus.innerHTML = "Not Read";
            newStatus.classList.add("text-muted");
        }
        return newStatus;
    }

    fillBookCard() {
        this.card.querySelector("#bookTitle").innerHTML = (this.title);
        this.card.querySelector("#bookAuthor").innerHTML = (`by ${this.author}`);
        this.card.querySelector("#bookPages").innerHTML = (`${this.pages} Pages`);
        this.card.querySelector(".card-body").appendChild(this.readButton.button);
        this.card.querySelector(".card-body").appendChild(this.deleteButton.button);
        this.card.querySelector(".card-footer").appendChild(this.getReadStatus());
    }

    display() {
        const bookCardContainer = document.createElement("div");
        bookCardContainer.id = this.id;
        document.querySelector("#libraryCards").appendChild(bookCardContainer);
        this.fillBookCard();
        bookCardContainer.appendChild(this.card);
    }
}