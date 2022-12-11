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
    this.offersByPointType = [...this.pointsModel.getOffersByPointType()];
    const editPoint = new EditPointView({point: this.tripPoints[0], offersByPointType: this.offersByPointType});
    render(this.tripList, this.eventContainer);
    render(editPoint, this.tripList.getElement());

    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new TripItemView({point: this.tripPoints[i], offersByPointType: this.offersByPointType}), this.tripList.getElement());
    }
  }
}
