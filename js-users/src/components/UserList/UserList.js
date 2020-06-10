import React from "react";
import { connect } from "react-redux";
import { createAction, GET_USERS__REQUEST } from "../../store/actions";
import { List, Container, NewButton, Actions } from "./UserList.styles";
import User from "./User";
import ReactPaginate from "react-paginate";
import { USER_STATUSES, REQUEST_STATUSES } from "../../constants";
import get from "lodash.get";
import PropTypes from "prop-types";

class UserList extends React.Component {
  state = {
    startIndex: 0,
  };

  componentDidMount() {
    this.props.getUsers();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10);

    this.setState({ startIndex: offset });
  };

  render() {
    const { startIndex } = this.state;

    return (
      <Container>
        {!this.props.status ||
          (this.props.status === REQUEST_STATUSES.PENDING && "Loading...")}
        {this.props.users && (
          <React.Fragment>
            <Actions>
              <NewButton to="/new">+ New</NewButton>
            </Actions>
            <List>
              {this.props.users
                .slice(startIndex, startIndex + 10)
                .map((user) => (
                  <User key={user.id} user={user}></User>
                ))}
            </List>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(this.props.users.length / 10)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </React.Fragment>
        )}
      </Container>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(Object.values(USER_STATUSES)).isRequired,
    })
  ),
  status: PropTypes.oneOf(Object.values(REQUEST_STATUSES)),
  getUsers: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    status: get(state, `requests.${GET_USERS__REQUEST}.status`),
    users:
      state.users.userIds &&
      state.users.userIds.map((id) => state.users.usersById[id]),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(createAction(GET_USERS__REQUEST)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
