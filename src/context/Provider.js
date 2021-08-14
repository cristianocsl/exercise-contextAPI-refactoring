import React from 'react';
import MyContext from './MyContext';


class Provider extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: {
        red: false,
        blue: false,
        yellow: false,
      },
    };
    this.moveCar = this.moveCar.bind(this);
  }

  moveCar(car, side) {
    this.setState(
      {
      cars: {
        ...this.state.cars,
        [car]: side }
      }
    )
  }

  render() {
    const stateObj = { ...this.state, 'moveCar': this.moveCar }
    const { children } = this.props;
    return(
    <MyContext.Provider value={ stateObj }>
      { children }
    </MyContext.Provider>
    );
  }
}

export default Provider;
