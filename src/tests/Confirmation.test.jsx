import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "../views/Confirmation";

describe("Confirmation Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("renders booking details from sessionStorage", () => {
    const mockBookingDetails = {
      when: "2024-12-31 18:00",
      who: 4,
      lanes: 2,
      bookingNumber: "12345",
      totalPrice: 680,
    };

    sessionStorage.setItem("bookingDetails", JSON.stringify(mockBookingDetails));

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/When/i)).toHaveValue("2024-12-31 18:00");
    expect(screen.getByLabelText(/Who/i)).toHaveValue("4");
    expect(screen.getByLabelText(/Lanes/i)).toHaveValue("2");
    expect(screen.getByLabelText(/Booking number/i)).toHaveValue("12345");
  });

  test("renders fallback message if no booking exists", () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    const fallbackMessage = screen.getByText(/Inga bokning gjord/i);
    expect(fallbackMessage).toBeInTheDocument();
  });

  test("renders booking details passed as state", () => {
    const mockState = {
      confirmationDetails: {
        when: "2024-12-31 18:00",
        who: 3,
        lanes: 1,
        bookingNumber: "54321",
        totalPrice: 480,
      },
    };

    render(
      <MemoryRouter initialEntries={[{ state: mockState }]}>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/When/i)).toHaveValue("2024-12-31 18:00");
    expect(screen.getByLabelText(/Who/i)).toHaveValue("3");
    expect(screen.getByLabelText(/Lanes/i)).toHaveValue("1");
    expect(screen.getByLabelText(/Booking number/i)).toHaveValue("54321");
    expect(screen.getByText(/480 sek/i)).toBeInTheDocument();
  });
});
