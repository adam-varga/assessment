import React from "react";
import PropTypes from "prop-types";
import {
  Item,
  Info,
  ToggleUserStatusButton,
  Actions,
  EditButton,
  Name,
  CreatedAt,
} from "./UserList.styles";
import { connect } from "react-redux";
import { createAction, UPDATE_USER__REQUEST } from "../../store/actions";
import { USER_STATUSES, REQUEST_STATUSES } from "../../constants";
import { FiUnlock, FiLock, FiEdit2 } from "react-icons/fi";
import get from "lodash.get";

const statusButtonIconMap = {
  [USER_STATUSES.LOCKED]: FiUnlock,
  [USER_STATUSES.ACTIVE]: FiLock,
};

class User extends React.Component {
  render() {
    const { first_name, last_name, created_at, status, id } = this.props.user;

    const StatusButtonIcon = statusButtonIconMap[status];

    return (
      <Item>
        <Info {...this.props.user}>
          <Name>{`${first_name} ${last_name}`}</Name>
          <CreatedAt>{new Date(created_at).toLocaleDateString()}</CreatedAt>
        </Info>
        <Actions>
          <ToggleUserStatusButton
            status={status}
            active={status === USER_STATUSES.LOCKED}
            onClick={this.props.toggleUserStatus}
            disabled={this.props.requestStatus === REQUEST_STATUSES.PENDING}
          >
            <StatusButtonIcon />
          </ToggleUserStatusButton>
          <EditButton
            to={`/edit/${id}`}
            disabled={this.props.requestStatus === REQUEST_STATUSES.PENDING}
          >
            <FiEdit2 />
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
