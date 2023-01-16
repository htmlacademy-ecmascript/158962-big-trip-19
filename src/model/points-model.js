import Observable from '../framework/observable.js';
import { getRandomTripPoint } from '../mock/trip-point';
import { POINTS_COUNT } from '../const';
import { offersByType, destinations } from '../mock/trip-point';

export default class PointsModel extends Observable {
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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.key === update.key);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.key === update.key);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = this.#points.filter((point, pointIndex) => pointIndex !== index);

    this._notify(updateType);
  }
}
