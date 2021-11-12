import React from "react";
import CGList from "../components/CGList";
import Resultado from "../components/Resultado";
import '../assets/styles/Home.css';
import{Link} from 'react-router-dom';
import {convertirTasaEfectiva,calcularTasaDescontada} from '../helpers';

import {enviarLetra,enviarResultadosPrevios,enviarResultadosRestantes} from '../actions';
import{connect}from 'react-redux';



class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            moneda:"soles",
            fechaEmision:"",
            fechaVencimiento:"",
            valorNominal:"",
            retencion:"",
            diasPorAnio:"360",
            plazoTasa:"diario",
            tasaEfectiva:"",
            fechaDescuento:"",
        }
    }
  
    handleInput=e=>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value,
        })
    }
   
    handleSubmit=async(e)=>{
        e.preventDefault();
        await this.props.enviarLetra(this.state);
        const datos=this.calcularDatosPrevios();
        this.props.enviarResultadosPrevios(datos);
        const datosR=this.calcularDatosRestantes();
        this.props.enviarResultadosRestantes(datosR);

    }

    calcularDatosPrevios=()=>{
        var fechaVencimiento=new Date(this.state.fechaVencimiento).getTime();
        var fechaDescuento=new Date(this.state.fechaDescuento).getTime();
        var diasTranscurridos=(fechaVencimiento-fechaDescuento)/(1000*60*60*24);
       
        return{
            moneda:this.props.letra.moneda,
            tasaEfectiva:this.state.tasaEfectiva,
            diasTranscurridos,
            retencion:this.state.retencion,
        }
    }
    calcularDatosRestantes=()=>{

        var tasaEfectivaP=convertirTasaEfectiva(this.props.resultados.tasaEfectiva,
            this.props.letra.plazoTasa,
            this.props.resultados.diasTranscurridos);
        var tasaDescontadaP=calcularTasaDescontada(tasaEfectivaP);
        var descuento=tasaDescontadaP*this.props.letra.valorNominal;
        var cITotales=0;
        this.props.letra.cGIniciales.forEach( e => {
            cITotales+=parseInt(e.valorNominal);
        });
        var cFTotales=0;
        this.props.letra.cGFinales.forEach( e => {
            cFTotales+=parseInt(e.valorNominal);
        });
        var valorNeto=this.props.letra.valorNominal-descuento;
        var valorTotalRecibir=valorNeto
                              -cITotales
                              -this.props.resultados.retencion;

        var valorTotalEntregar=this.props.letra.valorNominal
                                +cFTotales
                                -this.props.resultados.retencion;

        var tasaCostoEfectivo=Math.pow((valorTotalEntregar/valorTotalRecibir),(360/this.props.resultados.diasTranscurridos))-1;
        return{
            tasaEfectivaP:tasaEfectivaP,
            tasaDescontadaP:tasaDescontadaP,
            descuento:descuento,
            cITotales:cITotales,
            cFTotales:cFTotales,
            valorNeto:valorNeto,
            valorTotalRecibir:valorTotalRecibir,
            valorTotalEntregar:valorTotalEntregar,
            tasaCostoEfectivo:tasaCostoEfectivo,
        }
    }
    
  
    render(){
        if(!this.props.hasUser)
        {
            return (
                <div className="return__section">
                    <div>Ingresa nuevamente sesion</div>  
                    <Link to="/login">Volver a iniciar sesión</Link>
                </div>
            )
        }
        return (
            <div className="home">
                <div className="home__container">
                    <form onSubmit={this.handleSubmit} className="home__container--form">
                        <div className="form__section tipoMoneda">
                            <h2>Tipo de Moneda</h2>
                            <label htmlFor="soles">Soles</label>
                            <input type="radio" name="moneda" id="soles" value="soles" onChange={this.handleInput}/>

                            <label htmlFor="dolares">Dolares</label>
                            <input type="radio" name="moneda" id="dolares" value="dolares" onChange={this.handleInput}/>
                        </div>

                        <div className="form__section">
                            <h2>Datos de la letra</h2>
                            <div className="form__section--label">
                                <label htmlFor="fechaEmision">Fecha de emision: </label>
                                <input type="date" name="fechaEmision" id="fechaEmision" onChange={this.handleInput}/>
                            </div>
                            <div className="form__section--label">
                                <label htmlFor="fechaVencimiento">Fecha de vencimiento: </label>
                                <input type="date" name="fechaVencimiento" id="fechaVencimiento" onChange={this.handleInput}/>
                            </div>

                            <div className="form__section--label">
                                <label htmlFor="valorNominal">Valor Nominal: </label>
                                <input type="text" name="valorNominal" id="valorNominal" onChange={this.handleInput}/>
                            </div>

                            <div className="form__section--label">
                                <label htmlFor="retencion">Retención: </label>
                                <input type="text" name="retencion" id="retencion" onChange={this.handleInput}/>
                            </div>
                        </div>

                        <div className="form__section">
                            <h2>Datos de la tasa y plazo</h2>

                            <div className="form__section--label">
                                <label htmlFor="valorNominal">Plazo de tasa: </label>
                                <select name="plazoTasa" id="" onChange={this.handleInput}>
                                    <option value="diario">Diario</option>
                                    <option value="quincenal">Quincenal</option>
                                    <option value="mensual">Mensual</option>
                                    <option value="bimestral">Bimestral</option>
                                    <option value="trimestral">Trimestral</option>
                                    <option value="cuatrimestral">Cuatrimestral</option>
                                    <option value="semestral">Semestral</option>
                                    <option value="anual">Anual</option>
                                </select>
                            </div>

                            <div className="form__section--label">
                                <label htmlFor="tasaEfectiva">Tasa Efectiva(%): </label>
                                <input type="text" name="tasaEfectiva" onChange={this.handleInput} />
                            </div>

                            <div className="form__section--label">
                                <label htmlFor="fechaDescuento">Fecha de descuento: </label>
                                <input type="date" name="fechaDescuento" id="fechaDescuento" onChange={this.handleInput}/>
                            </div>
                        </div>
                        <div className="form__section">
                            <h2>Costos/Gastos Iniciales</h2>
                            <CGList type="Iniciales" />

                        </div>

                        <div className="form__section">
                            <h2>Costos/Gastos Finales</h2>
                            <CGList type="Finales" />

                        </div>
                        <div className="form__section">
                            <button type="submit">Calcular</button>
                            <button type="reset">Limpiar</button>
                        </div>
                    </form>
                </div>
                <div className="home__resultados">
                    <Resultado />

                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    hasUser:state.hasUser,
    resultados:state.resultadoActual,
    letra:state.letraActual,
})
const mapDispatchToProps=(dispatch)=>({
    enviarLetra(letra){
        dispatch(enviarLetra(letra));
    },
    enviarResultadosPrevios(datos){
        dispatch(enviarResultadosPrevios(datos));
    },
    enviarResultadosRestantes(datos){
        dispatch(enviarResultadosRestantes(datos))
    }

})
export default connect(mapStateToProps,mapDispatchToProps)(Home);