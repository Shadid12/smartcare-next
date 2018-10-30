import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
      paddingTop: '50px',
      paddingLeft: '50px'
  }
});

function QuickLinks(props) {
  const { classes } = props;

  return (
    <div>
        <Grid 
            container 
            spacing={24}
            className={classes.container}
        >
            <Grid item xs={3}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Patients
                    </Typography>
                    <Button color="secondary" className={classes.button}>
                        View
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Referals
                    </Typography>
                    <Button color="secondary" className={classes.button}>
                        View
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Assestments
                    </Typography>
                    <Button color="secondary" className={classes.button}>
                        View
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}

QuickLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuickLinks);