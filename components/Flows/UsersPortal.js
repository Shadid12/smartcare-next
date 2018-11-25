import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

import {
    MdPeople
} from 'react-icons/md'

// action
import { 
    setUserRole
} from '../../store'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    root: {
        maxWidth: 200,
        backgroundColor: 'aliceblue',
        paddingLeft: '100px',
        paddingTop: '10px'
    }
  },
});

class UsersPortal extends React.Component {  
  state = {
      loading: false,
      listItems: []
  };

  componentDidMount() {
      const adminItems = [
            {
                _id: '1232130094',
                label: 'Patients'
            },
            {
                _id: '123020392',
                label: 'Doctors'
            },
            {
              _id: '1230122392',
              label: 'PSW'
            },
            {
              _id: '123020392',
              label: 'Other'
            }
      ]

      if(!this.props.userRole) {
          this.setState({ loading: true });
          // Get the thing from here
          const token = window.localStorage.getItem('token');
          axios.get('https://smartapinode.herokuapp.com/users/user-info', 
          { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                const {dispatch} = this.props;
                dispatch(setUserRole(res.data.user.role));

                if(res.data.user.role === 'admin' ) {
                    this.setState({ loading: false, listItems: adminItems });
                }
            })
      }
      if(this.props.userRole === 'admin') {
          this.setState({ listItems: adminItems });
      }
  }

  render() {
    const { classes } = this.props
    return (
        <div className={classes.root}>
            <List
            component="nav"
            subheader={<ListSubheader component="div">Select From Below</ListSubheader>}
            >
                {this.state.loading ? (
                    <CircularProgress className={classes.progress} color="secondary" />
                ) : 
                (
                    <div>
                        {
                            this.state.listItems.map((item) => {
                                const styles = {
                                    button: {
                                        padding: '10px',
                                        marginRight: '20px'
                                    },
                                    wrapper: {
                                        width: '50%'
                                    }
                                }
                                return (
                                    <div style={styles.wrapper}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <MdPeople />
                                            </ListItemIcon>
                                            <ListItemText inset primary={`${item.label}`} />
                                            <Button 
                                                variant="contained" 
                                                style={styles.button}
                                                onClick={() => {
                                                    Router.push(`/mainflow/users/new`)
                                                }}
                                            >
                                                Add
                                            </Button>
                                            <Button variant="contained" style={styles.button}>
                                                Remove
                                            </Button>
                                            <Button variant="contained" style={styles.button}>
                                                Edit
                                            </Button>
                                        </ListItem>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
                }
            </List>
        </div>
    );
  }
}

UsersPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    const  { userRole } = state
    return { userRole }
}

export default connect(mapStateToProps)(withStyles(styles)(UsersPortal));