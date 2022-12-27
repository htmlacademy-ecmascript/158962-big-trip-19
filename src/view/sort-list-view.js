import AbstractView from '../framework/view/abstract-view.js';
import { SortList } from '../const.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const createNewSortListTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SortList.map((name) => {
    const checked = capitalizeFirstLetter(name) === 'Price' ? 'checked' : '';
    const disabled = capitalizeFirstLetter(name) === 'Event' || capitalizeFirstLetter(name) === 'Offers' ? 'disabled' : '';
    return`<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${checked} ${disabled}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`;}).join('')}
  </form>`
);

export default class SortListView extends AbstractView {
  get template() {
    return createNewSortListTemplate();
  }
}
