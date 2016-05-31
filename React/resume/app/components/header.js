import React from 'react';
import Logo from './logo';
import Row from './row';

const defaultProps = {
    id: "header",
    type: "clearfix"
}
class Header extends React.Component {
    render() {
        return (
            <header id={this.props.id} className={this.props.type}>
                <Logo />
                <Row />
            </header>
        )
    }
}

Header.defaultProps = defaultProps;
export default Header;


