import React from "react";
import { render, screen } from "@testing-library/react";
import Top from "../components/Top/Top";

describe("Top Component", () => {
  test("renders the title prop correctly", () => {
    // Arrange
    const testTitle = "Test Title";

    // Act
    render(<Top title={testTitle} />);

    // Assert
    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("top__title");
  });

  test("renders the logo image with correct alt text", () => {
    // Act
    render(<Top title="Test Title" />);

    // Assert
    const logoElement = screen.getByAltText("Strajk logo");
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass("top__logo");
  });

  test("renders the header with the correct CSS class", () => {
    // Act
    const { container } = render(<Top title="Test Title" />);

    // Assert
    const headerElement = container.firstChild;
    expect(headerElement).toHaveClass("top");
  });
});
