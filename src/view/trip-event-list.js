import AbstractView from '../framework/view/abstract-view.js';

const createTripEventList = () => '<ul class="trip-events__list"></ul>';

export default class TripEventList extends AbstractView {
  get template() {
    return createTripEventList();
  }
}
