import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import LinearProgress from '@material-ui/core/LinearProgress';


// action
import { 
  changePatientProfile
} from '../../store'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  helloMsg: {
    paddingLeft: '10px'
  }
});

class AppBarMain extends React.Component {
  state = {
    anchorEl: null,
    anchorNotice: null,
    mobileMoreAnchorEl: null,
    notice: [
      'Some Notice',
      'Other Notice'
    ],
    open: false,
    show: true,
    processing: false
  };


  componentDidMount() {
    // const socket = io('http://localhost:3001');
    // socket.emit('RECIEVE_UPDATE', {data: 'SOme User'})
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleNoticeMenuOpen = event => {
    this.setState({ anchorNotice: event.currentTarget, show: false });
  }


  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.setState({ anchorNotice: null });
    this.handleMobileMenuClose();
  };

  logOut = () => {
    window.localStorage.setItem('token', '');
    Router.push('/login');
  }

  profileClicked = () => {
    const {dispatch} = this.props;
    let toChange = 0;
    if(this.props.patientProfile === 0) {
      toChange = 1;
    }
    dispatch(changePatientProfile(toChange));
    this.handleMenuClose();
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, anchorNotice, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isNoticeOpen = Boolean(anchorNotice)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.profileClicked}>Profile</MenuItem>
        <MenuItem onClick={this.logOut}>Logout</MenuItem>
      </Menu>
    );

    const renderNotice = (
      <Menu
        anchorEl={anchorNotice}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isNoticeOpen}
        onClose={this.handleMenuClose}
      >
      {
        this.state.notice.map((item) => {
          return (
            <MenuItem
              key={item} 
              onClick={this.handleMenuClose}>
                <NotificationsIcon />
                {item}
            </MenuItem>
          )
        })
      }
      </Menu>
    );

    const renderAdminButton = 
      this.props.userRole === 'admin' ?
      (
        <Button 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={() => {
            Router.push(`/admin`);
          }}
        >
          Admin Portal
        </Button>
      ) : null

    const renderNurseButton = 
      this.props.userRole === 'nurse' ?
        (
          <Button 
            variant="contained" 
            color="secondary" 
            className={classes.button}
            onClick={() => {
              if(Router.route !== '/mainflow/nurse/case') {
                this.setState({ processing: true})
              }
              Router.push(`/mainflow/nurse/case`)
            }}
          >
            View Patients Seeking Care
          </Button>
        ) : null 


    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton> */}
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Smart Care
            </Typography>
            <Typography className={classes.helloMsg} variant="span" color="inherit" noWrap>
              Hello, [UserName]
            </Typography>
            
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
             {renderAdminButton}
             {renderNurseButton}
              
              <IconButton color="inherit" onClick={this.handleNoticeMenuOpen}>
                {
                  !this.state.show ? (
                    <NotificationsIcon />
                  ) : (
                    <Badge 
                      badgeContent={this.state.notice.length} 
                      color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  )
                }
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {renderNotice}
        {
          this.state.processing ? (
            <LinearProgress color="secondary" />
          ) : null
        }
      </div>
    );
  }
}

AppBarMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  const  { userRole , patientProfile} = state
  return { userRole , patientProfile}
}

export default connect(mapStateToProps)(withStyles(styles)(AppBarMain));