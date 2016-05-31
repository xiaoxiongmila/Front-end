import React from 'react';
import Logo from './logo';
import Nav from  './nav';
import Navbar from './navbar';
import Row from './row';
import Header from './header';
import DataPanel from './datapanel';
import Skill from './skill';
import Footer from './footer';
class PageContent extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <DataPanel />
                <Skill />
                <Footer />
            </div>
        )
    }
}

export default PageContent;