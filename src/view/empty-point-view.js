import AbstractView from '../framework/view/abstract-view.js';
import { TEXTS_FOR_EMPTY_SHEET } from '../const';

const createNoPointTemplate = (filterType) => {
  const noPointsTextValue = TEXTS_FOR_EMPTY_SHEET[filterType];
  return (`<p class="trip-events__msg">${noPointsTextValue}</p>`);
};

export default class EmptyPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
