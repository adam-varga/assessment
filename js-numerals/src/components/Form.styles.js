import styled from "styled-components";
import React from "react";

export const Container = styled.div`
  padding: 50px;
  background: white;
  border: 1px solid black;
  border-radius: 0;
  box-shadow: none;
  width: 400px;
  height: 400px;
  margin: 50px;
  text-align: left;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 0;
`;

export const InputContainer = styled.div`
  display: flex;
  margin: 20px 0;
`;

const Input = styled.input`
  display: block;
  border-radius: 0;
  padding: 15px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid black;
  flex-grow: 1;
  height: 100%;
  &:focus {
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  border: 1px solid black;
  border-left: none;
  background-color: #eee;
  font-size: 11px;
  text-transform: uppercase;
  cursor: pointer;
  color: black;
  &:focus {
    outline: none;
  }
`;

export class NumberInput extends React.Component {
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
    return <Input onChange={this.handleInputChange} value={this.props.value} />;
  }
}

export const ConvertedSmall = styled.span`
  flex-grow: 1;
  bottom: 0;
  right: 0;
  color: blue;
  font-size: 16px;
  color: blue;
  padding: 0 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
`;

export const ConvertedLarge = styled.h1`
  position: fixed;
  bottom: 0;
  left: 100%;
  transform-origin: bottom left;
  transform: rotate(-90deg);
  font-size: 180px;
  width: 100vh;
  text-align: left;
  margin: 0;
  line-height: 0.7;

  @supports (-webkit-text-stroke: 1px blue) {
    & {
      -webkit-text-stroke: 1px blue;
      -webkit-text-fill-color: transparent;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0;
  font-size: 14px;
`;

export const ErrorMessageLarge = styled.h1`
  position: fixed;
  bottom: 0;
  left: 100%;
  transform-origin: bottom left;
  transform: rotate(-90deg);
  font-size: 180px;
  width: 100vh;
  text-align: left;
  margin: 0;
  line-height: 0.7;

  @supports (-webkit-text-stroke: 1px red) {
    & {
      -webkit-text-stroke: 1px red;
      -webkit-text-fill-color: transparent;
    }
  }
`;
