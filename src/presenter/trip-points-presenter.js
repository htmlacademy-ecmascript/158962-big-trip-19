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
    const editPoint = new EditPointView({
      point: this.#tripPoints[0],
      offers: this.#offers,
      destinations:this.#destinations,
    });

    render(this.#tripList, this.#eventContainer);
    render(editPoint, this.#tripList.element); //get element()

    this.#tripPoints.forEach((tripPoint) => render(new TripItemView({
      point: tripPoint,
      offers: this.#offers,
      destinations:this.#destinations,
    }), this.#tripList.element)); //get element()
  }
}


