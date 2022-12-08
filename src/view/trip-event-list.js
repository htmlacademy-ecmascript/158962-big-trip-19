import {createElement} from '../render.js';

const createTripEventList = () => '<ul class="trip-events__list"></ul>';

export default class TripEventList {
  getTemplate() {
    return createTripEventList();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
