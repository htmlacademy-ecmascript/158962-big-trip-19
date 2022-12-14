import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view';
import { render } from './framework/render.js';
import { RenderPosition } from './framework/render.js';
import TripPointsPresenter from './presenter/trip-points-presenter';
import PointsModel from './model/points-model.js';

const pageMainContainer = document.querySelector('.page-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');
const tripInfoContainer = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const tripPointsPresenter = new TripPointsPresenter({
  eventContainer: tripEventsContainer,
  pointsModel
});

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

tripPointsPresenter.init();
