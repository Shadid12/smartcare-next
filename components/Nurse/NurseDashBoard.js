import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd'

import Column from './Column';

import initialData from './data';

const styles = theme => ({

});


class NurseDashBoard extends Component {
  state = {
      data: initialData
  }

  onDragEnd = result => {
    // TODO: reorder our column
  };

  render () {
    const { classes } = this.props
    return (
        <DragDropContext
            onDragEnd={this.onDragEnd}
        >
            {
                this.state.data.columnOrder.map((columnId) => {
                    const column = this.state.data.columns[columnId];
                    //tasks in that column
                    const tasks = column.taskIds.map(taskId => this.state.data.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })
            }
        </DragDropContext>
    )
  }
}

function mapStateToProps (state) {
  const {userRole} = state
  return {userRole}
}

export default connect(mapStateToProps)(withStyles(styles)(NurseDashBoard));
