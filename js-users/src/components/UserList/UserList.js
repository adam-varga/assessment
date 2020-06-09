import React from "react";
import { connect } from "react-redux";
import { createAction, GET_USERS__REQUEST } from "../../store/actions";
import { List, Container } from "./UserList.styles";
import User from "./User";
import ReactPaginate from "react-paginate";

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
        {this.props.loading && "LOADING"}
        {this.props.users && (
          <React.Fragment>
            <List>
              {this.props.users
                .slice(startIndex, startIndex + 10)
                .map((user) => (
                  <User key={user.id} {...user}></User>
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

function mapStateToProps(state) {
  return {
    loading:
      state.requests[GET_USERS__REQUEST] &&
      state.requests[GET_USERS__REQUEST].loading,
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
