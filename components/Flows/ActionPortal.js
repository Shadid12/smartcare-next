import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'aliceblue',
        paddingLeft: '100px',
        paddingTop: '10px'
    }
  },
});

class Loader extends React.Component {
  state = {
      loading: false,
      listItems: [
          {
              _id: '1232130094',
              label: 'Settings'
          },
          {
              _id: '123020392',
              label: 'Users'
          },
          {
            _id: '1230122392',
            label: 'Billings'
          },
          {
            _id: '123020392',
            label: 'Forms'
          },
          {
            _id: '123020392',
            label: 'Scheduling'
          }
      ]
  };

  render() {
    const { classes } = this.props
    return (
        <div className={classes.root}>
            <List
            component="nav"
            subheader={<ListSubheader component="div">Action Items</ListSubheader>}
            >
                {this.state.loading ? (
                    <CircularProgress className={classes.progress} color="secondary" />
                ) : 
                (
                    <div>
                        {
                            this.state.listItems.map((item) => {
                                return (
                                    <div>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <SendIcon />
                                            </ListItemIcon>
                                            <ListItemText inset primary={`${item.label}`} />
                                        </ListItem>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
                }
            </List>
        </div>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);