import { render, RenderPosition } from '../framework/render.js';
import BookFilterComponent from '../view/book-filter-component.js';

export default class FilterPresenter {
    constructor(container, bookModel, listPresenter) {
        this._container = container;
        this._bookModel = bookModel;
        this._listPresenter = listPresenter;
        this._component = null;
    }

    init() {
        const genres = ['Художественная','Научная','Фантастика','Биография'];
        this._component = new BookFilterComponent(genres);
        render(this._component, this._container, RenderPosition.BEFOREEND);
        this._component.setFilterChangeHandler(genre => this._listPresenter.setFilter(genre));
    }
}
