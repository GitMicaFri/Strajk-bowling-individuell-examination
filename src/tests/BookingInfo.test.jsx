import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../components/BookingInfo/BookingInfo';

describe('BookingInfo Component', () => {
  const updateBookingDetailsMock = jest.fn(); // Mock-funktion

  beforeEach(() => {
    // Rendera komponenten innan varje test
    render(<BookingInfo updateBookingDetails={updateBookingDetailsMock} />);
  });

  test('renders all input fields and heading', () => {
    // Kontrollera rubriken
    const heading = screen.getByText(/When, WHAT & Who/i);
    expect(heading).toBeInTheDocument();

    // Kontrollera datumfält
    const dateInput = screen.getByLabelText(/Date/i);
    expect(dateInput).toBeInTheDocument();

    // Kontrollera tidsfält
    const timeInput = screen.getByLabelText(/Time/i);
    expect(timeInput).toBeInTheDocument();

    // Kontrollera spelarfält
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    expect(playersInput).toBeInTheDocument();

    // Kontrollera banfält
    const lanesInput = screen.getByLabelText(/Number of lanes/i);
    expect(lanesInput).toBeInTheDocument();
  });

  test('calls updateBookingDetails when inputs are changed', () => {
    // Ändra datum
    const dateInput = screen.getByLabelText(/Date/i);
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
    expect(updateBookingDetailsMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: '2024-12-31' }) })
    );

    // Ändra tid
    const timeInput = screen.getByLabelText(/Time/i);
    fireEvent.change(timeInput, { target: { value: '18:00' } });
    expect(updateBookingDetailsMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: '18:00' }) })
    );

    // Ändra antal spelare
    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: '4' } });
    expect(updateBookingDetailsMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: '4' }) })
    );

    // Ändra antal banor
    const lanesInput = screen.getByLabelText(/Number of lanes/i);
    fireEvent.change(lanesInput, { target: { value: '2' } });
    expect(updateBookingDetailsMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: '2' }) })
    );
  });

  test('displays error messages if fields are empty', () => {
    // Lägger till validering senare när felmeddelanden implementeras.
    // Exempelvis kontrollera att ett felmeddelande visas om användaren lämnar fälten tomma.
  });
});
