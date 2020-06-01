import React from "react";
import {
  Container,
  Title,
  NumberInput,
  InputContainer,
  SubmitButton,
  ConvertedLarge,
  ConvertedSmall,
  ErrorMessage,
  ErrorMessageLarge,
} from "./Form.styles";
import convertNumber from "../number-conversion";

export default class Form extends React.Component {
  state = {
    inputValue: "",
    converted: null,
    error: null,
  };

  submit = () => {
    try {
      this.setState({
        converted: convertNumber(parseInt(this.state.inputValue)),
      });
    } catch (error) {
      this.setState({ converted: null, error: error.message });
    }
  };

  onInputChange = (event) => {
    this.setState({ inputValue: event.target.value, error: null });
  };

  render() {
    return (
      <React.Fragment>
        <ConvertedLarge>{this.state.converted}</ConvertedLarge>
        <ErrorMessageLarge>{this.state.error}</ErrorMessageLarge>
        <Container>
          <Title>
            If you're wondering how to say a number using English words, just
            enter it in the box and hit CONVERT!
          </Title>
          <InputContainer>
            <NumberInput
              value={this.state.inputValue}
              onChange={this.onInputChange}
            ></NumberInput>
            <SubmitButton onClick={this.submit}>Convert</SubmitButton>
          </InputContainer>
          {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
          <ConvertedSmall>{this.state.converted}</ConvertedSmall>
        </Container>
      </React.Fragment>
    );
  }
}
