// @flow

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, AppBar, Toolbar, Typography, Button } from 'material-ui';

type ProvidedProps = {
  classes: Object,
  history: Object,
  loggedIn: boolean,
};

type Props = {} & ProvidedProps;

const styles = () => ({
  flex: {
    flex: 1,
    cursor: 'pointer',
  },
});

function OurAppBar(props: Props) {
  const { classes, history, loggedIn } = props;

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          type="title"
          color="inherit"
          className={classes.flex}
          onClick={() => history.push('/')}
        >
          Notebook
        </Typography>
        {loggedIn && <div>Hello</div>}
        {!loggedIn && (
          <div>
            <Button color="contrast" onClick={() => history.push('/login')}>
              Login
            </Button>
            <Button color="contrast" onClick={() => history.push('/register')}>
              Sign up
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

const hoc = compose(
  withStyles(styles),
  withRouter,
  connect((state: Object) => ({
    loggedIn: state.authentication.loggedIn,
  })),
);
export default hoc(OurAppBar);
