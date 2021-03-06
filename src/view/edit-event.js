import {
  getfullPriceEvent,
  getDateToFullFormat
} from '../utils/event.js';
import AbstractView from './abstract.js';


const createEditEventTemplate = (event) => {

  const {
    eventType = `Flight`,
    offers = [],
    price = 0,
    destination = ``,
    startDate = new Date(),
    endDate = (new Date() + 1),
    isFavorite = false
  } = event;

  const waypointTypes = [
    {
      name: `Taxi`,
      icon: `img/icons/taxi.png`,
      waypointType: `Transfer`
    },
    {
      name: `Bus`,
      icon: `img/icons/bus.png`,
      waypointType: `Transfer`
    },
    {
      name: `Train`,
      icon: `img/icons/train.png`,
      waypointType: `Transfer`
    },
    {
      name: `Ship`,
      icon: `img/icons/ship.png`,
      waypointType: `Transfer`
    },
    {
      name: `Transport`,
      icon: `img/icons/Transport.png`,
      waypointType: `Transfer`
    },
    {
      name: `Drive`,
      icon: `img/icons/drive.png`,
      waypointType: `Transfer`
    },
    {
      name: `Flight`,
      icon: `img/icons/flight.png`,
      waypointType: `Transfer`
    },
    {
      name: `Check`,
      icon: `img/icons/check-in.png`,
      waypointType: `Activity`
    },
    {
      name: `Sightseeing`,
      icon: `img/icons/sightseeing.png`,
      waypointType: `Activity`
    },
    {
      name: `Restaurant`,
      icon: `img/icons/restaurant.png`,
      waypointType: `Activity`
    }
  ];

  const showFullEventOffers = () => {
    return offers.map((offer) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.shortName}-1" type="checkbox" name="event-offer-${offer.shortName}" ${offer.isActive ? `checked=""` : ``} >
        <label class="event__offer-label" for="event-offer-${offer.shortName}-1">
          <span class="event__offer-title">${offer.name}</span>
          +
          €&nbsp;<span class="event__offer-price">${offer.cost}</span>
        </label>
      </div>`).join(``);
  };

  const fullStartDate = getDateToFullFormat(startDate);
  const fullEndDate = getDateToFullFormat(endDate);
  const fullTodayDate = getDateToFullFormat(new Date());

  const createEditEventTransferTemaplte = () => {
    return waypointTypes.filter((type) => type.waypointType === `Transfer`).map((type) => `
        <div class="event__type-item">
        <input id="event-type-${type.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.name.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.name.toLowerCase()}" for="event-type-${type.name.toLowerCase()}-1">${type.name}</label>
        </div>
      `).join(``);
  };

  const createEditEventActivityTemaplte = () => {
    return waypointTypes.filter((type) => type.waypointType === `Activity`).map((type) => `
      <div class="event__type-item">
        <input id="event-type-${type.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.name.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.name.toLowerCase()}" for="event-type-${type.name.toLowerCase()}-1">${type.name}</label>
      </div>`).join(``);
  };

  return `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="${eventType.icon}" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createEditEventTransferTemaplte()}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createEditEventActivityTemaplte()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventType.name} ${eventType.waypointType !== `Transport` ? `in` : `to`}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${fullStartDate !== `` ? fullStartDate : fullTodayDate}">
          —
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${fullEndDate !== `` ? fullEndDate : fullTodayDate}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${getfullPriceEvent(price, offers)}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked=""` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${showFullEventOffers()}
          </div>
        </section>
      </section>
    </form>
  </li>`;
};

export default class AddEditEvent extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createEditEventTemplate(this._event);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
