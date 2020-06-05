import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Zipcode from "./Zipcode";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ReactJS with APIs</h1>
        <Zipcode />
      </div>
    );
  }
}
export default App;
