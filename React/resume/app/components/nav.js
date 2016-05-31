import React from 'react';
import ListItem from './listItem';

const defaultProps = {
    id: "nav",
    tabindex: 0
}

class Nav extends React.Component {
    render() {
        return (
            <ul className="ant-menu ant-menu-horizontal ant-menu-light ant-menu-root" id={this.props.id} tabIndex={this.props.tabindex}>
               <ListItem text="Demo" aria-selected></ListItem>
               <ListItem text="Github"></ListItem>
               <ListItem text="Segmentfault"></ListItem>
            </ul>
        )
    }
}

Nav.defaultProps = defaultProps;
export default Nav;