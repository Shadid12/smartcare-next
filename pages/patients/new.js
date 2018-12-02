import React from 'react'
import {connect} from 'react-redux'

import AppBar from '../../components/protected/AppBar'
import FormReader from '../../components/Forms/FormReader'


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: []
    }
  }

  static getInitialProps({query}) {
    return {query}
  }

  componentWillUnmount () {
  }

  render () {
    console.log(this.props.query)
    return (
      <div>
          <AppBar />
          <FormReader formID={this.props.query.id} isSubmitable/>
      </div>
    )
  }
}

export default connect()(Index)
