import AbstractView from '../framework/view/abstract-view.js';
import { filterType } from '../const';

const filterTypeValues = Object.entries(filterType);

const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${filterTypeValues.map(([name, attr]) => (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${attr}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  )).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);


export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
