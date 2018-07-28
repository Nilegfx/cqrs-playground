import React, { Component } from 'react'
import { Select, Button, Row, Col, DatePicker } from 'antd';
import { EVENT_TYPES } from './constants';

const Option = Select.Option;
const inputStyles = {width: '100%'};

export class Event extends Component {
  
  _handleOnChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  _handleOnOk = (value) => {
    console.log('onOk: ', value);
  }

  _handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  _handleRemove = () => {
    this.props.actions.removeEvent(this.props.tempId);
  }

  _renderEventTypes() {
    return Object.values(EVENT_TYPES).map((eventType, i) => {
      return <Option key={i} value={eventType}>{eventType}</Option>
    })
  }

  render() {

    return (
      <Row className='event'>
        <Col span={22}>
          <Row gutter={16}>
            <Col span={2}>
              <Select defaultValue="opa" style={inputStyles} onChange={this._handleChange}>
                {this._renderEventTypes()}
              </Select>
            </Col>
            <Col span={3}>
              <DatePicker
                style={inputStyles}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="Event time"
                onChange={this._handleOnChange}
                onOk={this._handleOnOk}
                />
            </Col>
          </Row>
        </Col>
        <Col span={2} className='text-right'>
          <Button type="danger" icon="close" onClick={this._handleRemove}>Remove</Button>
        </Col>
      </Row>
    )
  }
}
