import styled, { css } from "styled-components";
import { Button } from "../common.styles";

export const Backdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Popover = styled.div`
  width: 500px;
  background: white;
  border: 1px solid black;
  padding: 50px;
`;

export const Title = styled.h2`
  margin: 0 0 20px;
`;

export const InputContainer = styled.div``;

export const InputLabel = styled.label`
  display: block;
  font-size: 10px;
`;

export const Input = styled.input`
  display: block;
  border: 1px solid black;
  ${(props) =>
    props.hasError &&
    css`
      border-color: red;
    `}
`;

export const InputError = styled.p`
  margin-top: 5px;
  color: red;
  font-size: 10px;
`;

export const ButtonContainer = styled.div`
  text-align: right;
`;

export const SaveButton = styled(Button)`
  margin-left: 10px;
`;

export const CancelButton = styled(Button)`
  border-color: #555;
  color: #555;
`;
