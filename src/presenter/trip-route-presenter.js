import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view';
import { sortByDay } from '../utils/sort';
import { formatTripDate } from '../utils/point';
import { MAX_LENGTH_FOR_RENDER } from '../const';

const tripInfoContainer = document.querySelector('.trip-main');

export default class TripRoutePresenter {
  #tripRoutComponent = null;
  #pointsModel = null;
  #handleDataChange = null;


  constructor({pointsModel, onDataChange}) {
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevTripRoutComponent = this.#tripRoutComponent;
    this.#tripRoutComponent = new TripInfoView({
      totalSum: this.#calculateTotalSum(),
      routeTitle: this.#createRouteTitle(),
      routeDates: this.#createRouteDates(),
    });

    if (prevTripRoutComponent === null) {
      render(this.#tripRoutComponent, tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripRoutComponent, prevTripRoutComponent);
    remove(prevTripRoutComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #calculateTotalSum = () => {
    let totalPrice = 0;
    this.#pointsModel.points.forEach((point) => {
      totalPrice += point.price;
      const offersByType = this.#pointsModel.offers.find((offer) => offer.type === point.type);
      offersByType.offers.forEach((offer) => {
        if (point.offers.includes(offer.id)) {
          totalPrice += offer.price;
        }
      });
    });
    return totalPrice;
  };

  #createRouteTitle = () => {
    const sortedData = sortByDay([...this.#pointsModel.points]);
    const destinationNames = sortedData.map((point) => this.#pointsModel.destinations
      .find((destination) => destination.id === point.destination))
      .map((destinationById) => destinationById.name);

    if (destinationNames.length === 0) {
      return '';
    } else if (destinationNames.length <= MAX_LENGTH_FOR_RENDER) {
      return destinationNames.join('—');
    }

    return `${destinationNames[0]} — ... — ${destinationNames[destinationNames.length - 1]}`;
  };

  #createRouteDates = () => {
    const sortedData = sortByDay([...this.#pointsModel.points]);
    return `${formatTripDate(sortedData.at(0)?.dateFrom, 'D MMM')} — ${formatTripDate(sortedData.at(-1)?.dateTo, 'D MMM')}`;
  };
}
