import React, { Component } from 'react'
import { Event } from './Event';
import { Button, Row, Col, notification } from 'antd';
import { EVENT_TYPES } from './constants';

const removeById = (arr, tempIdToRemove) => arr.filter(({tempId}, i) => {
  console.log('tempId', tempId);
  console.log('tempIdToRemove', tempIdToRemove);

  return tempId !== tempIdToRemove
});
const getRandomId = () => Math.random().toString(36).substr(2, 5);

const EVENT_PUBLISHED_SUCCESS_MESSAGE = 'SUCESS TITLE';
const EVENT_PUBLISHED_SUCCESS_DESCRIPTION = 'Event(s) were successfully fired.';
const EVENT_PUBLISHED_FAILURE_MESSAGE = 'FAILED TO PUBLISH EVENTS';
const EVENT_PUBLISHED_FAILURE_DESCRIPTION = 'Please check the console for more details';

const openNotificationWithIcon = ({type, message, description}) => {
  notification[type]({
    duration: 2,
    message,
    description,
  });
};

export class EventManager extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: []
    }
  }

  _cleanState() {
    this.setState(({events})=>{
      return {
        events:[]
      }
    })
  }

  _fireEvents = ()=> {
    Promise
    .resolve('done')
    .then(()=>{
      openNotificationWithIcon({
        type: 'success',
        message: EVENT_PUBLISHED_SUCCESS_MESSAGE,
        description: EVENT_PUBLISHED_SUCCESS_DESCRIPTION
      })
      this._cleanState();
    })
    .catch((error)=>{
      console.log(error);
      openNotificationWithIcon({
        type: 'error',
        message: EVENT_PUBLISHED_FAILURE_MESSAGE,
        description: EVENT_PUBLISHED_FAILURE_DESCRIPTION
      })
    })
  }

  _renderEvent({tempId}) {
    let actions = {
      removeEvent: this._handleRemoveEvent
    };

    return (
      <Event key={tempId} tempId={tempId} actions={actions} />
    )
  }

  _handleRemoveEvent = (tempId) => {
    this.setState(({ events }) => ({ events: removeById(events, tempId) }));
  }

  _renderGlobalActions() {
    let eventsCount = this.state.events.length;
    let text = eventsCount === 1 ? `Fire ${eventsCount} event` : `Fire ${eventsCount} events`;
    return !!this.state.events.length && (
      <div className='global-actions'>
        <Row className='text-right'>
          <Col span={24}>
            <Button icon="notification" size='large' onClick={this._fireEvents}> {text}</Button>
          </Col>
        </Row>
      </div>
    )
  }

  _handleAddEvent = () => {
    console.log(this)
    this.setState(({ events }) => {
      return { events: [...events, {
        tempId: getRandomId(),
        eventType: EVENT_TYPES.OPA
      }] }
    })
  }

  _renderAddEvent() {
    return (
      <Row className='text-center'>
        <Col span={24}>
          <Button type="primary" icon="plus" size='large' onClick={this._handleAddEvent}>Add Event</Button>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div className='event-manager'>
        {this._renderGlobalActions()}
        <div className='events'>
          {this.state.events.map((event) => this._renderEvent(event))}
          {this._renderAddEvent()}
        </div>
      </div>
    )
  }
}
