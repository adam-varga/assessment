import React from "react";
import { Input } from "./Form.styles";
import PropTypes from "prop-types";

const NUMBER_REGEXP = /^[0-9]*$/;

function testNumberValue(value) {
  return NUMBER_REGEXP.test(value) || value === "";
}

export default class NumberInput extends React.Component {
  handleInputChange = (event) => {
    const {
      currentTarget: { value },
    } = event;

    if (testNumberValue(value)) {
      this.props.onChange(event);
    }
  };

  render() {
    return (
      <Input
        onChange={this.handleInputChange}
        value={this.props.value}
        data-testid="number-input"
      />
    );
  }
}

NumberInput.propTypes = {
  value: function (props, propName, componentName) {
    if (typeof props.value !== "string") {
      return new Error(
        `Failed prop type: Invalid prop  \`${propName}\` of type  \`${typeof props.value}\` supplied to \`${componentName}\`, expected \`string\``
      );
    }

    if (!testNumberValue(props.value)) {
      return new Error(
        `Failed prop type: Invalid prop  \`${propName}\` supplied to \`${componentName}\`, expected characters to be only numbers ([0-9]).`
      );
    }
  },
  onChange: PropTypes.func.isRequired,
};
