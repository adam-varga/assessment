import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createAction,
  GET_USERS__REQUEST,
  UPDATE_USER__REQUEST,
  CREATE_USER__REQUEST,
  UPDATE_USER__RESET,
  CREATE_USER__RESET,
} from "../../store/actions";
import {
  Backdrop,
  Popover,
  Title,
  ButtonContainer,
  SaveButton,
  Inputs,
  CancelButton,
} from "./UserForm.styles";
import { FiLoader, FiSave, FiCheck, FiX } from "react-icons/fi";
import FormInput from "./FormInput";
import get from "lodash.get";
import { USER_STATUSES, REQUEST_STATUSES } from "../../constants";

const MODES = {
  EDIT: "EDIT",
  CREATE: "CREATE",
};

const saveButtonIcons = {
  default: FiSave,
  [REQUEST_STATUSES.PENDING]: FiLoader,
  [REQUEST_STATUSES.SUCCESS]: FiCheck,
};

class UserForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
  };

  componentDidMount() {
    this.props.resetSaveRequest();

    const { id, userRequestStatus, user } = this.props;

    if (id && userRequestStatus === REQUEST_STATUSES.SUCCESS && user) {
      this.setState({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { id, userRequestStatus, user, saveRequestStatus } = this.props;

    if (
      id &&
      userRequestStatus === REQUEST_STATUSES.SUCCESS &&
      prevProps.userRequestStatus === REQUEST_STATUSES.PENDING &&
      user
    ) {
      this.setState({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }

    if (
      saveRequestStatus === REQUEST_STATUSES.SUCCESS &&
      prevProps.saveRequestStatus === REQUEST_STATUSES.PENDING
    ) {
      setTimeout(this.close, 1500);
    }
  }

  close = () => {
    this.props.resetSaveRequest();
    this.props.close();
  };

  createUser = () => {
    this.props.createUser({
      ...this.state,
      status: USER_STATUSES.ACTIVE,
    });
  };

  updateUser = () => {
    this.props.updateUser({
      ...this.props.user,
      ...this.state,
    });
  };

  onInputChange = (attribute, value) => {
    this.setState({
      [attribute]: value,
    });
  };

  render() {
    const { id, saveRequestStatus, userRequestStatus, errors } = this.props;
    const mode = Boolean(id) ? MODES.EDIT : MODES.CREATE;

    const isLoading = id && userRequestStatus === REQUEST_STATUSES.PENDING;
    const formDisabled =
      saveRequestStatus === REQUEST_STATUSES.PENDING ||
      saveRequestStatus === REQUEST_STATUSES.SUCCESS;

    const SaveButtonIcon =
      saveButtonIcons[saveRequestStatus] || saveButtonIcons["default"];

    return (
      <Backdrop onClick={this.close}>
        <Popover onClick={(e) => e.stopPropagation()}>
          <Title>{mode === MODES.EDIT ? "Edit user" : "Create user"}</Title>
          {isLoading && "Loading..."}
          {!isLoading && (
            <React.Fragment>
              <Inputs>
                <FormInput
                  label="First name"
                  placeholder="Enter first name"
                  attribute="first_name"
                  onChange={this.onInputChange}
                  value={this.state.first_name}
                  error={get(errors, "first_name")}
                  disabled={formDisabled}
                ></FormInput>

                <FormInput
                  label="Last name"
                  placeholder="Enter last name"
                  attribute="last_name"
                  onChange={this.onInputChange}
                  value={this.state.last_name}
                  error={get(errors, "last_name")}
                  disabled={formDisabled}
                ></FormInput>
              </Inputs>
              <ButtonContainer>
                <CancelButton onClick={this.close}>
                  <FiX />
                </CancelButton>
                <SaveButton
                  disabled={formDisabled}
                  loading={saveRequestStatus === REQUEST_STATUSES.PENDING}
                  onClick={
                    mode === MODES.EDIT ? this.updateUser : this.createUser
                  }
                >
                  <SaveButtonIcon />
                </SaveButton>
              </ButtonContainer>
            </React.Fragment>
          )}
        </Popover>
      </Backdrop>
    );
  }
}

UserForm.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }),
  userRequestStatus: PropTypes.oneOf(Object.values(REQUEST_STATUSES)),
  saveRequestStatus: PropTypes.oneOf(Object.values(REQUEST_STATUSES)),
  saving: PropTypes.bool,
  id: PropTypes.string,
  close: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    user: get(state, `users.usersById.${ownProps.id}`),
    userRequestStatus: get(state, `requests.${GET_USERS__REQUEST}.status`),
    saveRequestStatus: get(
      state,
      `requests.${
        ownProps.id ? UPDATE_USER__REQUEST : CREATE_USER__REQUEST
      }.status`
    ),
    errors: get(
      state,
      `requests.${
        ownProps.id ? UPDATE_USER__REQUEST : CREATE_USER__REQUEST
      }.error`
    ),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    createUser: (user) => dispatch(createAction(CREATE_USER__REQUEST, user)),
    updateUser: (user) => dispatch(createAction(UPDATE_USER__REQUEST, user)),
    resetSaveRequest: () =>
      dispatch(
        createAction(ownProps.id ? UPDATE_USER__RESET : CREATE_USER__RESET)
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
