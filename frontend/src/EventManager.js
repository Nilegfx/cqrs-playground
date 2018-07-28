import React, { Component } from 'react'
import { Event } from './Event';
import { Button, Row, Col, notification } from 'antd';
import { EVENT_TYPES } from './constants';
const deleteAtIndex = (arr, index) => arr.filter((_, i) => i !== index);

const EVENT_PUBLISHED_SUCCESS_MESSAGE = 'SUCESS TITLE';
const EVENT_PUBLISHED_SUCCESS_DESCRIPTION = 'This is the content of the notification.';
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
      events: [{
        eventType : EVENT_TYPES.OPA
      }]
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

  _createEvent(_, i) {
    let actions = {
      removeEvent: this._handleRemoveEvent
    };

    return (
      <Event key={i} eventIndex={i} actions={actions} />
    )
  }

  _handleRemoveEvent = (index) => {
    this.setState(({ events }) => ({ events: deleteAtIndex(events, index) }));
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
    this.setState(({ events }) => {
      return { events: [...events, {}] }
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
          {this.state.events.map((event, i) => this._createEvent(event, i))}
          {this._renderAddEvent()}
        </div>
      </div>
    )
  }
}
