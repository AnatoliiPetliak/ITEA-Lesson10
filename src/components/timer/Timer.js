import React, { Component } from "react";

class Timer extends Component {
  state = {
    isActive: false,
    currentCount: 60,
  };

  startTimer = () => {
    if (this.state.isActive) {
      clearInterval(this.currentTimerId);
      this.setState({ currentCount: 60 });
    }
    this.setState({ isActive: true });
    this.currentTimerId = setInterval(() => {
      this.setState({ currentCount: this.state.currentCount - 1 });
      if (this.state.currentCount === 0) {
        clearInterval(this.currentTimerId);
      }
    }, 1000);
  };

  render() {
    return <>{this.state.currentCount}</>;
  }
}

export default Timer;
