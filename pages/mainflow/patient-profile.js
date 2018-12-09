import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../components/protected/AppBar'

import ProfileFeed from '../../components/Flows/Patient/ProfileFeed'


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  render () {
    return (
      <div>
          <AppBar />
          <ProfileFeed />
      </div>
    )
  }
}

export default connect()(Index)
