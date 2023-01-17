import { render, replace, remove } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view';
import { UserAction, UpdateType } from '../const.js';

const tripInfoContainer = document.querySelector('.trip-main');

export default class TripRoute {
  #tripRoutComponent = null;

  constructor() {
  }

  init() {
    const prevTripRoutComponent = this.#tripRoutComponent;
    this.#tripRoutComponent = new TripInfoView();

    if (prevTripRoutComponent === null) {
      render(this.#tripRoutComponent, tripInfoContainer);
      return;
    }

    remove(prevTripRoutComponent)
  }
}
