import React from "react";
import {Link} from 'react-router-dom';
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
                    <h1>Inicia Sesión</h1>
                    <form className="login__container--form" onSubmit={this.handleSubmit}>
                        <input 
                        className="input"
                        type="email" 
                        placeholder="Correo Electrónico"
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
export default Login;