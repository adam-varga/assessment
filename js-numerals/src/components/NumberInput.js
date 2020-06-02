import React from "react";
import { Input } from "./Form.styles";

export default class NumberInput extends React.Component {
  handleInputChange = (event) => {
    const {
      currentTarget: { value },
    } = event;

    if (/^[0-9]*$/.test(value) || value === "") {
      const { onChange } = this.props;

      onChange && typeof onChange === "function" && onChange(event);
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
