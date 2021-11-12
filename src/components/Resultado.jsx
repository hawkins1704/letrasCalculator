import React from 'react';
import {connect} from 'react-redux';
import {agregarLetra} from '../actions';
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
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.handleSubmit(this.props.resultados,this.state.id);
       
    }
    render(){
        return(
            <div className="container">
                <div className="container__title">
                    <h2>Resultados Obtenidos</h2>
                </div>

                <div className="container__item">
                    <span className="bold">
                        (TEA)
                    </span> Tasa Efectiva Anual (sin costos)
                    <span className="bold">
                        {this.props.resultados.tasaEfectiva*100}%
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (ND)
                    </span> Días Transcurridos
                    <span className="bold">
                        {this.props.resultados.diasTranscurridos}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (TEP)
                    </span> Tasa Efectiva del Periodo
                    <span className="bold">
                        {(this.props.resultados.tasaEfectivaP*100).toFixed(7)}%
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (d)
                    </span> Tasa Descontada del Periodo
                    <span className="bold">
                        {(this.props.resultados.tasaDescontadaP*100).toFixed(7)}%
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (D)
                    </span> Descuento
                    <span className="bold">
                        {(this.props.resultados.descuento*1).toFixed(2)}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (Rt)
                    </span> Retención
                    <span className="bold">
                        {(this.props.resultados.retencion*1).toFixed(2)}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (CI)
                    </span> Costos Iniciales Totales
                    <span className="bold">
                        {(this.props.resultados.cITotales*1).toFixed(2)}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (VNet)
                    </span> Valor Neto
                    <span className="bold">
                        {(this.props.resultados.valorNeto*1).toFixed(2)}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (VR)
                    </span> Valor Total a Recibir
                    <span className="bold">
                        {(this.props.resultados.valorTotalRecibir*1).toFixed(2)}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (CF)
                    </span> Costos Finales Totales
                    <span className="bold">
                        {(this.props.resultados.cFTotales*1).toFixed(2)}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (VE)
                    </span> Valor Total a Entregar
                    <span className="bold">
                        {(this.props.resultados.valorTotalEntregar*1).toFixed(2)}
                    </span>
                </div>
                <br />
                <div className="container__item">
                    <span className="bold">
                        (TCEA)
                    </span> Tasa de Costo Efectivo Anual
                    <span className="bold">
                        {(this.props.resultados.tasaCostoEfectivo*100).toFixed(7)}%
                    </span>
                </div>
                <div className="container__item">
                    <button className="container__button button" onClick={this.handleSubmit}>
                        +
                    </button>
                </div>
                <br />
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    letra:state.letraActual,
    resultados:state.resultadoActual,
})

const mapDispatchToProps=(dispatch)=>({
    handleSubmit(letra, id){
        dispatch(agregarLetra(letra, id));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Resultado);