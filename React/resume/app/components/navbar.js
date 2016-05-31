import React from 'react';
import Nav from './nav';

class Navbar extends React.Component {
    render() {
        return (
            <div className="nav nav-hide col-xs-0 col-sm-17 col-md-18 col-lg-20">
                <Nav />
            </div>
        )
    }
}

export default Navbar;