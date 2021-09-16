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
            document.getElementById(this.parentBook.id).remove();
            try{
                const docRef = firebase.firestore().collection(firebase.auth().currentUser.uid);
                docRef.doc(this.parentBook.title).delete();
            } catch(err) {
                console.log("No book found with given information in the database!");
            }
        });
        
    }


}