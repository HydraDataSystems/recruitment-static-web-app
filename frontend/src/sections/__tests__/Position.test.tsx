// Write tests for position component here

import { render, screen } from '../../test-utils';
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';
import Position from '../Position';
import { act } from '@testing-library/react';

describe("Position component", () => {
  test("Initial render is correct", () => {
    render(<Position />);
    expect(
      screen.getByRole('heading', { level: 2 })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Which position are you applying for?' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Is this position in teaching or education?' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: 'Where is the position located?' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('combobox', { name: "What's your preferred working pattern?" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('spinbutton', { name: 'Requested hours per week?' })
    ).toBeInTheDocument();
  });

  test("Selecting other for position correctly displays additional field", () => {
    render(<Position />);
    const positionSelect = screen.getByRole('combobox', { name: 'Which position are you applying for?' });
    const otherOption = screen.getByRole('option', { name: 'Other' });

    act(() => {
      userEvent.selectOptions(positionSelect, otherOption);
    });

    const otherInput = screen.getByRole('textbox', { name: 'What position are you applying for?' });

    expect(positionSelect).toBeInTheDocument();
    expect(otherInput).toBeInTheDocument();
  });

  test("Default validation occurs on submit", async () => {
    render(<Position />);
    const submitButton = screen.getByRole('button', { name: 'Next' });

    await act(() => {
      userEvent.click(submitButton);
    });

    expect(
      screen.getByText<HTMLParagraphElement>('Position is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('This field is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('Location is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('Working Pattern is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('Hours Requested is required')
    ).toBeInTheDocument();
  });

  test("Validation occurs on submit when other is selected for position", async () => {
    render(<Position />);
    const positionSelect = screen.getByRole('combobox', { name: 'Which position are you applying for?' });
    const otherOption = screen.getByRole('option', { name: 'Other' });

    await act(() => {
      userEvent.selectOptions(positionSelect, otherOption);
    });

    const submitButton = screen.getByRole('button', { name: 'Next' });

    await act(() => {
      userEvent.click(submitButton);
    });

    expect(
      screen.getByText<HTMLParagraphElement>('Other Position is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('This field is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('Location is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('Working Pattern is required')
    ).toBeInTheDocument();

    expect(
      screen.getByText<HTMLParagraphElement>('Hours Requested is required')
    ).toBeInTheDocument();
  });
});