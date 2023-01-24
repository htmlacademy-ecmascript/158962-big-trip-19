import AbstractView from '../framework/view/abstract-view.js';
import { formatTripDate, formatTripTime, getOffersByType, getDescriptionByDestinationId, calculateTripDuration } from '../utils/point.js';
import he from 'he';

const createOffersTemplate = (offers) => {
  if (!offers?.length) {
    return '';
  }

  return (`
  ${offers.map(({ title, price: offerPrice }) => `<li class="event__offer">
      <span class="event__offer-title">${he.encode(title)}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${he.encode(String(offerPrice))}</span>
   </li>`).join('')}
  `);
};

const createTripItemTemplate = (point, offers, destinations) => {
  const { dateFrom, dateTo, type, price, isFavorite, offers: pointOffers } = point;
  const activeFavoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const tripDate = formatTripDate(dateFrom, 'MMM D');
  const tripTimeTo = formatTripTime(dateTo, 'HH:mm');
  const tripTimeFrom = formatTripTime(dateFrom, 'HH:mm');
  const offersByType = getOffersByType(offers, point)?. offers;
  const offersForRender = offersByType?.filter(({ id }) => pointOffers.includes(id));
  const destination = getDescriptionByDestinationId(destinations, point);
  const offersTemplate = createOffersTemplate(offersForRender);
  const tripDuration = calculateTripDuration(point);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date"
              datetime="${he.encode(formatTripDate(dateFrom, 'YYYY-MM-DD'))}">${he.encode(tripDate)}</time>
        <div class="event__type">
          <img class="event__type-icon"
               width="42"
               height="42"
               src="img/icons/${he.encode(type)}.png"
               alt="Event ${he.encode(type)} icon">
        </div>
        <h3 class="event__title">${he.encode(type)} ${he.encode(destination?.name)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time"
                  datetime="${he.encode(tripTimeFrom)}">${he.encode(tripTimeFrom)}</time>
            &mdash;
            <time class="event__end-time"
                  datetime="${he.encode(tripTimeTo)}">${he.encode(tripTimeTo)}</time>
          </p>
          <p class="event__duration">${he.encode(tripDuration)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${he.encode(String(price))}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn ${activeFavoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon"
               width="28"
               height="28"
               viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688
            14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class TripItemView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleFavoriteClick = null;

  constructor({point, offers, destinations, onClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', onClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripItemTemplate(this.#point, this.#offers, this.#destinations);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick?.();
  };
}
