import TripInfoView from './view/trip-info-view';
import { render } from './framework/render.js';
import { RenderPosition } from './framework/render.js';
import TripPointsPresenter from './presenter/trip-points-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view';

const pageMainContainer = document.querySelector('.page-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');
const tripInfoContainer = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripPointsPresenter = new TripPointsPresenter({
  eventContainer: tripEventsContainer,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});
const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

render(new TripInfoView({points: pointsModel.points}), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(newPointButtonComponent, tripInfoContainer, RenderPosition.BEFOREEND);
const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel,
  pointsModel
});


function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPointsPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}


filterPresenter.init();
tripPointsPresenter.init();
