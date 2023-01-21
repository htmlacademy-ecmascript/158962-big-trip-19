import { render, replace, remove } from '../framework/render.js';
import TripItemView from '../view/trip-item-view';
import { isEscEvent, isDatesEqual} from '../utils/point';
import EditPointView from '../view/edit-point-view';
import { UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #tripList = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #offers = null;
  #destinations = null;
  #mode = Mode.DEFAULT;
  #isPointEdit = null;

  constructor({ tripList, onDataChange, onModeChange, isPointEdit = true }) {
    this.#tripList = tripList;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#isPointEdit = isPointEdit;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevEditFormComponent = this.#pointEditComponent;

    this.#pointComponent = new TripItemView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onClick:  this.#handleCloseFormClick,
      onDeleteClick: this.#handleDeleteClick,
      isPointEdit: this.#isPointEdit,
    });

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointComponent, this.#tripList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevEditFormComponent);
    }

    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange?.();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleFormSubmit = (update) => {
    //const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, update.dateFrom);
    //const updateType = isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH;
    this.#handleDataChange?.(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      //updateType,
      update,
    );
    this.#replaceEditFormToPoint();
  };

  #handleCloseFormClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange?.(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange?.(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
