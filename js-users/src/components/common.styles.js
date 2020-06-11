import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const buttonStyles = css`
  cursor: pointer;
  color: #595563;
  text-decoration: none;
  font-size: 0.9rem;
  border: 0;
  border-radius: 50px;
  background: #deddde;
  box-shadow: 4px 4px 14px #bababa, -4px -4px 14px rgba(255, 255, 255, 0.8);
  height: 40px;
  min-width: 40px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out;
  user-select: none;
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  ${(props) =>
    props.active
      ? css`
          box-shadow: inset 5px 5px 10px #d9d7d5,
            inset -5px -5px 10px rgba(255, 255, 255, 0.8);
        `
      : css`
          &:hover:not(:active) {
            opacity: 0.7;
          }
        `}

  &:active {
    box-shadow: inset 5px 5px 10px #d9d7d5,
      inset -5px -5px 10px rgba(255, 255, 255, 0.8);
  }
`;

export const Button = styled.button`
  ${buttonStyles}
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;
