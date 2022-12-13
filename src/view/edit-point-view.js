import {createElement} from '../render.js';
import {formatTripDayEditForm, formatTripTime, getOffersByType, getDescriptionByDestinationId} from '../utils';
import {TYPES} from '../const';

const NEW_TRIP_POINT = {
  'id': 1,
  'type': '',
  'destination': '',
  'isFavorite': false,
  'price': '',
  'dateFrom': '2019-05-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'offers': [],
};

const createEditPointTemplate = (point, offersByPointType, destinationsByPointType) => {
  const { dateFrom, dateTo, type, price, offers: pointOffers} = point;
  const tripDateFrom = formatTripDayEditForm(dateFrom);
  const tripDateTo = formatTripDayEditForm(dateTo);
  const tripTimeFrom = formatTripTime(dateFrom);
  const tripTimeTo = formatTripTime(dateTo);
  const { offers } = getOffersByType(offersByPointType, point);
  const { description, name } = getDescriptionByDestinationId(destinationsByPointType, point);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${TYPES.map((offerType) => `<div class="event__type-item">
                <input id="event-type-${offerType}-1"
                       class="event__type-input  visually-hidden"
                       type="radio"
                       name="event-type"
                       value="taxi">
                <label class="event__type-label  event__type-label--${offerType}" for="event-type-taxi-1">${offerType}</label>
              </div>`).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1"> ${type}</label>
          <input class="event__input  event__input--destination"
                 id="event-destination-1"
                 type="text"
                 name="event-destination"
                 value="${name}"
                 list="destination-list-1">
          <datalist id="destination-list-1">
            <option value=${name}></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time"
                 id="event-start-time-1"
                 type="text"
                 name="event-start-time"
                 value="${tripDateFrom} ${tripTimeFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time"
                 id="event-end-time-1"
                 type="text"
                 name="event-end-time"
                 value="${tripDateTo} ${tripTimeTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${offers.map(({ title: availableOfferTitle, price: availableOfferPrice, id }) => {
        const checkedOffer = pointOffers.includes(id) ? 'checked' : '';
        return (
          `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" ${checkedOffer}>
            <label class="event__offer-label" for="event-offer-luggage-${id}">
              <span class="event__offer-title">${availableOfferTitle}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${availableOfferPrice}</span>
            </label>
          </div>`);}).join('')}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

       <!-- <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
          </div>
      </div>-->
      </section>
      </section>
    </form>
    </li>`
  );
};

export default class EditPointView {
  constructor({point = NEW_TRIP_POINT, offersByPointType, destinationsByPointType}) {
    this.point = point;
    this.offersByPointType = offersByPointType;
    this.destinationsByPointType = destinationsByPointType;
  }

  getTemplate() {
    return createEditPointTemplate(this.point, this.offersByPointType, this.destinationsByPointType);
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
