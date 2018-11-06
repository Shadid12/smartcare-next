import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { connect } from 'react-redux';

// store
import { 
    updateItems
} from '../../store'

class Consumer extends React.Component {
    state = {
        items: []
    }
    
    componentWillMount() {
        this.state.items = this.props.items
    }

    handleSwitchChange = (e) => (index) => {

        let itemsCopy = this.state.items;
        itemsCopy[index].answer = !itemsCopy[i].answer
        this.setState({
            items: itemsCopy
        })

    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.row}>
                    {
                        this.state.items.map((item, index) => {
                            switch(item.label) {
                                case 'text':
                                    return(
                                        <TextField 
                                            label={item.q_label}
                                        />
                                    )
                                case 'radio':
                                    let answer = "No";
                                    if(item.answer) {
                                        answer = "Yes";
                                    }
                                    return(
                                        <div>
                                            <div>{item.q_label}</div>  
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={item.answer}
                                                        onChange={() => {
                                                            let itemsCopy = this.state.items;
                                                            itemsCopy[index].answer = !itemsCopy[index].answer
                                                            this.setState({
                                                                items: itemsCopy
                                                            })
                                                        }}
                                                        value={item.answer}
                                                        color="primary"
                                                    />
                                                }
                                                label={answer}
                                            />
                                        </div>
                                    )
                                case 'multi-choice':
                                    return(
                                        <div>
                                            <div>{item.label}</div>
                                            {
                                                item.options.map((option, index) => {
                                                    return(
                                                        <div>
                                                        
                                                        <Checkbox 
                                                            checked={option.value} 
                                                            onChange={() => {

                                                                let itemsCopy = this.state.items;
                                                                // fidn index
                                                                this.state.items.map((aItem, i) => {
                                                                    if(aItem.uid == item.uid) {
                                                                        itemsCopy[i].options[index].value 
                                                                            = !itemsCopy[i].options[index].value

                                                                        const {dispatch} = this.props
                                                                        dispatch(updateItems(itemsCopy))
                                                                        this.setState({
                                                                            items: itemsCopy
                                                                        })
                                                                    }
                                                                })
                                                            }}
                                                            value={option.value} 
                                                        />
                                                        <span>{option.label}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )

                                case 'calander':
                                    return(
                                        <div>
                                            <div>{item.q_label}</div>
                                            <TextField
                                                type="datetime-local"
                                                className={classes.textField}
                                                defaultValue="2017-05-24T10:30"
                                                // onChange={this.handleTextChange}
                                                margin="normal"
                                            />
                                        </div>
                                    )
                                case 'dropdown':
                                    return(
                                        <div>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-simple">{item.q_label}</InputLabel>
                                                <Select
                                                    value={item.selected}
                                                    onChange={(event) => {
                                                        let itemsCopy = this.props.items;
                                                        // fidn index
                                                        this.props.items.map((aItem, i) => {
                                                            if(aItem.uid == item.uid) {
                                                                itemsCopy[i].selected
                                                                    =  event.target.value

                                                                const {dispatch} = this.props
                                                                dispatch(updateItems(itemsCopy))
                                                                this.setState({
                                                                    model: itemsCopy
                                                                })
                                                            }
                                                        })
                                                    }}
                                                    inputProps={{
                                                        name: 'age',
                                                        id: 'age-simple',
                                                    }}
                                                >
                                                    {
                                                        item.options.map((o, index) => {
                                                            return (<MenuItem value={index}>{o.label}</MenuItem>)
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </div>
                                    )
                                default:
                                    return(
                                        <div>Hello man</div>
                                    )
                                 
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

Consumer.propTypes = {
    classes: PropTypes.object,
};

const styles = theme => ({
    row: {
        display: 'flex',
        width: '60vw',
        flexDirection: 'column'
    },
    textField: {
        marginRight: '10px'
    },
    root: {
        padding: '30px'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 270,
    }
});

function mapStateToProps (state) {
    const  { items } = state
    return { items }
}

export default connect(mapStateToProps)(withStyles(styles)(Consumer));