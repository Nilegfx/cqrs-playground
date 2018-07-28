import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from "@reach/router";

const { Sider } = Layout;

export class Navigation extends Component {
  render() {
    return (
      <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="home" />
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/event-manager">
              <Icon type="home" />
              <span className="nav-text">Event manager</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}