import React, { Component, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import './BoardStyles.css';

const axis = ['Eje Común','Eje Basico','Eje Profesional','Eje Especializante','Eje Integrador'];

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

export default class NewPollBoard extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            subjects: [], 
            common: [],
            basic: [], 
            profesional:[],
            specialist:[],
            integral: [],
            poll:[]
        }
      }
    
    async loadData() {
        const res = await axios.get('http://localhost:4000/api/subjects/')
        this.setState({subjects:res.data});
        console.log(this.state.subjects);
        let common = this.state.subjects.filter(subject => subject.axis === "C" );
        let basic = this.state.subjects.filter(subject => subject.axis === "B" );
        let profesional = this.state.subjects.filter(subject => subject.axis === "P" );
        let specialist = this.state.subjects.filter(subject => subject.axis === "E" );
        let integral = this.state.subjects.filter(subject => subject.axis === "I" );
        this.setState({
            common,
            basic,
            profesional,
            specialist,
            integral
        });
    }
    
    componentDidMount() {
        this.loadData();
    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable1: 'common',
        droppable2: 'basic',
        droppable3: 'profesional',
        droppable4: 'specialist',
        droppable5: 'integral',
        droppable6: 'poll',
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable1') {
                state = { common: items };
            }
            if (source.droppableId === 'droppable2') {
                state = { basic: items };
            }
            if (source.droppableId === 'droppable3') {
                state = { profesional: items };
            }
            if (source.droppableId === 'droppable4') {
                state = { specialist: items };
            }
            if (source.droppableId === 'droppable5') {
                state = { integral: items };
            }
            if (source.droppableId === 'droppable6') {
                state = { poll: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                common: result.droppable1,
                basic: result.droppable2,
                profesional: result.droppable3,
                specialist: result.droppable4,
                integral: result.droppable5,
                poll: result.droppable6
            });
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            // <div className="container">             
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable1">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={'body-item'}>
                                <h5>{axis[0]}</h5>
                                <div className={'body-item-scrollable'}>
                                    {
                                        this.state.common.map((subject, index) => (
                                            <Draggable
                                                key={subject._id}
                                                draggableId={subject._id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {subject.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={'body-item'}>
                                <h5>{axis[1]}</h5>
                                <div className={'body-item-scrollable'}>
                                    {
                                        this.state.basic.map((subject, index) => (
                                            <Draggable
                                                key={subject._id}
                                                draggableId={subject._id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {subject.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable3">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={'body-item'}>
                                <h5>{axis[2]}</h5>
                                <div className={'body-item-scrollable'}>
                                    {
                                        this.state.profesional.map((subject, index) => (
                                            <Draggable
                                                key={subject._id}
                                                draggableId={subject._id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {subject.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable4">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={'body-item'}>
                                <h5>{axis[3]}</h5>
                                <div className={'body-item-scrollable'}>
                                    {
                                        this.state.specialist.map((subject, index) => (
                                            <Draggable
                                                key={subject._id}
                                                draggableId={subject._id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {subject.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable5">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={'body-item'}>
                                <h5>{axis[4]}</h5>
                                <div className={'body-item-scrollable'}>
                                    {
                                        this.state.integral.map((subject, index) => (
                                            <Draggable
                                                key={subject._id}
                                                draggableId={subject._id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {subject.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable6">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={'body-item'}>
                                <h5>Propuesta</h5>
                                <div className={'body-item-scrollable'}>
                                    {
                                        this.state.poll.map((subject, index) => (
                                            <Draggable
                                                key={subject._id}
                                                draggableId={subject._id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {subject.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            // </div>
        );
    }
}