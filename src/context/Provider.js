import React from 'react';
import MyContext from './context';

class Provider extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: {
        redCar: false,
        blueCar: false,
        yellowCar: false,
      },
      signal: {
        color: 'red',
      }
    };
    this.moveCar = this.moveCar.bind(this);
    this.changeSignal = this.changeSignal.bind(this);
  }
  
  moveCar(color, moveCar) {
    this.setState((prevState) => ({
      cars: {
        ...prevState.cars,
        [`${color}Car`]: moveCar
      }
    }))
  }

  changeSignal(color) {
    this.setState({
      signal: {
        color: color,
      }
    })
  }

  render() {
    const { children } = this.props;
    const stateObj = ({
      ...this.state,
      'moveCar': this.moveCar,
      'changeSignal': this.changeSignal
    });
    return(
      <MyContext.Provider value={ stateObj }>
        {children}
      </MyContext.Provider>
    );
  }
}

export default Provider;
