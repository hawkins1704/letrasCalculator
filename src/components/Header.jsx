import React from 'react';
import {Link} from 'react-router-dom';
import '../assets/styles/components/Header.css';
import logo from '../assets/images/logo.png';
import {connect} from 'react-redux';
import{LogoutRequest} from '../actions';

class Header extends React.Component{
    handleLogout=()=>{
        this.props.logout({})
    }
    render(){
        return(
            <header className={`header`}>
                <Link to="/home">
                    <img className="header__img" src={logo} alt="Letras Calculator" />
                </Link>

                <div className="header__menu">
                    <div className="header__menu--profile">
                        {
                            this.props.hasUser===true?
                            (<div>Hola, {this.props.user.correo}</div>):
                            (<div></div>)
                        }
                    </div>
                    <ul>
                    {this.props.hasUser===true?
                    <React.Fragment>
                    <li><Link to="/misletras">Mis Letras</Link></li>
                    <li><Link to="/login" onClick={this.handleLogout}>Cerrar Sesión</Link></li>
                    </React.Fragment>:
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                    }
            </ul>
                </div>

            </header>
        )
    }
}
const mapStateToProps=(state)=>({
    hasUser:state.hasUser,
    user:state.user,
})
const mapDispatchToProps=(dispatch)=>({
    logout(user){
        dispatch(LogoutRequest(user));
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(Header);