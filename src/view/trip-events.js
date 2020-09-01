import {createElement} from '../utils.js';

const createTripEventsTemplate = () => {
  return (
    `<div class="page-body__container">
      <section class="trip-events">
        <h2 class="visually-hidden">Trip events</h2>
      </section>
    </div>`
  );
};

export default class TripEvents {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
