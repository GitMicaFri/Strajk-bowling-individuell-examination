import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input/Input';

describe('Input Component', () => {
  test('renders input with correct label and attributes', () => {
    // Arrange
    const props = {
      label: 'Test Label',
      type: 'text',
      customClass: 'custom-class',
      name: 'testName',
      defaultValue: 'Default Value',
      maxLength: 10,
      disabled: false,
    };

    // Act
    render(<Input {...props} />);

    // Assert
    const inputElement = screen.getByRole('textbox', { name: /test label/i });
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('name', 'testName');
    expect(inputElement).toHaveValue('Default Value');
    expect(inputElement).not.toBeDisabled();
    expect(inputElement).toHaveClass('input__field custom-class');
  });

  test('calls handleChange when input value changes', () => {
    // Arrange
    const handleChangeMock = jest.fn();
    const props = {
      label: 'Test Label',
      type: 'text',
      name: 'testName',
      handleChange: handleChangeMock,
    };

    render(<Input {...props} />);

    // Act
    const inputElement = screen.getByRole('textbox', { name: /test label/i });
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    // Assert
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
    expect(handleChangeMock).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ value: 'New Value' }) }));
  });

  test('disables the input when disabled prop is true', () => {
    // Arrange
    const props = {
      label: 'Disabled Input',
      type: 'text',
      name: 'disabledInput',
      disabled: true,
    };

    render(<Input {...props} />);

    // Assert
    const inputElement = screen.getByRole('textbox', { name: /disabled input/i });
    expect(inputElement).toBeDisabled();
  });
});
