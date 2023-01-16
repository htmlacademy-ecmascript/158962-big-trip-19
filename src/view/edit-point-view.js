import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatFormDate, getOffersByType, getDescriptionByDestinationId } from '../utils/point.js';
import { capitalizeFirstLetter } from '../utils/common';
import { TYPES } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import he from 'he';

const NEW_TRIP_POINT = {
  id: nanoid(),
  type: TYPES[0],
  destination: null,
  isFavorite: false,
  price: '',
  dateFrom: dayjs().toString(),
  dateTo: dayjs().toString(),
  offers: [],
};

const createOffersTemplate = (offers, pointOffers, pointId) => {
  if (!offers?.length) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${offers.map(({ title: availableOfferTitle, price: availableOfferPrice, id: offerId }) => {
      const checkedOffer = pointOffers.includes(offerId) ? 'checked' : '';

      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"
               id="event-offer-${pointId}-${offerId}"
               type="checkbox"
               data-offer-id="${offerId}"
               name="event-offer-${pointId}" ${checkedOffer}>
          <label class="event__offer-label" for="event-offer-${pointId}-${offerId}">
            <span class="event__offer-title">${availableOfferTitle}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${availableOfferPrice}</span>
          </label>
        </div>`);
    }).join('')}
       </div>
      </section>`
  );
};

const createDestinationTemplate = (pointDestinations, description, pictures, name) => {
  if (!pointDestinations?.length || !description) {
    return '';
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures?.map(({ src }) => `<img class="event__photo" src="${src}.jpg" alt="Photo of ${name}">`).join('')}
        </div>
      </div>
    </section>
  `);
};

const createDestinationOptionsTemplate = (options) => {
  if (!options?.length) {
    return '';
  }

  return options.map((option) => `<option value=${option.name}></option>`).join('');
};

const createEventTypeListTemplate = (types, currentType, pointId) => types.map((type) => {
  const checked = type === currentType ? 'checked' : '';
  const eventType = capitalizeFirstLetter(type);

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${pointId}"
             class="event__type-input  visually-hidden"
             type="radio"
             name="event-type"
             data-event-type="true"
             value="${type}"
             ${checked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${pointId}">${eventType}</label>
    </div>`);
}).join('');

const createEditPointTemplate = (point, offers, pointDestinations, isPointEdit) => {
  const {id, dateFrom, dateTo, type, price, offers: pointOffers} = point;
  const resetButtonText = isPointEdit ? 'Delete' : 'Cancel';
  const editPointElementClass = isPointEdit ? 'event--edit-form' : 'event--edit-new';
  const tripDateFrom = formatFormDate(dateFrom);
  const tripDateTo = formatFormDate(dateTo);
  const offersByType = getOffersByType(offers, point)?. offers;
  const destination = getDescriptionByDestinationId(pointDestinations, point);
  const offersTemplate = createOffersTemplate(offersByType, pointOffers, id);
  const destinationsTemplate = createDestinationTemplate(pointDestinations, destination?.description, destination?.pictures, destination?.name);

  const createCloseFormButton = () => {
    if (isPointEdit) {
      return (
        `<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
      );
    }
    return (
      `<button class="event__rollup-btn event__rollup-btn--point-new" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`
    );
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit ${editPointElementClass}" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon"
                 width="17"
                 height="17"
                 src="img/icons/${type}.png"
                 alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden"
                 id="event-type-toggle-1"
                 type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventTypeListTemplate(TYPES, type, id)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1"> ${type}</label>
          <input class="event__input  event__input--destination"
                 id="event-destination-1"
                 type="text"
                 name="event-destination"
                 value="${he.encode(destination?.name || '')}"

                 list="destination-list-1">
          <datalist id="destination-list-1">
           ${createDestinationOptionsTemplate(pointDestinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time"
                 id="event-start-time-1"
                 type="text"
                 name="event-start-time"
                 value="${tripDateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time"
                 id="event-end-time-1"
                 type="text"
                 name="event-end-time"
                 value="${tripDateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price"
                 id="event-price-1"
                 type="number"
                 min="0"
                 step="1"
                 name="event-price"
                 value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue"
                type="submit">Save</button>
        <button class="event__reset-btn"
                type="reset">${resetButtonText}</button>
        <!--<button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>-->
        ${createCloseFormButton()}
      </header>
      <section class="event__details">
        ${offersTemplate}
        ${destinationsTemplate}
      </section>
    </form>
    </li>`
  );
};

export default class EditPointView extends AbstractStatefulView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleEditFormSubmit = null;
  #onClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #isPointEdit = null;
  #handleEditPointNewSubmit = null;

  constructor({ point = NEW_TRIP_POINT, offers, destinations, onFormSubmit, onFormNewPointSubmit, onClick, onDeleteClick, isPointEdit }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleEditFormSubmit = onFormSubmit;
    this.#handleEditPointNewSubmit = onFormNewPointSubmit;
    this.#onClick = onClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#isPointEdit = isPointEdit;
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations, this.#isPointEdit);
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form.event--edit.event--edit-new')?.addEventListener('submit', this.#formNewSubmitHandler);
    this.element.querySelector('form.event--edit.event--edit-form')?.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onClick);
    this.element.querySelector('.event__rollup-btn--point-new')?.addEventListener('click', this.#handleDeleteClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#descriptionInputHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.#setDatepickerForDateFrom();
    this.#setDatepickerForDateTo();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditFormSubmit?.(EditPointView.parseStateToPoint(this._state));
  };

  #formNewSubmitHandler = (evt) => {
    evt.preventDefault();
    if (this._state.destination === null || this._state.price === '') {
      return;
    }
    this.#handleEditPointNewSubmit?.(EditPointView.parseStateToPoint(this._state));
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.dataset.eventType) {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #priceChangeHandler = (evt) => {
    this.updateElement({
      price: evt.target.value,
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.dataset.offerId) {
      const currentOfferId = Number(evt.target.dataset.offerId);
      const index = this._state.offers.indexOf(currentOfferId);

      if (index === -1) {
        this._setState(this._state.offers.push(currentOfferId));

        return;
      }

      this._setState(this._state.offers.splice(index, 1));
    }
  };

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    const cities = this.#destinations.map((destination) => destination.name);

    if (!evt.target.value || evt.target.value === '' || cities.indexOf(evt.target.value) === -1) {
      return;
    }

    const selectedDestination = this.#destinations.find((destination) => evt.target.value === destination.name);

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerForDateFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        //minDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        time24hr: true
      },
    );
  }

  #setDatepickerForDateTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        time24hr: true
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick?.(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => ({ ...state });
}
