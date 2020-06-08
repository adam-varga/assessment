import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserList from "./components/UserList/UserList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <UserList />
    </div>
  );
}

export default App;
