'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/logo';
import Nav from  './components/nav';
import Navbar from './components/navbar';
import Row from './components/row';
import Header from './components/header';
import DataPanel from './components/datapanel';
import SkillPanel from './components/skill';
import Footer from './components/footer';
import PageContent from './components/pageContent';


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

//import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
ReactDOM.render(
    <PageContent />,
    document.getElementById('app'));