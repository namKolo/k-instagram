import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';

import 'typeface-roboto';
import 'normalize.css';

import App from './App';

class AppWrapper {
  constructor() {
    render(
      <AppContainer>
        <App />
      </AppContainer>,
      document.getElementById('main'),
    );

    if (module.hot) {
      module.hot.accept('./App', () => {
        require('./App');

        render(
          <AppContainer>
            <App />
          </AppContainer>,
          document.getElementById('main'),
        );
      });
    }
  }
}

export default new AppWrapper();
