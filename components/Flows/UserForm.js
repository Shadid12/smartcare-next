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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
      email: '',
      password: '',
      role: ''
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
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props
    const style = {
        wrapper: {
            paddingLeft: '50px',
            paddingTop: '10px',
            backgroundColor: 'aliceblue'
        }
    }
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
                    <div style={style.wrapper}>
                        <form className={classes.container} noValidate>
                            <div>
                            <TextField
                                label="Email"
                                className={classes.textField}
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                variant="outlined"
                            />
                            </div>

                            <div>
                            <TextField
                                label="Password"
                                type="password"
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                variant="outlined"
                            />
                            </div>

                            <div>

                                <InputLabel
                                    ref={ref => {
                                    this.InputLabelRef = ref;
                                    }}
                                    htmlFor="outlined-age-simple"
                                >
                                    Role
                                </InputLabel>
                                <Select
                                    value={this.state.role}
                                    onChange={(e) => {
                                        this.setState({ role: e.target.value })
                                    }}
                                    input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="role"
                                        id="outlined-age-simple"
                                    />
                                    }
                                >
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                    <MenuItem value={'nurse'}>Nurse</MenuItem>
                                    <MenuItem value={'patient'}>Patient</MenuItem>
                                    <MenuItem value={'pwa'}>PWA</MenuItem>
                                </Select>


                            </div>
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