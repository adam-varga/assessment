import React from "react";
import PropTypes from "prop-types";
import {
  Item,
  Info,
  ToggleUserStatusButton,
  Actions,
  EditButton,
} from "./UserList.styles";
import { connect } from "react-redux";
import { createAction, UPDATE_USER__REQUEST } from "../../store/actions";
import { USER_STATUSES, REQUEST_STATUSES } from "../../constants";
import get from "lodash.get";

const statusButtonTextMap = {
  [USER_STATUSES.LOCKED]: "Activate",
  [USER_STATUSES.ACTIVE]: "Lock",
};

class User extends React.Component {
  render() {
    const { first_name, last_name, created_at, status, id } = this.props.user;

    return (
      <Item>
        <Info {...this.props.user}>
          {`${first_name} ${last_name}: ${new Date(
            created_at
          ).toLocaleDateString()}`}
        </Info>
        <Actions>
          <ToggleUserStatusButton
            status={status}
            onClick={this.props.toggleUserStatus}
            disabled={this.props.requestStatus === REQUEST_STATUSES.PENDING}
          >
            {statusButtonTextMap[status]}
          </ToggleUserStatusButton>
          <EditButton
            to={`/edit/${id}`}
            disabled={this.props.requestStatus === REQUEST_STATUSES.PENDING}
          >
            Edit
          </EditButton>
        </Actions>
      </Item>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(USER_STATUSES)).isRequired,
  }).isRequired,
  requestStatus: PropTypes.oneOf(Object.values(REQUEST_STATUSES)),
  toggleUserStatus: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    requestStatus: get(state, `requests.${UPDATE_USER__REQUEST}.status`),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleUserStatus: () =>
      dispatch(
        createAction(UPDATE_USER__REQUEST, {
          ...ownProps.user,
          status:
            ownProps.user.status === USER_STATUSES.LOCKED
              ? USER_STATUSES.ACTIVE
              : USER_STATUSES.LOCKED,
        })
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
