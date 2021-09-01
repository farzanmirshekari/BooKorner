export default class BookButton {
    constructor(main, parentBook) {
        this.main = main;
        this.parentBook = parentBook;
        this.button = this.create();
    }

    create() {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-sm", "me-2");
        return button;
    }
}