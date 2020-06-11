import styled, { css, keyframes } from "styled-components";
import { Button } from "../common.styles";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const shake = keyframes`
    20%, 80% {
      transform: translate3d(-1px, 0, 0);
    }
    
    40% {
        
      transform: translate3d(2px, 0, 0);
    }

    60% {
      transform: translate3d(-3px, 0, 0);
    }
  `;

const popoverEnter = keyframes`
0% {
  transform:  translateY(100vw) scale(1);
}
`;

export const Backdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const Popover = styled.div`
  width: 500px;
  /* height: 500px; */
  background: white;
  padding: 50px;
  background: #deddde;
  border-radius: 50px;
  box-shadow: 30px 30px 150px #a4a4a4;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* opacity: 0; */
  animation: ${popoverEnter} 0.3s ease-in-out forwards;
`;

export const Title = styled.h2`
  color: #cacaca;
  text-transform: uppercase;
  font-size: 2rem;
`;

export const Inputs = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  span {
    display: block;
    margin-bottom: 5px;
  }
`;

export const Input = styled.input`
  display: block;
  border: 0;
  border-radius: 10px;
  background: #deddde;
  box-shadow: inset 3px 3px 5px #bababa,
    inset -3px -3px 5px rgba(255, 255, 255, 0.6);
  height: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  ${(props) =>
    props.hasError &&
    css`
      animation: ${shake} 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
    `}
`;

export const InputError = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  color: #ff4b5a;
  font-size: 0.9rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 15px;
  text-align: right;
`;

export const SaveButton = styled(Button)`
  margin-left: 10px;
  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const CancelButton = styled(Button)`
  border-color: #555;
  color: #555;
`;
