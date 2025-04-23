import { generateID } from '../utils.js';

export default class BookModel {
    #books = [];
    #observers = [];

    constructor(books) {
        this.#books = books;
    }

    get books() {
        return this.#books;
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    _notifyObservers() {
        this.#observers.forEach(observer => observer());
    }

    addBook(bookData) {
        const newBook = { id: generateID(), ...bookData };
        this.#books.push(newBook);
        this._notifyObservers();
        return newBook;
    }

    removeBook(id) {
        this.#books = this.#books.filter(book => book.id !== id);
        this._notifyObservers();
    }

    updateBook(id, updatedData) {
        const index = this.#books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.#books[index] = { ...this.#books[index], ...updatedData };
            this._notifyObservers();
        }
    }
}
