import React from 'react';
import Header from './Header';
import '../assets/styles/App.scss';
class Layout extends React.Component{
    render(){
        return(
            <div className="App">
                <Header/>
                {this.props.children}
            </div>
        )
    }
}

export default Layout;