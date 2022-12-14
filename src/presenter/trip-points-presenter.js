import EditPointView from '../view/edit-point-view';
import TripEventList from '../view/trip-event-list';
import TripItemView from '../view/trip-item-view';
import {render} from '../render.js';

export default class TripPointsPresenter {
  tripList = new TripEventList();

  constructor({eventContainer, pointsModel}) {
    this.eventContainer = eventContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];
    this.offers = this.pointsModel.getOffers();
    this.destinations = this.pointsModel.getDestinations();
    const editPoint = new EditPointView({
      point: this.tripPoints[0],
      offers: this.offers,
      destinations:this.destinations,
    });

    render(this.tripList, this.eventContainer);
    render(editPoint, this.tripList.getElement());

    this.tripPoints.forEach((tripPoint) => render(new TripItemView({
      point: tripPoint,
      offers: this.offers,
      destinations:this.destinations,
    }), this.tripList.getElement()));
  }
}
