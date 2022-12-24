import { getRandomTripPoint } from '../mock/trip-point';
import { POINTS_COUNT } from '../const';
import { offersByType, destinations } from '../mock/trip-point';

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomTripPoint);
  #offers = offersByType;
  #destinations = destinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }
}
