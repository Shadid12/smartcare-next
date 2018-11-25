import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../components/protected/AppBar'

import ActionPortal from '../../components/Flows/ActionPortal';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    }
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div>
          <AppBar />
          <ActionPortal />
      </div>
    )
  }
}

export default connect()(Index)
