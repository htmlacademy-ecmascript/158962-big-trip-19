import EditPointView from '../view/edit-point-view';
import TripEventList from '../view/trip-event-list';
import TripItemView from '../view/trip-item-view';
import EmptyPointView from '../view/empty-point-view';
import { isEscEvent } from '../utils';
import { render } from '../framework/render.js';
import dayjs from 'dayjs';

export default class TripPointsPresenter {
  #eventContainer = null;
  #pointsModel = null;
  #offers = null;
  #destinations = null;
  #tripPoints = [];

  #tripList = new TripEventList();

  constructor({eventContainer, pointsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    if (this.#tripPoints.length === 0) {
      return render(new EmptyPointView(), this.#eventContainer);
    }

    render(this.#tripList, this.#eventContainer);
    const sortedTripPointsByDate = this.#tripPoints.sort((a, b) => (dayjs(a.dateFrom).isAfter(dayjs(b.dateFrom)) ? 1 : -1));
    sortedTripPointsByDate.forEach((tripPoint) => this.#renderTripPoint(tripPoint, this.#offers, this.#destinations));
  }

  #renderTripPoint(point, offers, destinations) {
    const escKeyDownHandler = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new TripItemView({
      point,
      offers,
      destinations,
      onClick: () => {
        replacePointToEditForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditForm = new EditPointView({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onClick: () => {
        replaceEditFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEditForm() {
      this.#tripList.element.replaceChild(pointEditForm.element, pointComponent.element);
      // здесь тоже почему то подчеркивается this.#tripList - potentially invalid reference access
    }

    function replaceEditFormToPoint() {
      this.#tripList.element.replaceChild(pointComponent.element, pointEditForm.element);
    }

    render(pointComponent, this.#tripList.element);
  }
}
