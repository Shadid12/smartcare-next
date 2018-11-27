import React from "react";
import { connect } from 'react-redux';
import axios from 'axios';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import { 
    MdPeople
} from 'react-icons/md'



class AssementsTable extends React.Component {
    state = {}

    componentDidMount() {

    }

    render() {
        const data = [
            {
                firstName: 'John',
                lastName: 'Doe',
                age: 23,
                asmntType: 'Vitals',
                date: '12/12/2017'
            },
            {
                firstName: 'Lolita',
                lastName: 'kevins',
                age: 21,
                asmntType: 'Blood Preasure',
                date: '12/12/2017'
            },
            {
                firstName: 'Jerry',
                lastName: 'Souves',
                age: 35,
                asmntType: 'Blood Preasure',
                date: '12/12/2017'
            },
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
            },
            {
                Header: 'Assement Type',
                accessor: 'asmntType'
            },
            {
                Header: 'Date',
                accessor: 'date'
            }
        ]
        return(
            <div>
                <h3>Fake Patients With Assements</h3>
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

export default connect(mapStateToProps)(AssementsTable);