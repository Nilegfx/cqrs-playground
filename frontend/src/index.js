import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import enGB from 'antd/lib/locale-provider/en_GB';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <LocaleProvider locale={enGB}>
    <App />
  </LocaleProvider>, 
  document.getElementById('root'));
  
registerServiceWorker();
