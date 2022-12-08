import EditPointView from '../view/edit-point-view';
import TripEventList from '../view/trip-event-list';
import TripItemView from '../view/trip-item-view';
import {render} from '../render.js';

export default class RenderTripPointsPresenter {
  tripList = new TripEventList();
  editPoint = new EditPointView();

  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
  }

  init() {
    render(this.tripList, this.eventContainer);
    render(this.editPoint, this.tripList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripItemView(), this.tripList.getElement());
    }
  }
}
