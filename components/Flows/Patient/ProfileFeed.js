import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link'
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
      paddingTop: '5px',
      paddingLeft: '15px'
  },
  link: {
      padding: '5px'
  },
  postBtn: {
    marginTop: '30px',
    width: '20px',
    height: '20px'
  }
});

export class ProfileFeed extends React.Component {
  state = {

  }

  render() {
    const { classes } = this.props
    return (
        <div>
            <Grid 
                container 
                spacing={24}
                className={classes.container}
            >
                <Grid item xs={10}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Quick actions
                        </Typography>
                        <Typography component="p">
                            <Link href="/mainflow/patient-profile">
                                <a className={classes.link}>Status Updates</a>
                            </Link>
                            <Link href="/mainflow/patient-profile">
                                <a className={classes.link} >Assesments</a>
                            </Link>
                            <Link href="/mainflow/patient-profile">
                                <a className={classes.link} > Request Apointment</a>
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid 
                container 
                spacing={24}
                className={classes.container}
            >
                <Grid item xs={10}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Test Results Ready
                        </Typography>
                        <Typography component="p">
                            You do not have any test results
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid 
                container 
                spacing={24}
                className={classes.container}
            >
                <Grid item xs={10}>
                    <Paper className={classes.root} elevation={1}>
                        <TextField 
                            label="What's in your mind"
                            fullWidth
                        />
                        <Button 
                            className={classes.postBtn}
                            variant="contained" 
                            color="primary">
                            POST
                        </Button>
                    </Paper>
                </Grid>
            </Grid>


            <Grid 
                container 
                spacing={24}
                className={classes.container}
            >
                <Grid item xs={10}>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Schedule an Apointment
                        </Typography>
                        <Button variant="contained" color="primary">
                            Schedule
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
      );
  }
}

ProfileFeed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileFeed);