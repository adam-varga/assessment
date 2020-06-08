import React from "react";
import { connect } from "react-redux";
import { createAction, GET_USERS__REQUEST } from "../../store/actions";

class UserList extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        {this.props.loading && "LOADING"}
        {this.props.users &&
          this.props.users.map((user) => <div key={user.id}>{user.id}</div>)}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading:
      state.requests[GET_USERS__REQUEST] &&
      state.requests[GET_USERS__REQUEST].loading,
    users:
      state.users.userIds &&
      state.users.userIds.map((id) => state.users.usersById[id]),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getUsers: () => dispatch(createAction(GET_USERS__REQUEST)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
