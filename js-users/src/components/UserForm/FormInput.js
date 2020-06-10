import React from "react";
import {
  Input,
  InputContainer,
  InputError,
  InputLabel,
} from "./UserForm.styles";
import PropTypes from "prop-types";

export default function FormInput({
  attribute,
  label,
  onChange,
  value,
  disabled,
  error,
  placeholder,
}) {
  return (
    <InputContainer>
      <InputLabel>
        {label}
        <Input
          value={value}
          onChange={(e) => onChange(attribute, e.currentTarget.value)}
          hasError={Boolean(error)}
          placeholder={placeholder}
          disabled={disabled}
        ></Input>
      </InputLabel>
      <InputError>{error}</InputError>
    </InputContainer>
  );
}

FormInput.propTypes = {
  attribute: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.arrayOf(PropTypes.string),
};
