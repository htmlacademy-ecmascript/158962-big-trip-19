import {getRandomTripPoint} from '../mock/tripPoint';
import {POINTS_COUNT} from '../const';
import {offersByType} from '../mock/tripPoint';

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomTripPoint);
  offers = offersByType;
  getPoints() {
    return this.points;
  }

  getOffersByPointType() {
    return this.offers;
  }
}
