import AbstractView from '../framework/view/abstract-view';

const createTripInfoTemplate = (totalSum, routeTitle, routeDates) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${routeTitle}</h1>

      <p class="trip-info__dates">${routeDates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
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

