import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../protected/AppBar';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';

import Item from './Items/Item';
import GetFormItem from './Items/FormItem'
var shortid = require('shortid');
import axios from 'axios';

// store
import { 
    updateItems,
    updateFormName
} from '../../store'

class Builder extends React.Component {
    state ={
        formObjects: [
            {
                label:'text',
                q_label: 'Question Title'
            },
            {
                label: 'radio',
                q_label: 'Question Title',
                answer: false
            },
            {
                label: 'multi-choice',
                options: [
                    {
                        label: 'Option A',
                        value: true,
                    }
                ]
            },
            {
                label:'calander',
                q_label: 'Question Title',
                val: ''
            },
            {
                label: 'dropdown',
                q_label: 'Dropdown Question Title',
                options: [
                    {
                        label: 'Option A'
                    }
                ],
                selected: ''
            },
            {
                label: 'numeric',
                q_label: 'Numeric Value Title'
            }
        ],
        items: [],
        selectedObject: {},
        formName: ''
    };
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            formName: this.props.formName,
            items: this.props.items
        })
    }


    handleDrop = (e) => {
        // e.stopPropagation();
        const newItems = this.state.items;
        const itemToAdd = Object.assign({}, this.state.selectedObject, {
            uid: shortid.generate()
        })
        newItems.push(itemToAdd);

        const {dispatch} = this.props
        dispatch(updateItems(newItems))

        this.setState({items: this.props.items, selectedObject: {}} );
    };

    deleteItem = (e) => (index) => {
        let itemsCopy = this.state.items;
        itemsCopy.splice(index, 1)
 
        const {dispatch} = this.props
        dispatch(updateItems(itemsCopy))

        this.setState({
            items: this.props.items
        })
    }

    sendForm = () => {

        axios.post('https://smartapinode.herokuapp.com/custom-forms', {
            "org_id": "Cal Naowa",
            "formFormat": {
                "formName": this.state.formName,
                "items": this.props.items,
                "isLive": false
            }
        }).then((res) => {
            Router.push(`/form-consumer`);
        })
    }

    updateForm = () => {
        // TODO
    }

    changeNameofForm = (e) => {
        this.setState({
            formName: e.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <AppBar type="admin"/>
                
                <div className={classes.selectRow}>
                <Grid container spacing={24}>
                    <Grid item xs={3} sm={3} className={classes.subRow}>
                        {
                            this.state.formObjects.map((item, index) => {
                                return(
                                    <DragDropContainer 
                                        targetKey="foo"
                                        onDrop={() => {
                                            this.setState({
                                                selectedObject: item
                                            })
                                        }}
                                        disappearDraggedElement={true}
                                    >   
                                        <Paper className={classes.paper}>
                                            <Item formItem={item} />
                                        </Paper>
                                    </DragDropContainer>
                                )
                            })
                        }
                        {
                            this.props.update ? (
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.createButton}
                                    onClick={this.updateForm}
                                    disabled={this.state.items.length === 0 || !this.state.formName}
                                >
                                    Update Form
                                </Button>

                            ) : (
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.createButton}
                                    onClick={this.sendForm}
                                    disabled={this.state.items.length === 0 || !this.state.formName}
                                >
                                    Create Form
                                </Button>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="Name of Your Form"
                            onChange={this.changeNameofForm}
                            value={this.state.formName}
                            className={classes.formName}
                        />
                        {
                            this.state.items.map((item, index) => {
                                return(
                                    <div className={classes.row}>
                                        <GetFormItem formItem={item} />
                                        <IconButton 
                                            aria-label="Delete" 
                                            className={classes.button}
                                            onClick={() => {
                                               console.log('IIII', index);

                                                let itemsCopy = this.state.items;
                                                itemsCopy.splice(index, 1)
                                        
                                                const {dispatch} = this.props
                                                dispatch(updateItems(itemsCopy))

                                                this.setState({
                                                    items: this.props.items
                                                })

                                            }}
                                        > 
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                )
                            })
                        }
                        <DropTarget 
                            targetKey="foo"
                            onHit={this.handleDrop}
                            dropData={{label: 'lol'}}
                        >
                            <Grid item xs={6} className={classes.target}>
                                Drop An Item Here to Add
                            </Grid>
                        </DropTarget>
                    </Grid>
                </Grid>
                </div>
            </div>
        )
    }

}

Builder.propTypes = {
    classes: PropTypes.object,
};

const styles = theme => ({
    row: {
        display: 'flex',
        width: '60vw'
    },
    textField: {
        marginRight: '10px'
    },
    drop: {
        display: 'flex',
        border: '2px solid red'
    },
    selectRow: {
        display: 'flex'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flexDirection: 'column'
    },
    subRow: {
        display: 'flex',
        flexDirection: 'column',
    },
    target: {
        width: '100%',
        height: '20vh',
        border: '2px dotted pink',
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing.unit,
        borderRadius: '0px',
        border: '1px dotted'
    },
    createButton: {
        margin: theme.spacing.unit
    },
    formName: {
        marginBottom: '10px'
    }
});

function mapStateToProps (state) {
    const  { items, formName } = state
    return { items, formName }
}

export default connect(mapStateToProps)(withStyles(styles)(Builder));