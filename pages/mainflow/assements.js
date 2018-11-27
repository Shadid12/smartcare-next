import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../components/protected/AppBar'

import AssementsTable from '../../components/Flows/AssementsTable';


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
          <AssementsTable />
      </div>
    )
  }
}

export default connect()(Index)
