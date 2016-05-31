import React from 'react';

class ListItem extends React.Component {
    render() {
        return (
           <li className="ant-menu-item">
               <a href="/" target="_blank">
                   <span>{this.props.text}</span>
               </a>
           </li>

        )
    }
}

export default ListItem;