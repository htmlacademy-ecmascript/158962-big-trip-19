import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view';
import { isEscEvent } from '../utils/point';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #tripList = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offers = null;
  #destinations = null;
  #isPointEdit = null;

  constructor({tripList, onDataChange, onDestroy, isPointEdit = false}) {
    this.#tripList = tripList;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#isPointEdit = isPointEdit;
  }

  init(offers, destinations) {
    this.#offers = offers;
    this.#destinations = destinations;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormNewPointSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isPointEdit: this.#isPointEdit,
    });

    render(this.#pointEditComponent, this.#tripList, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange?.(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
