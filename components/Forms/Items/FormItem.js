import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Icons 
import {    FaListUl,
            FaCheckSquare
} from 'react-icons/fa'

// Components
import MultipleChoices from './Controls/MultipleChoices';
import TextComponent from './Controls/TextComponent';
import CalanderComponent from './Controls/CalanderComponent';
import RadioComponent from './Controls/RadioComponent'
import DropDownComponent from './Controls/DropDownComponent'
import NumericComponent from './Controls/NumericComponent';


function GetFormItem(item) {
    switch(item.label) {
        case 'radio':
            return(
                <RadioComponent inputItem={item}/>
            )
        case 'multi-choice':
            return(
                <MultipleChoices inputItem={item}/>
            )
        case 'text':
            return(
                <TextComponent inputItem={item} />
            )
        case 'calander':
            return(
                <CalanderComponent inputItem={item}/>
            )
        case 'dropdown':
            return(
                <DropDownComponent inputItem={item} />
            )
        case 'numeric':
            return (
                <NumericComponent inputItem={item} />
            )
        default:
            return(
                <FaListUl />
            )
    }
}

class FormItem extends React.Component {
    state ={};

    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return(
            <div>
                 <GetFormItem {...this.props.formItem}/>
                 <div>

                 </div>
            </div>
        )
    }
}

FormItem.propTypes = {
    classes: PropTypes.object,
};

const styles = theme => ({
    root: {},
    icons: {
        paddingRight: '10px'
    }
});

export default withStyles(styles)(FormItem);