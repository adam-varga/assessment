import styled, { css, keyframes } from "styled-components";
import { USER_STATUSES } from "../../constants";
import { Button, ButtonLink, buttonStyles } from "../common.styles";

const titleEnter = keyframes`
from {
  opacity: 0;
  transform: translateX(-100vw);
}
to {
  opacity: 1;
}
`;

const enterUp = keyframes`
from {
  transform: translateY(30px);
}
to {
  opacity: 1;
}
`;

const fadeIn = keyframes`
to {
  opacity: 1;
}
`;

const delays = {
  title: 0.5,
  list: 1.3,
  newButton: 1.5,
  pagination: 1.7,
};

export const Title = styled.h1`
  pointer-events: none;
  color: #d8d8d8;
  text-transform: uppercase;
  top: 0;
  position: fixed;
  left: 0;
  height: 100%;
  font-size: 33vw;
  padding-left: 10vw;
  overflow: hidden;
  opacity: 0;
  animation: ${titleEnter} 0.4s ease-in-out forwards;
  animation-delay: ${delays.title}s;
`;

export const Info = styled.div`
  flex-grow: 1;
  ${(props) =>
    props.status === USER_STATUSES.LOCKED &&
    css`
      text-decoration: line-through;
      opacity: 0.5;
    `}
`;

export const Name = styled.p`
  font-weight: bold;
  margin: 0;
  font-size: 1rem;
  margin-bottom: 3px;
`;

export const CreatedAt = styled.p`
  font-size: 0.9rem;
  opacity: 0.5;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const EditButton = styled(ButtonLink)`
  margin-left: 16px;

  @media (min-width: 769px) {
    background: #f1bce8;
    box-shadow: 4px 4px 14px #ca9ec3, -4px -4px 14px #ffdaff;
    &:active {
      background: #f1bce8;
      box-shadow: inset 4px 4px 14px #d2a4ca, inset -4px -4px 14px #ffd4ff;
    }
  }
`;

export const ToggleUserStatusButton = styled(Button)`
  @media (min-width: 769px) {
    background: #f1bce8;
    box-shadow: 4px 4px 14px #ca9ec3, -4px -4px 14px #ffdaff;
    &:active {
      background: #f1bce8;
      box-shadow: inset 4px 4px 14px #d2a4ca, inset -4px -4px 14px #ffd4ff;
    }
    ${(props) =>
      props.active &&
      css`
        background: #f1bce8;
        box-shadow: inset 4px 4px 14px #d2a4ca, inset -4px -4px 14px #ffd4ff;
      `}
  }
`;

export const Item = styled.li`
  padding: 10px 20px 10px 40px;
  list-style: none;
  display: flex;
  border-radius: 30px;
  background-position: 0;
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.2s ease-in-out forwards;
  animation-delay: 0.1s;

  @media (max-width: 768px) {
    padding: 5px 10px 5px 20px;
  }

  @media (min-width: 769px) {
    ${Actions} {
      opacity: 0;
    }
    &:hover {
      background-image: linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%);
      box-shadow: inset 4px 4px 14px rgba(0, 0, 0, 0.15),
        inset -4px -4px 14px rgba(255, 255, 255, 0.2);
      color: black;
      ${Actions} {
        opacity: 1;
      }
    }
  }
`;

export const NewButton = styled(ButtonLink)`
  margin-bottom: 10px;
  opacity: 0;
  font-size: 1.2rem;
  animation: ${fadeIn} 0.2s ease-in-out forwards;
  animation-delay: ${delays.newButton}s;
`;

export const List = styled.ul`
  padding: 0;
  opacity: 0;
  animation: ${fadeIn} 0.2s ease-in-out forwards;
  animation-delay: ${delays.list}s;
  @media (max-width: 768px) {
    margin-bottom: 100px;
  }
`;

export const Container = styled.div`
  margin-top: 70px;
  position: relative;
  z-index: 1;

  .pagination {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    animation: ${fadeIn} 0.2s ease-in-out forwards;
    animation-delay: ${delays.pagination}s;
    @media (max-width: 768px) {
      justify-content: flex-start;
      width: 100%;
      overflow-x: scroll;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20px;
      margin-bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(222, 221, 222, 1) 49%,
        rgba(222, 221, 222, 1) 100%
      );
      
    }

    li {
      list-style: none;
      display: inline-block;
      margin: 8px;
      @media (max-width: 768px) {
        margin: 5px;
      }
      a {
        ${buttonStyles}
      }
      &.active {
        a {
          border: 3px solid #deddde;
          background-image: linear-gradient(90deg, #c09eda 0%, #fbc2eb 100%);
          color: #302e35;
          &:hover {
            opacity: 1;
          }
        }
      }
    }

    @media (max-width: 768px) {
      margin-top: 25px;
    }
  }
`;
