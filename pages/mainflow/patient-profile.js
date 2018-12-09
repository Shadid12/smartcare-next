import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../components/protected/AppBar'


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
          <div>
              This is the patient Profile
          </div>
      </div>
    )
  }
}

export default connect()(Index)
