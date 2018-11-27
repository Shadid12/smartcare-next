import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import SearchTable from './SearchTable';

// action
import { 
    setUserRole
} from '../../store'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'aliceblue',
        paddingLeft: '100px',
        paddingTop: '10px'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
  },
});

class ActionPortal extends React.Component {  
  state = {
      loading: false,
      listItems: []
  };

  componentDidMount() {
      const adminItems = [
            {
                _id: '1232130094',
                label: 'Settings',
                link: '/mainflow/main'
            },
            {
                _id: '123020392',
                label: 'Users',
                link: '/mainflow/users'
            },
            {
              _id: '1230122392',
              label: 'Billings',
              link: '/mainflow/main'
            },
            {
              _id: '123020392',
              label: 'Forms',
              link: '/admin'
            },
            {
              _id: '123020392',
              label: 'Scheduling',
              link: '/mainflow/main'
            }
      ]
      const nurseItems = [
        {
            _id: '123232194',
            label: 'Add New Patient',
            link: '/mainflow/main'
        },
        {
            _id: '123232194',
            label: 'Assesments',
            link: '/mainflow/assements'
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

                if(res.data.user.role === 'nurse' ) {
                    this.setState({ loading: false, listItems: nurseItems });
                }
            })
      }
      if(this.props.userRole === 'admin') {
          this.setState({ listItems: adminItems });
      }
      if(this.props.userRole === 'nurse') {
          this.setState({ listItems: nurseItems });
      }
  }

  render() {
    const { classes } = this.props
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                    <List
                        component="nav"
                        subheader={<ListSubheader component="div">Action Items</ListSubheader>}
                    >
                            {this.state.loading ? (
                                <CircularProgress className={classes.progress} color="secondary" />
                            ) : 
                            (
                                <div>
                                    {
                                        this.state.listItems.map((item) => {
                                            return (
                                                <div>
                                                    <ListItem button onClick={
                                                        () => {
                                                            Router.push(`${item.link}`);
                                                        }
                                                    }>
                                                        <ListItemIcon>
                                                            <SendIcon />
                                                        </ListItemIcon>
                                                        <ListItemText inset primary={`${item.label}`} />
                                                    </ListItem>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                            }
                    </List>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                    {
                        this.props.userRole === 'nurse' ? (
                            <SearchTable />
                        ) : (
                            <div>Admin Portal Will Go here</div>
                        )
                    }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
  }
}

ActionPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    const  { userRole } = state
    return { userRole }
}

export default connect(mapStateToProps)(withStyles(styles)(ActionPortal));