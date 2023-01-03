import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createNewSortListTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map(({ value, state }) => (
    `<div class="trip-sort__item  trip-sort__item--${value}">
      <input id="sort-${value}"
             class="trip-sort__input  visually-hidden"
             type="radio"
             name="trip-sort"
             data-sort-type="${value}"
             value="sort-${value}" ${state}>
      <label class="trip-sort__btn" for="sort-${value}">${value}</label>
    </div>`)).join('')}
  </form>`
);


export default class SortListView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createNewSortListTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.hasAttribute('data-sort-type')) {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
