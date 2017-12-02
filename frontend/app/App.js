// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

import { Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import AppBar from 'component/AppBar';

import Home from 'module/Home';
import About from 'module/About';
import LoginPage from 'module/Login';
import RegisterPage from 'module/Register';

import { lightTheme } from 'style/theme';

import { configureStore } from 'store';

import api from 'service/api';
import { history } from 'service/router';

const store = configureStore({}, { api: api.create() });

export default class App extends Component<any> {
  render() {
    return (
      <MuiThemeProvider theme={lightTheme}>
        <Provider {...{ store }}>
          <Router {...{ history }}>
            <div>
              <AppBar />
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
