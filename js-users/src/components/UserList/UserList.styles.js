import styled, { css } from "styled-components";
import { USER_STATUSES } from "../../constants";
import { Button, ButtonLink } from "../common.styles";

export const Item = styled.li`
  padding: 5px;
  margin-bottom: 5px;
  list-style: none;
  display: flex;
`;

export const Info = styled.div`
  flex-grow: 1;
  ${(props) =>
    props.status === USER_STATUSES.LOCKED &&
    css`
      text-decoration: line-through;
      color: #aaa;
    `}
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const EditButton = styled(ButtonLink)`
  margin-left: 10px;
`;

export const ToggleUserStatusButton = styled(Button)`
  ${(props) =>
    props.status === USER_STATUSES.LOCKED
      ? css`
          color: green;
          border-color: green;
        `
      : css`
          color: red;
          border-color: red;
        `}
`;

export const NewButton = styled(ButtonLink)`
  margin-bottom: 10px;
`;

export const List = styled.ul`
  padding: 0;
`;

export const Container = styled.div`
  .pagination {
    margin-top: 10px;
    li {
      list-style: none;
      display: inline-block;
      margin: 3px;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 30px;
        padding: 0 5px;
        height: 30px;
        color: black;
        border: 1px solid transparent;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
      &.active {
        a {
          border-color: black;
        }
      }
    }
  }
`;
