import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view';
import { calculateTotalPrice } from '../utils/point';
import { sortByDay } from '../utils/sort';
import dayjs from 'dayjs';

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
      totalSum: this.#handleSum(),
      routeTitle: this.#handleRouteTitle(),
      routeDates: this.#handleRouteDates(),
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

  #handleSum = () => {
    //1 На этой же итерации никуда не выходим, зная тип точки находим все офферы по этому типу
    // 2 Запускаем по этим офферам цикл
    // 3 На каждой итерации проверяем есть ли айди текущего оффера у нас в массиве в поинте, если да + к цене
    const allPointsPrices = [];
    this.#pointsModel.points.forEach((point) => {
      allPointsPrices.push(point.price);
      const offersByType = this.#pointsModel.offers.filter((offer) => offer.type === point.type);

      offersByType.forEach((offer) => {
        if (point.type === offer.type) {
          offer.offers.map((item) => {
            if (point.offers.includes(item.id)) {
              return allPointsPrices.push(item.price);
            }
          });
        }
      });
    });

    return calculateTotalPrice(allPointsPrices);
  };

  #handleRouteTitle = () => {
    const sortedData = sortByDay([...this.#pointsModel.points]);
    const destinationNames = this.#pointsModel.destinations
      .filter((destination) => sortedData
        .some((point) => destination.id === point.destination))
      .map((destinationById) => destinationById.name);

    const firstCity = destinationNames.at(0);
    const secondCity = destinationNames.at(1);
    const lastCity = destinationNames.at(-1);
    if (destinationNames.length === 0) {
      return '';
    } else if (destinationNames.length === 1) {
      return `${firstCity}`;
    } else if (destinationNames.length === 2) {
      return `${firstCity} — ${lastCity}`;
    } else if (destinationNames.length === 3) {
      return `${firstCity} — ${secondCity}  —  ${lastCity}`;
    } else if (destinationNames.length > 3) {
      return `${firstCity} — ... — ${lastCity}`;
    }

  };

  #handleRouteDates = () => {
    const formatTripDate = (tripDate) => tripDate ? dayjs(tripDate).format('D MMM') : '';
    const sortedData = sortByDay([...this.#pointsModel.points]);
    return `${formatTripDate(sortedData.at(0)?.dateFrom)} — ${formatTripDate(sortedData.at(-1)?.dateTo)}`;
  };
}
