import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import {Navigation} from './Navigation';
import {EventManager} from './EventManager';

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout>
        <Navigation />
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className='content'>
            <EventManager />
        </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}/>
        </Layout>
      </Layout>
    );
  }
}

export default App;
