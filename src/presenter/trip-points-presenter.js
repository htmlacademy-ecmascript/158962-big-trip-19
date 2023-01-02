import TripEventList from '../view/trip-event-list';
import EmptyPointView from '../view/empty-point-view';
import { render, RenderPosition } from '../framework/render.js';
import { TEXTS_FOR_EMPTY_SHEET, SortType } from '../const';
import { filterPointsByFuture, filterPointsByPast, filterPointsByPresent } from '../utils/filter.js';
import { sortByPrice, sortByDay , sortByDuration, } from '../utils/sort.js';
import { updatePoint } from '../utils/common';
import SortListView from '../view/sort-list-view';
import PointPresenter from './point-presenter';

export default class TripPointsPresenter {
  #eventContainer = null;
  #pointsModel = null;
  #offers = null;
  #destinations = null;
  #tripPoints = [];
  #tripList = new TripEventList();
  #emptyPointComponent = new EmptyPointView(TEXTS_FOR_EMPTY_SHEET.emptyPointsList);
  #pointPresenter = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourcedTripPoints = [];

  constructor({ eventContainer, pointsModel }) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#sourcedTripPoints = [...this.#pointsModel.points];
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    if (this.#tripPoints.length === 0) {
      return this.#renderEmptyPointsList();
    }

    render(this.#tripList, this.#eventContainer);
    this.#renderSort();
    this.#renderPoints(sortByDay(this.#tripPoints));
  }

  #renderPoints(tripPoints) {
    return tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint, this.#offers, this.#destinations));
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updatePoint(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updatePoint(this.#sourcedTripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.key).init(updatedPoint, this.#offers, this.#destinations);
  };

  #sortTasks(sortType) {
    switch (sortType) {
      case SortType.TIME:
        sortByDuration(this.#tripPoints);
        break;
      case SortType.PRICE:
        sortByPrice(this.#tripPoints);
        break;
      default:
        //sortByDay(this.#tripPoints);
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearPointsList();
    this.#renderPoints(this.#tripPoints);
  };

  #renderSort() {
    this.#sortComponent = new SortListView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripList.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.key, pointPresenter);
  }

  #renderEmptyPointsList() {
    return render(this.#emptyPointComponent, this.#eventContainer);
  }

  #clearPointsList() {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
