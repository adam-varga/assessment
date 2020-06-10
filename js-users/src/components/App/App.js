import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserList from "../UserList/UserList";
import UserForm from "../UserForm/UserForm";
import { Container } from "./App.styles";

function App() {
  return (
    <Container>
      <Router>
        <Route path="/">
          <UserList />
        </Route>
        <Route
          path="/new"
          exact
          component={(props) => (
            <UserForm close={() => props.history.replace("/")} />
          )}
        ></Route>
        <Route
          path="/edit/:id"
          exact
          component={(props) => (
            <UserForm
              id={props.match.params.id}
              close={() => props.history.replace("/")}
            />
          )}
        ></Route>
      </Router>
    </Container>
  );
}

export default App;
