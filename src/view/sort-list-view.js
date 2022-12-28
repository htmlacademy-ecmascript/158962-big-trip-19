import AbstractView from '../framework/view/abstract-view.js';
import { sortList } from '../const.js';

const sortListEntries = Object.entries(sortList);

const createNewSortListTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortListEntries.map(([name, attr]) => (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${attr}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`
  )).join('')}
  </form>`
);


export default class SortListView extends AbstractView {
  get template() {
    return createNewSortListTemplate();
  }
}
