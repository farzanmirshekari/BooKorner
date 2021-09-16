import Book from "./book.js";

export default class AddBookModal {
    constructor(main) {
        let bookCount = 0;
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

    createBookObject() {
        return new Book(
            this.main,
            document.querySelector('#inputBookTitle').value,
            document.querySelector('#inputBookAuthor').value,
            document.querySelector('#inputBookPages').value,
            document.querySelector('#inputBookReadStatus').checked,
        );
    }

    getDatafromISBN() {
        const checkISBN = document.getElementById("checkISBN");
        checkISBN.addEventListener("click", () => {
            console.log("clicked");
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
                    document.getElementById("inputBookTitle").value = finalInfo[0];
                    document.getElementById("inputBookAuthor").value = finalInfo[1];
                    document.getElementById("inputBookPages").value = finalInfo[2];
                    document.querySelector("#inputBookISBN").value = "";
                }).catch(e => {
                    console.log("Error!");
                })
            }
        }) 
    }

    saveBook() {
        const newBook = this.createBookObject(); 
        newBook.display();
        this.main.library.addBook(newBook);
        this.resetForm();   
    }

    setUpLocalSaveButton() {
        const saveButton = document.querySelector("#addBookModalSaveButtonLocal");
        saveButton.addEventListener("click" , () => {
                this.saveBook();
                this.modal.hide();
        });
    }

    setUpCloudSaveButton() {
        const cloudSaveButton = document.querySelector("#addBookModalSaveButtonCloud");
        cloudSaveButton.addEventListener("click", () => {
            this.saveBookToCloud();
            this.modal.hide();
        })
    }

    saveBookToCloud() {
        try {
            const newBook = this.createBookObject();
            const cloudBook = {
                title: newBook.title,
                author: newBook.author,
                pages: newBook.pages,
                read: newBook.read,
                id: newBook.id
            }
            firebase.firestore().collection(firebase.auth().currentUser.uid).doc(newBook.title).set(cloudBook)
                .then(args => {
                    document.querySelector("#emptyLibraryText").style.display = "none";
                    newBook.display();
                    console.log("SUCCESS");
                })
            
        }
        catch(error) {
            alert("You must sign in to Google before attempting to save to cloud!");
            console.log(error);
        }
        this.resetForm();
    }


    setUpAddBookCard() {
        const addBookCardBody = document.querySelector("#addBookButton");
        addBookCardBody.addEventListener("click" , () => {
            this.modal.show();
        });
    }

    retrieveBooksFromCloud() {
        document.getElementById("loadBooksFromCloud").addEventListener("click", () => {
            firebase.firestore().collection(firebase.auth().currentUser.uid).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const newBook = new Book(
                            this.main,
                            doc.data().title,
                            doc.data().author,
                            doc.data().pages,
                            doc.data().read
                        )
                        document.querySelector("#emptyLibraryText").style.display = "none";
                        newBook.display();
                    })
                })
        })
    }

    setUpLogOutButton() {
        document.getElementById("logout").addEventListener("click", () => {
            document.getElementById("libraryCards").innerHTML = "";
        })
    }

    setUp() {
        this.setUpCancelButton();
        this.setUpLogOutButton();
        this.setUpLocalSaveButton();
        this.retrieveBooksFromCloud();
        this.setUpCloudSaveButton();
        this.setUpAddBookCard();
        this.getDatafromISBN();
    }
}