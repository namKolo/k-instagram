// @flow
import React, { Component } from 'react';

import { withStyles, Grid, Typography, CardHeader, Card, CardContent } from 'material-ui';

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

class HomePage extends Component<any> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container direction="column" className={classes.bodyContent}>
          <Grid item>
            <Card>
              <CardHeader title="Feature" />
              <CardContent>
                <Typography component="p" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader title="Change logs" />
              <CardContent>
                <Typography component="p" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
