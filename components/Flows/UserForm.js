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

class UserForm extends React.Component {  
  state = {
      loading: false,
      email: '',
      password: '',
      role: '',
      ren: '',
      firstName: '',
      lastName: ''
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

  submit = () => {
    this.setState({loading: true});

    const token = window.localStorage.getItem('token');
    axios.post('https://smartapinode.herokuapp.com/users/signup', {
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        ren: this.state.ren
    },
    {
        headers: {"Authorization" : `Bearer ${token}`}
    }
    ).then((res) => {
        console.log('---->', res.data);
        Router.push(`/mainflow/users/nurses`);
    })
  }

  render() {
    const { classes } = this.props
    const style = {
        wrapper: {
            paddingLeft: '50px',
            paddingTop: '10px',
            backgroundColor: 'aliceblue'
        },
        textField: {
            marginRight: '10px'
        },
        row: {
            display: 'flex'
        },
        btn: {
            paddingTop: '10px'
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
                            <div style={style.row}>
                            <TextField
                                label="Email"
                                style={style.textField}
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                style={style.textField}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"
                                variant="outlined"
                            />
                            </div>

                            <div style={style.row}>
                            <TextField
                                label="First Name"
                                style={style.textField}
                                value={this.state.firstName}
                                onChange={this.handleChange('firstName')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                label="Last Name"
                                style={style.textField}
                                value={this.state.lastName}
                                onChange={this.handleChange('lastName')}
                                margin="normal"
                                variant="outlined"
                            />
                            </div>

                            <div>
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
                                {/* nurse options */}
                                {
                                    this.state.role === 'nurse' ? (
                                        <div>
                                        <TextField
                                            label="Registration Number"
                                            className={classes.textField}
                                            value={this.state.ren}
                                            onChange={this.handleChange('ren')}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        </div>
                                    ) : null
                                }

                            </div>
                            <div style={style.btn}>
                                <Button  onClick={this.submit} variant="contained" color="primary">
                                    Submit
                                </Button>
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