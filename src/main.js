import BookModel from './model/book-model.js';
import { initialBooks } from './mock/books.js';
import BookFormPresenter from './presenter/book-form-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BookListPresenter from './presenter/book-list-presenter.js';

const container = document.querySelector('.container');

const bookModel = new BookModel(initialBooks);
const bookListPresenter = new BookListPresenter(container, bookModel);
const bookFormPresenter = new BookFormPresenter(container, bookModel);
const filterPresenter = new FilterPresenter(container, bookModel, bookListPresenter);

bookFormPresenter.init();
filterPresenter.init();
bookListPresenter.init();
