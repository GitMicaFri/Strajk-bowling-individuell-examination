import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.scss";

import BookingInfo from "../components/BookingInfo/BookingInfo";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Navigation from "../components/Navigation/Navigation";
import Shoes from "../components/Shoes/Shoes";
import Top from "../components/Top/Top";

function Booking() {
  const [booking, setBooking] = useState({
    when: "",
    time: "",
    lanes: 0,
    people: 0,
  });
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Funktion för att uppdatera bokningsdetaljer
  function updateBookingDetails(event) {
    const { name, value } = event.target;
    setError("");

    setBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Funktion för att uppdatera storlek på skor
  function updateSize(event) {
    const { value, name } = event.target;
    setError("");

    if (value.length === 2 || value.length === 0) {
      setShoes((prevState) =>
        prevState.map((shoe) =>
          shoe.id === name ? { ...shoe, size: value } : shoe
        )
      );
    }
  }

  // Funktion för att lägga till en ny sko
  function addShoe(name) {
    setError("");
    setShoes([...shoes, { id: name, size: "" }]);
  }

  // Funktion för att ta bort en sko
  function removeShoe(name) {
    setError("");
    setShoes(shoes.filter((shoe) => shoe.id !== name));
  }

  // Funktion för att jämföra antal personer och antal skor
  function comparePeopleAndShoes() {
    return parseInt(booking.people) === shoes.length;
  }

  // Funktion för att skicka bokningsdata till servern
  async function sendBooking(bookingInfo) {
    console.log("Sending booking info:", bookingInfo);

    const response = await fetch(
      // "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/confirmation",
      "/api/confirmation",
      {
        method: "POST",
        headers: {
          // "x-api-key": "738c6b9d-24cf-47c3-b688-f4f4c5747662",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingInfo),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  // Funktion för att spara bokningsbekräftelse
  function saveConfirmation(confirmation) {
    console.log('confirmation', confirmation)
    sessionStorage.setItem("confirmation", JSON.stringify(confirmation));
  }

  // Funktion för att hantera bokningen
  async function book() {
    if (!booking.when || !booking.lanes || !booking.time || !booking.people) {
      setError("Alla fälten måste vara ifyllda");
      return;
    }
    if (booking.people <= 0) {
      setError("Antal spelare måste vara minst 1.");
      return;
    }
    if (booking.lanes <= 0) {
      setError("Antal banor måste vara minst 1.");
      return;
    }
    if (!comparePeopleAndShoes()) {
      console.log("Error triggered: Skor och spelare matchar inte")
      setError("Antalet skor måste stämma överens med antal spelare");
      return;
    }

    const bookingInfo = {
      when: `${booking.when}T${booking.time}`,
      lanes: booking.lanes,
      people: booking.people,
      shoes: shoes.map((shoe) => shoe.size),
    };

    try {
      const confirmation = await sendBooking(bookingInfo);
      saveConfirmation(confirmation);
      navigate("/confirmation", { state: { confirmationDetails: confirmation } });
    } catch (error) {
      setError("Det gick inte att genomföra bokningen. Försök igen.");
    }
  }

  return (
    <section className="booking">
      <Navigation />
      <Top title="Booking" />
      <BookingInfo updateBookingDetails={updateBookingDetails} />
      <Shoes
        updateSize={updateSize}
        addShoe={addShoe}
        removeShoe={removeShoe}
        shoes={shoes}
      />
      <button className="button booking__button" onClick={book}>
        strIIIIIike!
      </button>

      {error && <ErrorMessage message={error} />}
    </section>
  );
}

export default Booking;
