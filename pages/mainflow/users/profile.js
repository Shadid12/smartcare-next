import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../../components/protected/AppBar';

import UserProfile from '../../../components/UserProfile';



class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    }
  }

  render () {
    return (
      <div>
          <AppBar />
          <UserProfile />
      </div>
    )
  }
}

function mapStateToProps (state) {
    const  { userRole } = state
    return { userRole }
  }

export default connect(mapStateToProps)(Index)
