import React from 'react'
import {connect} from 'react-redux'
import AppBar from '../../../components/protected/AppBar';

import UserForm from '../../../components/Flows/UserForm';


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
          <UserForm />
      </div>
    )
  }
}

export default connect()(Index)
