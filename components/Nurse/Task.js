import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;


const ItemImg = styled.img`
    border-radius: 50%;
    width: 50px;
    height: 50px;
`;

const NameTitle = styled.span`
    padding-left: 10px;
`

const ActionButton = styled.button`
    margin-left: 10px;
    border: none;
    background-color: cyan;
    width: 75px;
    height: 35px;
    border-radius: 20px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
`

export default class Task extends React.Component {
  render() {
    return (
        <Draggable draggableId={this.props.task.id} index={this.props.index} >
        {(provided, snapshot) => (
            <Container 
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                isDragging={snapshot.isDragging}
            >
                <ItemImg src={this.props.task.img}/>
                <NameTitle>
                    {this.props.task.content}
                </NameTitle>
                <ActionButton>View</ActionButton>
            </Container>
        )} 
        </Draggable>
    )
  }
}