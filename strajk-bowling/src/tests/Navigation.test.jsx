import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

describe('Navigation Component', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const navIcon = screen.getByRole('img', { name: /navigation icon/i });
    expect(navIcon).toBeInTheDocument();

    const bookingLink = screen.getByText(/booking/i);
    expect(bookingLink).toBeInTheDocument();

    const confirmationLink = screen.getByText(/confirmation/i);
    expect(confirmationLink).toBeInTheDocument();
  });

  test('toggles menu visibility when icon is clicked', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const navIcon = screen.getByRole('img', { name: /navigation icon/i });
    fireEvent.click(navIcon);

    const bookingLink = screen.getByText(/booking/i);
    expect(bookingLink).not.toHaveClass('hide');
  });
});
