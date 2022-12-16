import EditPointView from '../view/edit-point-view';
import TripEventList from '../view/trip-event-list';
import TripItemView from '../view/trip-item-view';
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
    this.#tripPoints = [...this.#pointsModel.points]; // get points()
    this.#offers = this.#pointsModel.offers; // get offers()
    this.#destinations = this.#pointsModel.destinations; // get destination()

    render(this.#tripList, this.#eventContainer); // отрисовка ul в контейнер

    this.#tripPoints.forEach((tripPoint) => this.#renderTripPoints(tripPoint, this.#offers, this.#destinations)); //get element()
  }

  #renderTripPoints(point, offers, destinations) {
    const pointComponent = new TripItemView({ point, offers, destinations });
    const pointEditForm = new EditPointView({ point, offers, destinations });

    const replacePointToEditForm = () => {
      this.#tripList.element.replaceChild(pointEditForm.element, pointComponent.element);
    };

    const replaceEditFormToPoint = () => {
      this.#tripList.element.replaceChild(pointComponent.element, pointEditForm.element);
    };

    pointComponent.element.querySelectorAll('.event__rollup-btn').forEach((element) => {
      element.addEventListener('click', () => {
        replacePointToEditForm();
      });
    });

    pointEditForm.element.querySelector('form.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditFormToPoint();
    });

    render(pointComponent, this.#tripList.element);
  }
}


