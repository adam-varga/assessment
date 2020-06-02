import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "./Form";

import * as convertNumber from "../number-conversion/convertNumber";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<Form />);

  expect(asFragment()).toMatchSnapshot();
});

it("only accepts numbers in number input", () => {
  const { getByTestId } = render(<Form />);

  const numberInput = getByTestId("number-input");

  fireEvent.change(numberInput, { target: { value: "sda" } });
  expect(numberInput.value).toBe("");

  fireEvent.change(numberInput, { target: { value: "4021" } });
  expect(numberInput.value).toBe("4021");

  fireEvent.change(numberInput, { target: { value: "4021s" } });
  expect(numberInput.value).toBe("4021");

  fireEvent.change(numberInput, { target: { value: "40212" } });
  expect(numberInput.value).toBe("40212");
});

it("calls convertNumber with number input on submit button click", () => {
  const { getByTestId } = render(<Form />);

  convertNumber.default = jest.fn();

  const numberInput = getByTestId("number-input");
  const submitButton = getByTestId("submit-button");

  fireEvent.change(numberInput, { target: { value: "4021" } });
  fireEvent(
    submitButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(convertNumber.default).toHaveBeenCalledWith(4021);
});

it("displays converted number text on submit button click", () => {
  const { getByTestId } = render(<Form />);

  convertNumber.default = jest.fn((N) => `${N}_converted`);

  const numberInput = getByTestId("number-input");
  const submitButton = getByTestId("submit-button");
  const convertedText = getByTestId("converted");

  expect(convertedText.textContent).toBe("");

  fireEvent.change(numberInput, { target: { value: "1999" } });

  fireEvent(
    submitButton,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  expect(convertedText.textContent).toBe("1999_converted");
});

describe("error message", () => {
  let numberInput;
  let submitButton;
  let convertedText;
  let getByTestId;
  let queryByTestId;

  beforeEach(() => {
    const renderResult = render(<Form />);

    getByTestId = renderResult.getByTestId;
    queryByTestId = renderResult.queryByTestId;

    numberInput = getByTestId("number-input");
    submitButton = getByTestId("submit-button");
    convertedText = getByTestId("converted");

    convertNumber.default = jest.fn(() => {
      throw new Error("Test error");
    });

    fireEvent.change(numberInput, { target: { value: "1999" } });

    fireEvent(
      submitButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  it("displays error message if convertNumber throws", () => {
    const errorMessage = getByTestId("error");

    expect(convertedText.textContent).toBe("");
    expect(errorMessage.textContent).toBe("Test error");
  });

  it("hides error if input value is changed after error", () => {
    fireEvent.change(numberInput, { target: { value: "19991" } });

    expect(queryByTestId("error")).toBeFalsy();
  });
});
