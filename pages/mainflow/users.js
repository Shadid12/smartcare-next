import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../components/protected/AppBar'

import UsersPortal from '../../components/Flows/UsersPortal';


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
          <UsersPortal />
      </div>
    )
  }
}

export default connect()(Index)
