import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Router from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';


// components
import Loader from './Loader';

// action
import { 
    setUserRole
} from '../../store'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

export class PatientSignin extends React.Component {
    state = {
        username: '',
        password: '',
        loading: false
    }

    handleForm = () => {
        this.setState({ loading: true });
        console.log('Patinet Login');
        axios.post('https://smartapinode.herokuapp.com/patients/login', 
            {
                "email": this.state.username,
                "password": this.state.password,
            }).then((res) => {
                window.localStorage.setItem('token', res.data.token);
                const {dispatch} = this.props
                dispatch(setUserRole(res.data.role))
                console.log('I am here');
                Router.push(`/mainflow/patient-profile`);
            }).catch(err => {
                console.log('Show me the Error', err);
            })
    }

    handleChange = name => event => {
        this.setState({ [name] : event.target.value })
    }

    render() {
        const { classes } = this.props;

        return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Patient Login
                </Typography>
                {!this.state.loading ? (
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input 
                                id="email" 
                                name="email" 
                                autoComplete="email" 
                                autoFocus 
                                value={this.state.userName}
                                onChange={this.handleChange('username')}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                autoComplete="current-password"
                                onChange={this.handleChange('password')}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleForm}
                    >
                        Sign in
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        className={classes.submit}
                        onClick={() => {
                            Router.push('/login')
                        }}
                    >
                        Clinician Signin
                    </Button>
                    </form>
                
                ) : 
                <Loader />
                }
                
            </Paper>
            </main>
        </React.Fragment>
        );
    }
}

PatientSignin.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    const  { userRole } = state
    return { userRole }
}

export default connect(mapStateToProps)(withStyles(styles)(PatientSignin));