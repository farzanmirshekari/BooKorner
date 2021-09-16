import AddBookModal from "./objects/addBookModal.js";
import Library from "./objects/library.js";

class Main {
    constructor() {
        this.addBookModal = new AddBookModal(this);
        this.library = new Library(this);
        this.localLibrary = this.getLocalStorage();
        document.getElementById("addBookModalSaveButtonCloud").style.display = "none";
        document.getElementById("loadBooksFromCloud").style.display = "none";
    }

    getLocalStorage() {
        if(!localStorage.getItem("bookornerLibrary")) {
            localStorage.setItem("bookornerLibrary", JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem("bookornerLibrary"));
    }

    saveLocalStorage() {
        localStorage.setItem("bookornerLibrary", JSON.stringify(this.localLibrary));
    }

    setUp() {
        this.addBookModal.setUp();
        this.library.display();
    }
    
}

const main = new Main;
main.setUp();