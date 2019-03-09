
// External Modules
import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Grommet} from 'grommet';

// Internal Components and CSS
import Appbar from './components/Appbar/Appbar';
import Users from './pages/Users/Users';
import User from './pages/User/User';
import Home from './pages/Home/Home';
import calc from './pages/Calc/Calc';

class App extends Component {
  render() {
    return (
      <Router>
        <Grommet theme={theme}>
          <Appbar />
          <Switch>
            <Route path="/calc" component={calc} />
            <Route path="/users/:user" component={User} />
            <Route path="/users" component={Users} />
            <Route path="/" component={Home} />
          </Switch>
        </Grommet>
      </Router>
    );
  }
}

const theme = {
  global: {
    color: {
      brand: "#7D4CDB",
      grayBox: "#EBE7F3",
      blackText: "#454545"
    },
    font: {
      family: 'Lato',
      size: '14px',
      height: '20px',
    },
  },
};

export default App;
