import {getRandomTripPoint} from '../mock/trip-point';
import {POINTS_COUNT} from '../const';
import {offersByType, destinations} from '../mock/trip-point';

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomTripPoint);
  offers = offersByType;
  destinations = destinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
