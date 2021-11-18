import React from "react";
import {Link} from 'react-router-dom';
import {loginRequest} from '../actions';
import {connect} from 'react-redux';
import googleIcon from '../assets/images/google-icon.png';
import '../assets/styles/Login.css';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:{
                correo:"",
                contraseña:""
            }
        }
    }

    handleSubmit=e=>{
        e.preventDefault();
        this.props.ingresar(this.state.user);
        this.props.history.push('/home');
    }
    handleInput=e=>{
        this.setState({
            ...this.state,
            user:{
                ...this.state.user,
                [e.target.name]:e.target.value,
            }
        })
    }
    render(){
        return (
            
            <section className="login">
                <section className="login__container">
                    <h2><span className="bold">Inicia</span> Sesión</h2>
                    <form className="login__container--form" onSubmit={this.handleSubmit}>
                        <input 
                        className="input"
                        type="text" 
                        placeholder="Usuario o Correo"
                        name="correo"
                        onChange={this.handleInput}/>
                        <input 
                        className="input"
                        type="password" 
                        placeholder="contraseña"
                        name="contraseña"
                        onChange={this.handleInput}/>
                        <button className="button" type="submit">Enviar</button>
                        <section className="login__container--social-media">
                            <div><img alt="" src={googleIcon}/> Inicia sesión con Google</div>
                        </section>
                        <p className="login__container--register">No tienes ninguna cuenta? &nbsp;
                        <Link to='/register'>
                            Regístrate
                        </Link>
                        </p>
                    </form>
                </section>
            </section>
        )
    }
}

const mapStateToProps=(state)=>{
    return ({});
}
const mapDispatchToProps=(dispatch)=>({
    ingresar(user){
        dispatch(loginRequest(user));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);