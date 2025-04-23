import AbstractComponent from './view/abstract-component.js';

const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
};

function createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
    if (component instanceof AbstractComponent) {
        container.insertAdjacentElement(place, component.element);
    } else {
        throw new Error('Can render only components');
    }
}

export { RenderPosition, createElement, render };
