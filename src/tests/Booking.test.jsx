import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "../views/Booking";

// Mockar för Navigation-komponenten
jest.mock("../components/Navigation/Navigation", () => () => <nav>Mocked Navigation</nav>);

// Mockar för Top-komponenten
jest.mock("../components/Top/Top", () => ({ title }) => <header>{title}</header>);

// Mockar för BookingInfo-komponenten
jest.mock("../components/BookingInfo/BookingInfo", () => ({ updateBookingDetails }) => (
  <div>
    <label>
      Date
      <input name="when" onChange={updateBookingDetails} />
    </label>
    <label>
      Time
      <input name="time" onChange={updateBookingDetails} />
    </label>
    <label>
      Lanes
      <input name="lanes" onChange={updateBookingDetails} type="number" />
    </label>
    <label>
      People
      <input name="people" onChange={updateBookingDetails} type="number" />
    </label>
  </div>
));

// Mockar för Shoes-komponenten
jest.mock("../components/Shoes/Shoes", () => ({ addShoe, removeShoe, updateSize, shoes }) => (
  <div>
    <button onClick={() => addShoe("1")}>Add Shoe</button>
    {shoes.map((shoe) => (
      <div key={shoe.id}>
        <input
          name={shoe.id}
          value={shoe.size}
          onChange={updateSize}
          placeholder="Shoe size"
        />
        <button onClick={() => removeShoe(shoe.id)}>Remove</button>
      </div>
    ))}
  </div>
));

// Mockar för ErrorMessage-komponenten
jest.mock("../components/ErrorMessage/ErrorMessage", () => ({ message }) => <div>{message}</div>);

// Testar Booking-komponenten
describe("Booking Component", () => {
  test("renders correctly", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    expect(screen.getByText("Booking")).toBeInTheDocument();
    expect(screen.getByText("Mocked Navigation")).toBeInTheDocument();
    expect(screen.getByText("strIIIIIike!")).toBeInTheDocument();
  });

  test("shows error if required fields are missing", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const submitButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(submitButton);

    expect(await screen.findByText("Alla fälten måste vara ifyllda")).toBeInTheDocument();
  });

  test("validates player and shoe counts", async () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("People"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("Lanes"), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2024-12-12" } });
    fireEvent.change(screen.getByLabelText("Time"), { target: { value: "12:00" } });
    fireEvent.click(screen.getByText("Add Shoe")); // Lägg till bara en sko med klicket på knappen.

    await waitFor(() => {
      fireEvent.click(screen.getByText("strIIIIIike!"));
    })

    await waitFor(() => {
      expect(screen.getByText("Antalet skor måste stämma överens med antal spelare")).toBeInTheDocument();
    });

  });

  test("allows adding and removing shoes", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const addButton = screen.getByText(/Add Shoe/i);
    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText(/Shoe size/i)).toBeInTheDocument();

    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);
    expect(screen.queryByPlaceholderText(/Shoe size/i)).not.toBeInTheDocument();
  });

  test("sends booking details on valid submission", async () => {
    jest.spyOn(window, "fetch").mockResolvedValueOnce({
      json: async () => ({ bookingNumber: "12345", totalPrice: 500 }),
    });

    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2024-12-31" } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: "18:00" } });
    fireEvent.change(screen.getByLabelText(/Lanes/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/People/i), { target: { value: "1" } });

    fireEvent.click(screen.getByText(/Add Shoe/i));
    fireEvent.change(screen.getByPlaceholderText(/Shoe size/i), { target: { value: "40" } });

    const submitButton = screen.getByText(/strIIIIIike!/i);

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(window.fetch).toHaveBeenCalledWith(
      "/api/confirmation",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });
});
