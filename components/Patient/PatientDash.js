import React from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file


const styles = theme => ({ 
    main: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        flexDirection: 'column'
    },
    btnContainer: {
        marginTop: '10px'
    }
});

class PatientDash extends React.Component {
    state = {
        status: '',
        startDate: new Date(),
        endDate: new Date()
    }

    handleSelect(date){
        this.setState({startDate: date});
    }

    post() {

    }
    
    render() {
        const {classes} = this.props
        const selectionRange = {
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			key: 'selection',
		}
        return(
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.main}>
                            <TextField 
                                fullWidth
                                autoFocus
                                label="Status"
                                multiline
                                value={this.state.status}
                                onChange={(e) => {
                                    this.setState({status: e.target.value})
                                }}
                            />
                            <div className={classes.btnContainer}>
                                <TextField
                                    id="datetime-local"
                                    label="Next appointment"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </div>
                            <div>
                                <Button 
                                    variant="contained" 
                                    color="secondary"
                                    className={classes.btnContainer}
                                    onClick={this.post}
                                >
                                    Post
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


function mapStateToProps (state) {
    const {userRole} = state
    return {userRole}
}
  
export default connect(mapStateToProps)(withStyles(styles)(PatientDash));