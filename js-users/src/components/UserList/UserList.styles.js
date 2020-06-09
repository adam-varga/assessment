import styled from "styled-components";

export const Item = styled.li`
  padding: 5px;
  margin-bottom: 5px;
  list-style: none;
`;

export const List = styled.ul``;

export const Container = styled.ul`
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
