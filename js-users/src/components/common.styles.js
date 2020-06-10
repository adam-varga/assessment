import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyles = css`
  background-color: white;
  cursor: pointer;
  color: black;
  border: 1px solid black;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 10px;
  padding: 5px 10px;
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}
`;

export const Button = styled.button`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;
