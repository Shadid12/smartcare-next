import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../../components/protected/AppBar'
import CaseList from '../../../components/protected/CaseList'

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
          <CaseList />
      </div>
    )
  }
}

export default connect()(Index)
