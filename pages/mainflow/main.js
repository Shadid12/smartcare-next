import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../components/protected/AppBar'

import ActionPortal from '../../components/Flows/ActionPortal';
import NurseDashBoard from '../../components/Nurse/NurseDashBoard';
import PatientDash from '../../components/Patient/PatientDash';


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
          {
            this.props.userRole === 'nurse' ? (
              <NurseDashBoard />
            ) : null
          }
          {
            this.props.userRole === 'admin' ? (
              <ActionPortal /> 
            ) : null
          }
          {
            this.props.userRole === 'patient' ? (
              <PatientDash />
            ) : null
          }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const  { userRole } = state
  return { userRole }
}

export default connect(mapStateToProps)(Index)
