import React from "react";
import {
  Container,
  Title,
  InputContainer,
  SubmitButton,
  ConvertedLarge,
  ConvertedSmall,
  ErrorMessage,
  ErrorMessageLarge,
} from "./Form.styles";
import NumberInput from "./NumberInput";
import convertNumber from "../number-conversion/convertNumber";

export default class Form extends React.Component {
  state = {
    inputValue: "",
    converted: null,
    error: null,
  };

  submit = () => {
    try {
      const converted = convertNumber(parseInt(this.state.inputValue));

      this.setState({
        converted,
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
            <SubmitButton onClick={this.submit} data-testid="submit-button">
              Convert
            </SubmitButton>
          </InputContainer>
          {this.state.error && <ErrorMessage data-testid='error'>{this.state.error}</ErrorMessage>}
          <ConvertedSmall data-testid='converted'>{this.state.converted}</ConvertedSmall>
        </Container>
      </React.Fragment>
    );
  }
}
