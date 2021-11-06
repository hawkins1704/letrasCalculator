import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/components/Header.css';
import logo from '../assets/images/logo.png';

class Header extends React.Component{
    render(){
        return(
            <header className={`header`}>
                <Link to="/home">
                    <img className="header__img" src={logo} alt="Letras Calculator" />
                </Link>

                <div className="header__menu">
                    <div className="header__menu--profile">
                        {
                            
                        }
                    </div>
                </div>

            </header>
        )
    }
}

export default Header;