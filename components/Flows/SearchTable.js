import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import { MdClearAll,
    MdPeople,
    MdPermDataSetting,
    MdModeEdit,
    MdQueue,
    MdSettings
} from 'react-icons/md'



class SearchTable extends React.Component {
    state = {}

    componentDidMount() {

    }

    render() {
        const data = [
            {
                firstName: 'John',
                lastName: 'Doe',
                age: 23
            },
            {
                firstName: 'Lolita',
                lastName: 'kevins',
                age: 21
            },
            {
                firstName: 'Jerry',
                lastName: 'Souves',
                age: 35
            }
        ];
        const columns = [
            {
                Header: 'First Name',
                accessor: 'firstName',
                Cell: row => (
                    <div>
                        <MdPeople />
                        <span>{row.value}</span>
                    </div>
                )
            }, 
            {
                Header: 'Last Name',
                accessor: 'lastName'
            },
            {
                Header: 'Age',
                accessor: 'age'
            }
        ]
        return(
            <div>
                <h3>Fake Patients List</h3>
                <ReactTable
                    data={data}
                    filterable
                    columns={columns}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                          onClick: (e, handleOriginal) => {
                            console.log("A Td Element was clicked!");
                            console.log("it produced this event:", e);
                            console.log("It was in this column:", column);
                            console.log("It was in this row:", rowInfo);
                            console.log("It was in this table instance:", instance);
                    
                            if (handleOriginal) {
                              handleOriginal();
                            }
                          }
                        };
                      }}
                />
            </div>
        )
    }

}

function mapStateToProps (state) {
    const  { userRole } = state
    return { userRole }
}

export default connect(mapStateToProps)(SearchTable);