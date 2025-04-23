import { render, RenderPosition } from '../framework/render.js';
import BookListComponent from '../view/book-list-component.js';
import BookItemComponent from '../view/book-item-component.js';
import BookEditComponent from '../view/book-edit-component.js';

const GENRES = ['Художественная', 'Научная', 'Фантастика', 'Биография'];

export default class BookListPresenter {
    constructor(container, bookModel) {
        this._container = container;
        this._bookModel = bookModel;
        this._listComponent = new BookListComponent();
        this._currentFilter = 'all';
        this._bookModel.addObserver(this._onModelChange.bind(this));
    }

    init() {
        render(this._listComponent, this._container, RenderPosition.BEFOREEND);
        this._renderBooks();
    }

    setFilter(filter) {
        this._currentFilter = filter;
        this._renderBooks();
    }

    _getFilteredBooks() {
        if (this._currentFilter === 'all') {
            return this._bookModel.books;
        }
        return this._bookModel.books.filter(book => book.genre === this._currentFilter);
    }

    _onModelChange() {
        this._renderBooks();
    }

    _renderBooks() {
        const listEl = this._listComponent.getListElement();
        listEl.innerHTML = '';
        this._getFilteredBooks().forEach(book => {
            const item = new BookItemComponent(book);
            render(item, listEl, RenderPosition.BEFOREEND);
            item.setDeleteHandler(() => this._bookModel.removeBook(book.id));

            item.setEditHandler(() => {
                // Replace item with edit form
                const editComponent = new BookEditComponent(book, GENRES);
                const editEl = editComponent.element;
                listEl.replaceChild(editEl, item.element);

                editComponent.setSaveHandler(() => {
                    const updatedData = editComponent.getData();
                    this._bookModel.updateBook(book.id, updatedData);
                });

                editComponent.setCancelHandler(() => {
                    this._renderBooks();
                });
            });
        });
    }
}
