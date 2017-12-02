// @flow
import React, { Component } from 'react';

import { withStyles, Grid } from 'material-ui';

import { SignUpForm } from 'component/Form';

const styles = theme => ({
  bodyContent: {
    height: 'calc(100vh - 64px)',
    margin: '20px auto',
    maxWidth: '1200px',
  },
  light: {
    fontWeight: theme.typography.fontWeightLight,
  },
});

class RegisterPage extends Component<any> {
  handleSignUp = (params: { username: string, password: string }) => {
    console.log(params);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container direction="column" className={classes.bodyContent}>
          <SignUpForm onSignUp={this.handleSignUp} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterPage);
