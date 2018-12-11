import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../../components/protected/AppBar'

import PatientProfileSection from '../../../components/Nurse/PatientProfileSection'

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
          <PatientProfileSection />
      </div>
    )
  }
}

export default connect()(Index)
