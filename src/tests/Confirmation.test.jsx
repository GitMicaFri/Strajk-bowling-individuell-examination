import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "../views/Confirmation";

describe("Confirmation Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("renders booking details from sessionStorage", () => {
    sessionStorage.setItem(
      "confirmation",
      JSON.stringify({
        when: "2024-12-12T12:00",
        people: 5,
        lanes: 2,
        price: 500,
        id: "12345-VERY-UNIQUE",
      })
    );

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText("See you soon!")).toBeInTheDocument();
    expect(screen.getByLabelText("When").value).toBe("2024-12-12 12:00");
    expect(screen.getByLabelText("Who").value).toBe("5");
    expect(screen.getByLabelText("Lanes").value).toBe("2");
    expect(screen.getByLabelText("Booking number").value).toBe(
      "12345-VERY-UNIQUE"
    );
    expect(screen.findByText(`500 SEK`)).toBeDefined();
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
});
