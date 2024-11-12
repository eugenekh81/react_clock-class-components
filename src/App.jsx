import React from "react";
import "./App.css";
import { Clock } from "./components/clock";

function getRandomName() {
  const value = Date.now().toString().slice(-4);
  return `Clock-${value}`;
}

export class App extends React.Component {
  state = {
    clockName: "Clock-0",
    hasClock: true,
  };

  timerClockId = 0;

  handleClockHide = (event) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleClockShow = () => {
    this.setState({ hasClock: true });
  };

  componentDidMount() {
    this.timerClockId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    document.addEventListener("contextmenu", this.handleClockHide);
    document.addEventListener("click", this.handleClockShow);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");

    clearInterval(this.timerClockId);
    document.removeEventListener("contextmenu", this.handleClockHide);
    document.removeEventListener("click", this.handleClockShow);
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
}
