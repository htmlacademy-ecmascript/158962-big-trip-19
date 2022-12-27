import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const';

const filterTypeValues = Object.values(FilterType);

const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${filterTypeValues.map((filterValue) => {
    const checked = filterValue === 'past' ? 'checked' : '';
    return`<div class="trip-filters__filter">
      <input id="filter-${filterValue}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterValue}" ${checked}>
      <label class="trip-filters__filter-label" for="filter-${filterValue}">${filterValue}</label>
    </div>`;}).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
