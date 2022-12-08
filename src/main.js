import FilterView from './view/filter-view.js';
import SortListView from './view/sort-list-view.js';
import TripInfoView from './view/trip-info-view';
import {render} from './render.js';
import {RenderPosition} from './render.js';

import RenderTripPointsPresenter from './presenter/render-trip-points-presenter';

const pageMainContainer = document.querySelector('.page-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');
const tripInfoContainer = document.querySelector('.trip-main');
const renderTripPointsPresenter = new RenderTripPointsPresenter({eventContainer: tripEventsContainer});

render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);
render(new SortListView(), tripEventsContainer);

renderTripPointsPresenter.init();
