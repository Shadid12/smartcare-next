import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import { Button } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import axios from 'axios'

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
  }
});

class CaseList extends React.Component {

    state = {
        patients: []
    }

componentDidMount() {
    axios.get('https://smartapinode.herokuapp.com/users/patients')
        .then((res) => {
            this.setState({patients: res.data.patients})
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
                <Grid item xs={6}>
                    <Paper className={classes.root} elevation={1}>
                        {
                            this.state.patients.map((aPatient) => {
                                return(
                                    <ListItem>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                        <ListItemText 
                                            primary={`${aPatient.firstName} ${aPatient.lastName}`} 
                                            secondary="July 9, 1994" 
                                        />
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
    const  { userRole } = state
    return { userRole }
}

export default connect(mapStateToProps)(withStyles(styles)(CaseList));