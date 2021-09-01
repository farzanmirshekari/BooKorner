import bookButton from "./bookButton.js";

export default class BookReadButton extends bookButton {
    constructor(main, parentBook) {
        super(main, parentBook);
        this.button.innerHTML = "Read";
        this.setUp();
    }

    getParentBookCardFooter() {
        const parentBookContainer = document.getElementById(this.parentBook.id);
        return parentBookContainer.querySelector(".card-footer");
    }

    getLocalParentBookIndex() {
        return this.main.localLibrary.findIndex((book) => {
            return JSON.parse(book).id == this.parentBook.id;
        });
    }

    toggleParentBookStatusInLocalStorage() {
        let localParentBookIndex = this.getLocalParentBookIndex();
        this.main.localLibrary[localParentBookIndex] = JSON.stringify({
            "title": this.parentBook.title,
            "author": this.parentBook.author,
            "pages": this.parentBook.pages,
            "read": !this.parentBook.read,
            "id": this.parentBook.id,
        });
        this.main.saveLocalStorage();
    }

    toogleParentBookStatus() {
        this.parentBook.read = !this.parentBook.read;
        let parentBookCardFooter = this.getParentBookCardFooter();
        parentBookCardFooter.innerHTML = "";
        parentBookCardFooter.appendChild(this.parentBook.getReadStatus());
    }

    setStyle() {
        if (this.parentBook.read) {
            this.button.classList.add('btn-success');
            this.button.classList.remove('btn-outline-success');
        } else {
            this.button.classList.add('btn-outline-success');
            this.button.classList.remove('btn-success');
        }
    }

    setUp() {
        this.setStyle();
        this.button.addEventListener("click" , () => {
            this.toggleParentBookStatusInLocalStorage();
            this.toogleParentBookStatus();
            this.setStyle();
        });
    }
}