import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

class UserForm extends React.Component {  
  state = {
      loading: false,
      email: ''
  };

  componentDidMount() {
      if(!this.props.userRole) {
          this.setState({ loading: true });
          // Get the thing from here
          const token = window.localStorage.getItem('token');
          axios.get('https://smartapinode.herokuapp.com/users/user-info', 
          { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                console.log('Shome me the response', res.data);
                const {dispatch} = this.props;
                dispatch(setUserRole(res.data.user.role));

                if(res.data.user.role === 'admin' ) {
                    this.setState({ loading: false });
                }
            })
      }
      if(this.props.userRole === 'admin') {
          this.setState({ listItems: adminItems });
      }
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

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
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="outlined-name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                variant="outlined"
                            />
                        </form>
                    </div>
                )
                }
            </List>
        </div>
    );
  }
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    const  { userRole } = state
    return { userRole }
}

export default connect(mapStateToProps)(withStyles(styles)(UserForm));