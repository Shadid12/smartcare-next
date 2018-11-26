import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../../components/protected/AppBar'

import UsersList from '../../../components/Flows/UsersList'


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
          <UsersList />
      </div>
    )
  }
}

export default connect()(Index)
