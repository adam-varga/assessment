import React from "react";
import { Item } from "./UserList.styles";

export default class User extends React.Component {
  render() {
    const { first_name, last_name, created_at } = this.props;

    return <Item>{`${first_name} ${last_name}: ${new Date(created_at).toLocaleDateString()}`}</Item>;
  }
}
