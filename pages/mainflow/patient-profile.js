import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../components/protected/AppBar'

import ProfileFeed from '../../components/Flows/Patient/ProfileFeed'
import ProfileDetails from '../../components/Flows/Patient/ProfileDetails'


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
        {
          this.props.patientProfile === 1 ? (
            <ProfileDetails />
          )
          :
          (
            <ProfileFeed />
          )
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const  { userRole , patientProfile} = state
  return { userRole , patientProfile}
}

export default connect(mapStateToProps)(Index)
