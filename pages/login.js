import React from 'react'
import {connect} from 'react-redux'

// Components

import SigninComponent from '../components/Signin/SigninComponent'

class Index extends React.Component {

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <SigninComponent />
    )
  }
}

export default connect()(Index)
