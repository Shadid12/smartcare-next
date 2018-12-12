import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd'
import styled from "styled-components";

import Column from './Column';

import initialData from './data';

const styles = theme => ({

});

const Container = styled.div`
  display: flex;
`;


class NurseDashBoard extends Component {
  state = {
      data: initialData
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    }

    const column = this.state.data.columns[source.droppableId];
    const finish = this.state.data.columns[destination.droppableId];

    if (column === finish) {
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newColumn = {
            ...column,
            taskIds: newTaskIds
        };

        const newData =  {
            ...this.state.data,
            columns: {
                ...this.state.data.columns,     
                [newColumn.id]: newColumn,
            },
        }

        this.setState({data: newData})
        return;
    }

    // Moving into different coloumn
    const startTaskIds = Array.from(column.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
        ...column,
        taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
        ...finish,
        taskIds: finishTaskIds
    };

    const newData = {
        ...this.state.data,
        columns: {
            ...this.state.data.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        }
    }

    this.setState({data: newData})

  };

  render () {
    const { classes } = this.props
    return (
        <DragDropContext
            onDragEnd={this.onDragEnd}
        >
            <Container>
                {
                    this.state.data.columnOrder.map((columnId) => {
                        const column = this.state.data.columns[columnId];
                        //tasks in that column
                        const tasks = column.taskIds.map(taskId => this.state.data.tasks[taskId]);
                        return <Column key={column.id} column={column} tasks={tasks} />;
                    })
                }
            </Container>
        </DragDropContext>
    )
  }
}

function mapStateToProps (state) {
  const {userRole} = state
  return {userRole}
}

export default connect(mapStateToProps)(withStyles(styles)(NurseDashBoard));
