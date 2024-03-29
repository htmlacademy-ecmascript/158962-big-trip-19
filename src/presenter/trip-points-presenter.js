import TripEventList from '../view/trip-event-list';
import EmptyPointView from '../view/empty-point-view';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SortType, FilterType, UpdateType, UserAction, TimeLimit } from '../const';
import { filterGroup } from '../utils/filter.js';
import { sortByPrice, sortByDay , sortByDuration, } from '../utils/sort.js';
import SortListView from '../view/sort-list-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import TripRoutePresenter from './trip-route-presenter';
import LoadingView from '../view/loading-view.js';
import ErrorLoadingView from '../view/error-loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class TripPointsPresenter {
  #eventContainer = null;
  #pointsModel = null;
  #noPointComponent = null;
  #filterModel = null;
  #tripList = new TripEventList();
  #tripInfoPresenter = null;
  #pointPresenter = new Map();
  #newPointPresenter = null;
  #sortComponent = null;
  #currentSortType = SortType.DAY.value;
  #filterType = FilterType.EVERYTHING;
  #loadingComponent = new LoadingView();
  #errorLoadingComponent = new ErrorLoadingView();
  #isLoading = true;
  #isErrorLoading = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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
    if (this.#isErrorLoading) {
      this.#renderErrorLoading();
      return;
    }
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
    this.#renderPoints(points);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventContainer);
  }

  #renderErrorLoading() {
    render(this.#errorLoadingComponent, this.#eventContainer);
  }

  #renderPoints(tripPoints) {
    return tripPoints.forEach((tripPoint) => this.#renderTripPoint(tripPoint, this.#pointsModel.offers, this.#pointsModel.destinations));
  }


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();

        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }

        break;
      default:
        throw new Error(`Unknown order state: '${actionType}'!`);
    }

    this.#uiBlocker.unblock();
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
        this.#clearPointsList({resetSortType: true});
        this.#renderTripBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTripBoard();
        break;
      case UpdateType.LOADING_ERROR:
        this.#isErrorLoading = true;
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
    this.#clearPointsList();
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
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointsList({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#errorLoadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY.value;
    }
  }
}
