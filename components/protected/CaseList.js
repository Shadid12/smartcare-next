import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { Button } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios'
import Router from 'next/router'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
      paddingTop: '50px',
      paddingLeft: '50px'
  },
  btnContainer: {
    marginRight: '10px'
  },
  btnMain: {
      borderRadius: '50px'
  }
});

class CaseList extends React.Component {

    state = {
        patients: [],
        requests: []
    }

componentDidMount() {
    axios.get('https://smartapinode.herokuapp.com/cases')
        .then((res) => {
            this.setState({patients: res.data.cases})
        })
    const token = window.localStorage.getItem('token');
    axios.get('https://smartapinode.herokuapp.com/cases/my', 
    { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            this.setState({requests: res.data.cases})
        })
}
  
render() {
    const { classes } = this.props;
    return (
        <div>
            <Grid 
                container 
                spacing={24}
                className={classes.container}
            >
                <Grid item xs={4}>
                    <Paper className={classes.root} elevation={1}>
                            <Typography variant="h5" component="h3">
                                Patients Seeking Care
                            </Typography>
                        {
                            this.state.patients.map((aPatient) => {
                                return(
                                    <ListItem>
                                        <IconButton 
                                            className={classes.btnMain}
                                            onClick={() => {
                                                Router.push(`/mainflow/users/profile?id=${aPatient._id}`)
                                            }}
                                        >
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                            <ListItemText 
                                                primary={`${aPatient.firstName} ${aPatient.lastName}`} 
                                                secondary="July 9, 1994" 
                                            />
                                        </IconButton>
                                        <Button variant="contained" className={classes.btnContainer}>
                                            Request
                                        </Button>
                                    </ListItem>
                                )
                            })
                        }
                    </Paper>
                </Grid>


                <Grid item xs={4}>
                    <Paper className={classes.root} elevation={1}>
                            <Typography variant="h5" component="h3">
                                Patients Requested Your Care
                            </Typography>
                        {
                            this.state.requests.map((aPatient) => {
                                return(
                                    <ListItem>
                                        <IconButton 
                                            className={classes.btnMain}
                                            onClick={() => {
                                                Router.push(`/mainflow/users/profile?id=${aPatient._id}`)
                                            }}
                                        >
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                            <ListItemText 
                                                primary={`${aPatient.firstName} ${aPatient.lastName}`} 
                                                secondary="July 9, 1994" 
                                            />
                                        </IconButton>
                                        <Button variant="contained" color="primary" className={classes.btnContainer}>
                                            Accept
                                        </Button>
                                        <Button variant="contained" color="secondary">
                                            Decline
                                        </Button>
                                    </ListItem>
                                )
                            })
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
      );
}
}

CaseList.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    const  { userRole, userId } = state
    return { userRole, userId }
}

export default connect(mapStateToProps)(withStyles(styles)(CaseList));