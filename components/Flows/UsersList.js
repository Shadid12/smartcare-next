import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


import {
    MdPeople
} from 'react-icons/md'


class UsersList extends React.Component {  
  state = {
      loading: false,
      data: []
  };

  componentDidMount() {

      if(!this.props.userRole) {
          this.setState({ loading: true });
          // Get the thing from here
          const token = window.localStorage.getItem('token');
          axios.get('https://smartapinode.herokuapp.com/users/nurses', 
          { headers: {"Authorization" : `Bearer ${token}`} })
            .then((res) => {
                console.log('----Nurses', res.data);
                this.setState({ data: res.data.nurses })
            })
       }
  }

  render() {
    const columns = [
        {
            Header: 'First Name',
            accessor: 'firstName' 
        }, 
        {
            Header: 'Last Name',
            accessor: 'lastName'
        },
        {
            Header: 'Reg #',
            accessor: 'ren'
        },
        {
            Header: 'Edit',
            accessor: 'action',
            Cell: row => (
                <button onClick={
                    (e) => {
                        console.log('---->', row.row)
                    }
                }>
                    Edit User
                </button>
            )
        },
        {
            Header: 'Delete',
            accessor: 'action',
            Cell: row => (
                <button onClick={
                    (e) => {
                        console.log('---->', row.row)
                    }
                }>
                    Delete User
                </button>
            )
        }
    ];

    const styles = {
        table: {
            display: 'flex',
            height: '80vh',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }
    if(this.state.data.length === 0) {
        return(
            <div style={styles.table}>
                <CircularProgress color="secondary" />
            </div>
        )
    } else {
        return (
            <div style={styles.table}>
                <h3>Nurses List</h3>
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                />
            </div>
        );
    }
  }
}

function mapStateToProps (state) {
    const  { userRole } = state
    return { userRole }
}

export default connect(mapStateToProps)(UsersList);