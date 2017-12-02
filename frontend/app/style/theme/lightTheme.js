// @flow
import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

import './app.scss';

export default createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});
