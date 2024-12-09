import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  // Hämta state via routing eller från sessionStorage
  const { state } = useLocation();
  const bookingDetails = state?.confirmationDetails || JSON.parse(sessionStorage.getItem("bookingDetails"));

  // Om inga bokningsdetaljer hittas
  if (!bookingDetails) {
    return <h2>Inga bokning gjord</h2>;
  }

  // Rendera bokningsdetaljer
  return (
    <section className="confirmation">
      <form className="confirmation__details">
        <section className="input">
          <label className="input__label" htmlFor="when">
            When
          </label>
          <input
            id="when"
            className="input__field confirmation__input"
            type="text"
            value={bookingDetails.when}
            disabled
          />
        </section>
        <section className="input">
          <label className="input__label" htmlFor="who">
            Who
          </label>
          <input
            id="who"
            className="input__field confirmation__input"
            type="text"
            value={bookingDetails.who}
            disabled
          />
        </section>
        <section className="input">
          <label className="input__label" htmlFor="lanes">
            Lanes
          </label>
          <input
            id="lanes"
            className="input__field confirmation__input"
            type="text"
            value={bookingDetails.lanes}
            disabled
          />
        </section>
        <section className="input">
          <label className="input__label" htmlFor="booking-number">
            Booking number
          </label>
          <input
            id="booking-number"
            className="input__field confirmation__input"
            type="text"
            value={bookingDetails.bookingNumber}
            disabled
          />
        </section>
        <article className="confirmation__price">
          <p>Total:</p>
          <p>{bookingDetails.totalPrice} sek</p>
        </article>
        <button className="button confirmation__button">Sweet, let's go!</button>
      </form>
    </section>
  );
};

export default Confirmation;
