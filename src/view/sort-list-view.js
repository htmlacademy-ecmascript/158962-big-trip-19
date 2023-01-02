import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const sortListEntries = Object.entries(SortType);

const createNewSortListTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortListEntries.map(([name, value]) => {
    const disabled = value === 'disabled' ? value : '';
    return (
      `<div class="trip-sort__item  trip-sort__item--${name.toLowerCase()}">
        <input id="sort-${name.toLowerCase()}"
               class="trip-sort__input  visually-hidden"
               type="radio"
               name="trip-sort"
               data-sort-type="${value}"
               value="sort-${name.toLowerCase()}" ${disabled}>
        <label class="trip-sort__btn" for="sort-${name.toLowerCase()}">${name.toLowerCase()}</label>
    </div>`);
  }).join('')}
  </form>`
);


export default class SortListView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createNewSortListTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
