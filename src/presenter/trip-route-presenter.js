import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view';
//import { UserAction, UpdateType } from '../const.js';
import { calculateTotalPrice } from '../utils/point';

const tripInfoContainer = document.querySelector('.trip-main');

export default class TripRoutePresenter {
  #tripRoutComponent = null;
  //#points = null;
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
    const allSelectedOffers = [];
    const pointsOffers = this.#pointsModel.points.map(({ type, offers }) => ({'type': type, 'offers': offers }));
    const filteredOffersByType = this.#pointsModel.offers.filter((offer) => this.#pointsModel.points.some((point) => offer.type === point.type));
    pointsOffers.filter((item) => filteredOffersByType.filter(({offers, type}) => {
      if (item.type === type) {
        return item.offers.filter((index) => offers.filter((offer) => {
          if (index === offer.id)
          { allSelectedOffers.push(offer); }
        }));
      }
    }));
    const priceFromSelectedOffers = allSelectedOffers.map((offer) => offer.price);
    const priceFromPoints = this.#pointsModel.points.map((point) => point.price);
    const pricesFromOffersAndPoints = priceFromSelectedOffers.concat(priceFromPoints);


    return calculateTotalPrice(pricesFromOffersAndPoints);
  };

}
