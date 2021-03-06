import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Icons 
import {    FaListUl,
            FaCheckSquare,
            FaAlignJustify,
            FaCalendar,
            FaCaretDown,
            FaTextHeight
} from 'react-icons/fa'


function GetIcons({label}) {
    switch(label) {
        case 'radio': 
            return(
                <FaCheckSquare />
            )
        case 'multipleChoice':
        case 'text':
            return (
                <FaTextHeight />
            )
        case 'calander':
            return (
                <FaCalendar />
            )
        case 'dropdown':
            return (
                <FaCaretDown />
            )
        case 'numeric':
            return (
                <FaAlignJustify />
            )
        default:
            return(
                <FaListUl />
            )
    }
}

class Item extends React.Component {
    state ={};

    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return(
            <div>
                <span className={classes.icons}>
                    <GetIcons {...this.props.formItem}/>
                </span>
                <span>{this.props.formItem.label}</span>
            </div>
        )
    }
}

Item.propTypes = {
    classes: PropTypes.object,
};

const styles = theme => ({
    root: {},
    icons: {
        paddingRight: '10px'
    }
});

export default withStyles(styles)(Item);