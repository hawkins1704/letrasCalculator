import React from 'react';
import {connect} from 'react-redux';
import {agregarLetra,agregarACartera} from '../actions';
import {calcularTasaDescontada, calcularTCEA} from '../helpers';
import '../assets/styles/components/Resultados.css';


class Resultado extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:1,
        }
    }
    aumentarId=()=>{
        this.setState({
            id:this.state.id+1,
        })
    }
    handleSubmit=async(e)=>{
        e.preventDefault();
        await this.props.handleSubmit(this.props.resultados,this.state.id);
        var cartera=this.actualizarCartera();
        await this.props.agregarACartera(cartera);

       
    }
    actualizarCartera=()=>{
        var sumatoriaTotalRecibir=this.props.cartera.sumatoriaTotalRecibir+this.props.resultados.valorTotalRecibir;
        var tasaCostoEfectivo=calcularTCEA(this.props.misLetras,sumatoriaTotalRecibir);
        return({
            sumatoriaTotalRecibir:sumatoriaTotalRecibir,
            tasaCostoEfectivo:tasaCostoEfectivo,
        })
    }
    render(){
        return(
            <div className="resultados__container">
                <div className="container__title">
                    <h2><span className="bold">Resultados</span> Obtenidos</h2>
                </div>
                <div className="container__content">

                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (TEA)
                            </span> Tasa Efectiva Anual (sin costos)
                        </div>
                        <span className="bold">
                            {(this.props.resultados.tasaEfectiva*100).toFixed(7)}%
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (ND)
                            </span> Días Transcurridos
                        </div>
                        <span className="bold">
                            {this.props.resultados.diasTranscurridos}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (TEP)
                            </span> Tasa Efectiva del Periodo
                        </div>
                        <span className="bold">
                            {(this.props.resultados.tasaEfectivaP*100).toFixed(7)}%
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (d)
                            </span> Tasa Descontada del Periodo
                        </div>
                        <span className="bold">
                            {(this.props.resultados.tasaDescontadaP*100).toFixed(7)}%
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (D)
                            </span> Descuento
                        </div>
                        <span className="bold">
                            {(this.props.resultados.descuento*1).toFixed(2)}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (Rt)
                            </span> Retención
                        </div>
                        <span className="bold">
                            {(this.props.resultados.retencion*1).toFixed(2)}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (CI)
                            </span> Costos Iniciales Totales
                        </div>
                        <span className="bold">
                            {(this.props.resultados.cITotales*1).toFixed(2)}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (VNet)
                            </span> Valor Neto
                        </div>
                        <span className="bold">
                            {(this.props.resultados.valorNeto*1).toFixed(2)}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (VR)
                            </span> Valor Total a Recibir
                        </div>
                        <span className="bold">
                            {(this.props.resultados.valorTotalRecibir*1).toFixed(2)}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (CF)
                            </span> Costos Finales Totales
                        </div>
                        <span className="bold">
                            {(this.props.resultados.cFTotales*1).toFixed(2)}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (VE)
                            </span> Valor Total a Entregar
                        </div>
                        <span className="bold">
                            {(this.props.resultados.valorTotalEntregar*1).toFixed(2)}
                        </span>
                    </div>
                    <br />
                    <div className="container__item">
                        <div className="">
                            <span className="bold">
                                (TCEA)
                            </span> Tasa de Costo Efectivo Anual
                        </div>
                        <span className="bold">
                            {(this.props.resultados.tasaCostoEfectivo*100).toFixed(7)}%
                        </span>
                    </div>
                    <div className="container__button">
                        <button className=" button" onClick={this.handleSubmit}>
                            +
                        </button>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    letra:state.letraActual,
    resultados:state.resultadoActual,
    cartera:state.cartera,
    misLetras:state.misLetras,
})

const mapDispatchToProps=(dispatch)=>({
    handleSubmit(letra, id){
        dispatch(agregarLetra(letra, id));
    },
    agregarACartera(datos){
        dispatch(agregarACartera(datos));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Resultado);