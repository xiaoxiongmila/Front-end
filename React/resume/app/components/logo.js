
import React, { PropTypes } from 'react';

import '../style/main.css';

const defaultProps = {
    id: 'logo',
    url: 'xiaoxiongmila.github.io',
    title: '小熊米拉',
    text: '主页'
}

class Logo extends React.Component {
    render() {
        return (
            <a id={this.props.id} href={this.props.url} title={this.props.title} target="_blank">
                {this.props.text}
            </a>
        )
    }
}

Logo.defaultProps = defaultProps;

export default Logo;