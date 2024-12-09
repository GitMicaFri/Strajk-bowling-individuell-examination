jest.mock("nanoid", () => ({ nanoid: () => "mocked-id" }));
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Shoes from "../components/Shoes/Shoes";

describe("Shoes Component", () => {
  const addShoeMock = jest.fn();
  const updateSizeMock = jest.fn();

  const renderComponent = (shoes = [{ id: "shoe1", size: "" }]) => {
    render(
      <Shoes updateSize={updateSizeMock} addShoe={addShoeMock} shoes={shoes} />
    );
  };

  test("renders shoe size fields correctly", () => {
    renderComponent([{ id: "shoe1", size: "" }, { id: "shoe2", size: "" }]);

    // Kontrollera att två skofält renderas
    const shoeInput1 = screen.getByLabelText(/Shoe size \/ person 1/i);
    const shoeInput2 = screen.getByLabelText(/Shoe size \/ person 2/i);
    expect(shoeInput1).toBeInTheDocument();
    expect(shoeInput2).toBeInTheDocument();
  });

  test('calls "addShoe" when "+" button is clicked', () => {
    renderComponent();

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    expect(addShoeMock).toHaveBeenCalled();
  });

  test("updates shoe size correctly", () => {
    renderComponent();

    const shoeInput = screen.getByLabelText(/Shoe size \/ person 1/i);
    fireEvent.change(shoeInput, { target: { value: "42" } });

    expect(updateSizeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "42" }),
      })
    );
  });
});

