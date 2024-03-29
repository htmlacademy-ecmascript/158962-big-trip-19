import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createNewSortListTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map(({ value, state }) => (
    `<div class="trip-sort__item  trip-sort__item--${value}">
      <input id="sort-${value}"
             class="trip-sort__input  visually-hidden"
             type="radio"
             name="trip-sort"
             ${currentSortType === value ? 'checked' : ''}
             data-sort-type="${value}"
             value="sort-${value}" ${state}>
      <label class="trip-sort__btn" for="sort-${value}">${value}</label>
    </div>`)).join('')}
  </form>`
);


export default class SortListView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createNewSortListTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }

    this.#handleSortTypeChange?.(evt.target.dataset.sortType);
  };
}
