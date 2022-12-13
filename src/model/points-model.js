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

  getOffersByPointType() {
    const pointsTypes = this.getPoints().slice().map(({ type }) => type); // собираются типы рандомных точек в массив
    return this.offers.filter(({type}) => pointsTypes.includes(type)); // формируется массив из объектов офферов только тех точек, которые пришли, чтоб во вью уже заехали конкретные
  }

  getDestinations() {
    return this.destinations;
  }
}
