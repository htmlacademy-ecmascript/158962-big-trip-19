import TripEventList from '../view/trip-event-list';
import EmptyPointView from '../view/empty-point-view';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, FilterType, UpdateType, UserAction, POINTS_COUNT } from '../const';
import { filterGroup } from '../utils/filter.js';
import { sortByPrice, sortByDay , sortByDuration, } from '../utils/sort.js';
import SortListView from '../view/sort-list-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import TripRoutePresenter from './trip-route-presenter';
import LoadingView from '../view/loading-view.js';

export default class TripPointsPresenter {
  #eventContainer = null;
  #pointsModel = null;
  //#offers = null;
  //#destinations = null;
  #noPointComponent = null;
  #filterModel = null;
  #tripList = new TripEventList();
  #tripInfoPresenter = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY.value;
  #filterType = FilterType.EVERYTHING;
  #renderedPointCount = POINTS_COUNT;
  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor({ eventContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      tripList: this.#tripList.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#tripInfoPresenter = new TripRoutePresenter({pointsModel});
    this.#tripInfoPresenter.init();
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

   init() {
    //this.#offers = this.#pointsModel.offers;
    //console.log(this.#pointsModel.offers)
    //this.#destinations = this.#pointsModel.destinations;
    //console.log('this.#destinations1', this.#destinations);
    //console.log('this.#pointsModel.points', this.#pointsModel.points)
    this.#renderTripBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY.value;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.#pointsModel.offers, this.#pointsModel.destinations);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterGroup[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.TIME.value:
        sortByDuration(filteredPoints);
        break;
      case SortType.PRICE.value:
        sortByPrice(filteredPoints);
        break;
      case SortType.DAY.value:
        sortByDay(filteredPoints);
        break;
      default:
        throw new Error(`Unknown order state: '${this.#currentSortType}'!`);
    }

    return filteredPoints;
  }


  #renderEmptyPointsList() {
    this.#noPointComponent = new EmptyPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#eventContainer);
  }

  #renderTripBoard() {
    render(this.#tripList, this.#eventContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderEmptyPointsList();
      return;
    }

    this.#renderSort();
    this.#renderPoints(points.slice(0, Math.min(pointCount, this.#renderedPointCount)));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoints(tripPoints) {
    return tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint, this.#pointsModel.offers, this.#pointsModel.destinations));
  }


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
      default:
        throw new Error(`Unknown order state: '${actionType}'!`);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#pointsModel.offers, this.#pointsModel.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({resetRenderedPointCount: true, resetSortType: true});
        this.#renderTripBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripBoard();
        break;
      default:
        throw new Error(`Unknown order state: '${updateType}'!`);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList({resetRenderedPointCount: true});
    this.#renderTripBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortListView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#eventContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      tripList: this.#tripList.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.key, pointPresenter);
  }

  #clearPointsList({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this.points.length;
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetRenderedPointCount) {
      this.#renderedPointCount = POINTS_COUNT;
    } else {
      this.#renderedPointCount = Math.min(pointCount, this.#renderedPointCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.value;
    }
  }
}
