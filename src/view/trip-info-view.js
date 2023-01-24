import AbstractView from '../framework/view/abstract-view';
import he from 'he';

const createTripInfoTemplate = (totalSum, routeTitle, routeDates) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${he.encode(routeTitle)}</h1>

      <p class="trip-info__dates">${he.encode(routeDates)}</p>
    </div>

    <p class="trip-info__cost">
      Total: <span class="trip-info__cost-value">${he.encode(String(totalSum))}</span>
    </p>
  </section>`
);

export default class TripInfoView extends AbstractView {
  #totalSum = null;
  #routeTitle = null;
  #routeDates = null;
  constructor({ totalSum, routeTitle, routeDates }) {
    super();
    this.#totalSum = totalSum;
    this.#routeTitle = routeTitle;
    this.#routeDates = routeDates;
  }

  get template() {
    return createTripInfoTemplate(this.#totalSum, this.#routeTitle, this.#routeDates);
  }
}

