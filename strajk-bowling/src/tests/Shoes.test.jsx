jest.mock('nanoid', () => ({ nanoid: () => 'mocked-id' }));
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Shoes from '../components/Shoes/Shoes';

test('adds and removes shoe size fields', () => {
  const addShoeMock = jest.fn();
  const removeShoeMock = jest.fn();
  const updateSizeMock = jest.fn();
  
  const shoes = [{ id: 'shoe1' }]; // Mockad data

  render(
    <Shoes
      updateSize={updateSizeMock}
      addShoe={addShoeMock}
      removeShoe={removeShoeMock}
      shoes={shoes}
    />
  );

  // Kontrollera att ett fält renderas
  const shoeInput = screen.getByLabelText(/Shoe size \/ person 1/i);
  expect(shoeInput).toBeInTheDocument();

  // Klicka på "+" och kontrollera att funktionen anropas
  const addButton = screen.getByText('+');
  fireEvent.click(addButton);
  expect(addShoeMock).toHaveBeenCalled();

  // Klicka på "-" och kontrollera att funktionen anropas
  const removeButton = screen.getByText('-');
  fireEvent.click(removeButton);
  expect(removeShoeMock).toHaveBeenCalled();
});
