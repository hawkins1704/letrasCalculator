import React from "react";
import {Link} from 'react-router-dom';
import googleIcon from '../assets/images/google-icon.png';
import '../assets/styles/Register.css';
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:{
                nombre:"",
                correo:"",
                contraseña:""
            }
        }
    }
    handleSubmit=e=>{
        e.preventDefault();
        this.props.history.push('/login');
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
            <section className="register">
                <section className="register__container">
                    <h1>Regístrate</h1>
                    <form className="register__container--form" onSubmit={this.handleSubmit}>
                        <input 
                        className="input"
                        type="text" 
                        placeholder="Nombre"
                        name="nombre"
                        onChange={this.handleInput}/>
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
                         <section className="register__container--social-media">
                            <div><img alt="" src={googleIcon}/> Inicia sesión con Google</div>
                        </section>
                        <p className="register__container--register">Ya tienes una cuenta? &nbsp;
                        <Link to='/login'>
                            Ingresa
                        </Link>
                        </p>
                    </form>
                </section>
            </section>
        )
    }
        
}
export default Register;
