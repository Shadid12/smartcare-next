import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import { Button } from '@material-ui/core';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    img: {
        width: '90px',
        height: '90px',
        borderRadius: '50%'
    },
    section: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    btnContainer: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px'
    },
    btns: {
        marginBottom: '10px'
    }

});

export class PatientProfileSection extends React.Component {
    state = {
      patient: {},
      firstName: 'Static ',
      lastName: 'Name',
      age: '25',
      email: 'my@email.com',
      bloodpreasure: '100',
      physician: 'Wood Woodpecker',
      oxygen: 20,
      allergies: 'Nothing'
    }

    componentDidMount() {

    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props
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
                            Patient Profile Summary
                        </Typography>
                        <img 
                            className={classes.img}
                            src="data:image/jpeg;base64,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" />
                        <Typography component="span">
                            <span>{this.state.firstName} </span>
                            <span>{this.state.lastName}</span>
                        </Typography>
                        <Typography component="p">
                            Age: {this.state.age}
                        </Typography> 
                        <Typography component="p">
                            Allergies: asdadkwkdk
                        </Typography> 
                        <Typography component="p">
                            Email: {this.state.email}
                        </Typography>   
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.section} elevation={1}>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="standard-name"
                                label="Blood Preasure / DCB"
                                className={classes.textField}
                                value={this.state.bloodpreasure}
                                onChange={this.handleChange('bloodpreasure')}
                                fullWidth
                                type="number"
                            />
                            <TextField
                                id="standard-name"
                                label="Oxygen / DCB"
                                className={classes.textField}
                                value={this.state.oxygen}
                                onChange={this.handleChange('oxygen')}
                                fullWidth
                                type="number"
                            />
                            <TextField
                                id="standard-name"
                                label="Allergies"
                                className={classes.textField}
                                value={this.state.allergies}
                                onChange={this.handleChange('allergies')}
                                fullWidth
                            />
                            <TextField
                                id="standard-name"
                                label="Physician"
                                className={classes.textField}
                                value={this.state.physician}
                                onChange={this.handleChange('physician')}
                                fullWidth
                            />

                            <div className={classes.btnContainer}>
                                <Button variant="contained" className={classes.btns}>Add New Value</Button>
                                <Button variant="contained" color="primary">Update Profile</Button>
                            </div>
                        </form>
                    </Paper>
                </Grid>

                </Grid>
            </div>
        )
    }

}

PatientProfileSection.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps (state) {
    const  { userRole , patientProfile} = state
    return { userRole , patientProfile}
}

export default connect(mapStateToProps)(withStyles(styles)(PatientProfileSection));