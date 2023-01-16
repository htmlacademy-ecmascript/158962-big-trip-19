import AbstractView from '../framework/view/abstract-view.js';
import { calculateTotalPrice } from '../utils/point';

const createTripInfoTemplate = (points) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(points)}</span>
    </p>
  </section>`
);

export default class TripInfoView extends AbstractView {
  #points = null;
  constructor({ points }) {
    super();
    this.#points = points;
  }
  get template() {
    console.log(this.#points)
    return createTripInfoTemplate(this.#points);
  }
}

