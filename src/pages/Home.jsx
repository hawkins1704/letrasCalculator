import React from "react";
import CGList from "../components/CGList";
import Resultado from "../components/Resultado";
import '../assets/styles/Home.css';
import{Link} from 'react-router-dom';
import {convertirTasaEfectiva,calcularTasaDescontada,convertirNominalAEfectiva} from '../helpers';

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
            tipoTasa:"efectiva",
            tasa:"",
            capitalizacion:"1",
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
        var tasa=0;
       if(this.state.tipoTasa==='nominal'){
        tasa=convertirNominalAEfectiva(this.state.plazoTasa,parseInt(this.state.tasa),parseInt(this.state.capitalizacion));
        tasa=tasa*100;
        }else{
        tasa=parseInt(this.state.tasa);
       }
       console.log("TASA EFECTIVA",tasa);
        return{
            moneda:this.props.letra.moneda,
            tasaEfectiva:tasa,
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
                            <div className="tipoMoneda__item">
                                <h2><span className="bold">Tipo</span> de Moneda</h2>
                            </div>
                            <div className="tipoMoneda__item">
                                <label htmlFor="soles">Nuevo Sol Peruano
                                    <input type="radio" name="moneda" id="soles" value="soles" onChange=    {this.handleInput}/>
                                </label>
                            </div>
                            <div className="tipoMoneda__item">
                                <label htmlFor="dolares">Dólar Americano
                                    <input type="radio" name="moneda" id="dolares" value="dolares" onChange=    {this.handleInput}/>
                                </label>
                            </div>
                        </div>

                        <div className="form__section">
                            <h2><span className="bold">Datos</span> de la letra</h2>
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
                            <h2><span className="bold">Datos</span> de la tasa y plazo</h2>

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
                                <label htmlFor="tasa">Tipo de Tasa:</label>
                                <div className="tipoTasa__item">
                                    <label htmlFor="soles">Efectiva
                                        <input type="radio" name="tipoTasa" id="efectiva" value="efectiva" onChange=    {this.handleInput}/>
                                    </label>
                                </div>
                                <div className="tipoTasa__item">
                                    <label htmlFor="tasa">Nominal
                                        <input type="radio" name="tipoTasa" id="nominal" value="nominal" onChange=    {this.handleInput}/>
                                    </label>
                                </div>

                            </div>

                            <div className="form__section--label">
                                <label htmlFor="tasaEfectiva">Tasa(%): </label>
                                <input type="text" name="tasa" onChange={this.handleInput} />
                            </div>
                            {
                                this.state.tipoTasa==='nominal'?
                                (<div className="form__section--label">
                                <label htmlFor="valorNominal">Capitalización: </label>
                                    <select name="capitalizacion" id="" onChange={this.handleInput}>
                                        <option value="1">Diaria</option>
                                        <option value="15">Quincenal</option>
                                        <option value="30">Mensual</option>
                                        <option value="60">Bimestral</option>
                                        <option value="90">Trimestral</option>
                                        <option value="120">Cuatrimestral</option>
                                        <option value="180">Semestral</option>
                                        <option value="360">Anual</option>
                                </select>
                                </div>):""
                            }
                            

                            <div className="form__section--label">
                                <label htmlFor="fechaDescuento">Fecha de descuento: </label>
                                <input type="date" name="fechaDescuento" id="fechaDescuento" onChange={this.handleInput}/>
                            </div>
                        </div>
                        <div className="form__section">
                            <h2><span className="bold">Costos/Gastos</span> Iniciales</h2>
                            <CGList type="Iniciales" />

                        </div>

                        <div className="form__section">
                            <h2><span className="bold">Costos/Gastos</span> Finales</h2>
                            <CGList type="Finales" />

                        </div>
                        <div className="form__section">
                            <button type="submit" className="button button--calcular">Calcular</button>
                            <button type="reset" className="button button--limpiar">Limpiar</button>
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