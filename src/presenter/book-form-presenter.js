import { render, RenderPosition } from '../framework/render.js';
import BookFormComponent from '../view/book-form-component.js';

export default class BookFormPresenter {
    constructor(container, bookModel) {
        this._container = container;
        this._bookModel = bookModel;
        this._component = new BookFormComponent();
    }

    init() {
        render(this._component, this._container, RenderPosition.BEFOREEND);
        this._component.setSubmitHandler(evt => {
            evt.preventDefault();
            this._bookModel.addBook(this._component.getData());
        });
    }
}
