import { remove, render, RenderPosition } from '../framework/render.js';
import EditPointView from '../view/edit-point-view';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #tripList = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  //#point = null;
  //#offers = null;
  //#destinations = null;

  constructor({tripList, onDataChange, onDestroy}) {
    this.#tripList = tripList;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    /*this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;*/

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditPointView({
      //point: this.#point,
      //offers: this.#offers,
      //destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
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

  #handleFormSubmit = (task) => {
    this.#handleDataChange?.(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...task},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
