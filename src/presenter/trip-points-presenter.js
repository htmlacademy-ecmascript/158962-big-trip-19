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
    this.offersByPointType = this.pointsModel.getOffersByPointType();
    this.destinationsByPointType = this.pointsModel.getDestinations();
    const editPoint = new EditPointView({
      point: this.tripPoints[0],
      offersByPointType: this.offersByPointType,
      destinationsByPointType:this.destinationsByPointType,
    });

    render(this.tripList, this.eventContainer);
    render(editPoint, this.tripList.getElement());

    this.tripPoints.forEach((tripPoint) => render(new TripItemView({
      point: tripPoint,
      offersByPointType: this.offersByPointType,
      destinationsByPointType:this.destinationsByPointType,
    }), this.tripList.getElement()));
  }
}
