import React from 'react'
import {connect} from 'react-redux'

// Components

import PatientSignin from '../components/Signin/PatientSignin'

class Index extends React.Component {

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <PatientSignin />
    )
  }
}

export default connect()(Index)
