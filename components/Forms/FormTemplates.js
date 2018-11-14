import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { MdClearAll,
    MdAddCircleOutline
} from 'react-icons/md'

import Router from 'next/router';

// store
import { 
    updateItems,
    updateFormName
} from '../../store'


class AdminPortal extends React.Component {
    state= {
        existingForms: []
    }
    componentWillMount() {
        axios.get('https://smartapinode.herokuapp.com/custom-forms')
            .then((res) => {
                this.setState({ existingForms: res.data.forms })
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
                    <Grid item xs={8}>
                        <Paper className={classes.root} elevation={1}>
                            <Typography variant="h5" component="h3">
                                Selec An Existing Form to Continue
                            </Typography>
                            <List component="nav">
                            {
                                this.state.existingForms.map((item) => {
                                    return(
                                        <ListItem>
                                            <ListItemIcon>
                                                <MdClearAll />
                                            </ListItemIcon>
                                            <ListItemText>{item.formFormat.formName}</ListItemText>
                                            <Button variant="outlined" 
                                                    color="primary" 
                                                    aria-label="Edit" 
                                                    className={classes.button}
                                                    onClick={ () => {

                                                        const {dispatch} = this.props
                                                        dispatch(updateItems(item.formFormat.items))
                                                        dispatch(updateFormName(item.formFormat.formName))

                                                        Router.push(`/patients/new?id=${item._id}`);
                                                    } }
                                            >
                                               < MdAddCircleOutline />
                                            </Button>
                                        </ListItem>
                                    )
                                })
                            }
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    container: {
        paddingTop: '50px',
        paddingLeft: '10px',
        paddingRight: '10px'
    }
});

AdminPortal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    const  { items } = state
    return { items }
}

export default connect(mapStateToProps)(withStyles(styles)(AdminPortal));