import EditPointView from '../view/edit-point-view';
import TripEventList from '../view/trip-event-list';
import TripItemView from '../view/trip-item-view';
import EmptyPointView from '../view/empty-point-view';
import {isEscEvent} from '../utils';
import {render} from '../render.js';

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
      render(new EmptyPointView(), this.#eventContainer);
    } else {
      render(this.#tripList, this.#eventContainer);
      this.#tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint, this.#offers, this.#destinations));
    }
  }

  #renderTripPoint(point, offers, destinations) {
    const pointComponent = new TripItemView({ point, offers, destinations });
    const pointEditForm = new EditPointView({ point, offers, destinations });

    const replacePointToEditForm = () => {
      this.#tripList.element.replaceChild(pointEditForm.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#tripList.element.replaceChild(pointComponent.element, pointEditForm.element);
    };

    const escKeyDownHandler = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelectorAll('.event__rollup-btn').forEach((element) => {
      element.addEventListener('click', () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      });
    });

    pointEditForm.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditForm.element.querySelector('form.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#tripList.element);
  }
}


