'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
//class Hello extends React.Component {
//  render() {
//    return <div>Hello, likang!!</div>;
//  }
//}
//
//ReactDOM.render(
//    <Hello />,
//    document.getElementById('app')
//);

import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
ReactDOM.render(<DatePicker />, document.getElementById('app'));