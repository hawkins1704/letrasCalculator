import React from "react";
import {connect}from 'react-redux';
import '../assets/styles/LetrasList.css'
import {eliminarLetra} from '../actions'

class LetrasList extends React.Component{
    render(){
        return (
            <div className="list__container">

            {
                this.props.misLetras.map((letra)=>{

                    return(
                    <div key={letra.id} className="list__item">
                        <h2 className="item__title">
                            Letra {letra.id}
                        </h2>
                        <div className="item__text">
                            <div className="">
                                <span className="bold">
                                    (TEP)
                                </span> Tasa Efectiva
                            </div>
                            <span className="bold">
                                {(letra.tasaEfectivaP*100).toFixed(7)}%
                            </span>
                        </div>
                        <div className="item__text">
                            <div className="">
                                <span className="bold">
                                    (d)
                                </span> Tasa Descontada
                            </div>
                            <span className="bold">
                                {(letra.tasaDescontadaP*100).toFixed(7)}%
                            </span>
                        </div>

                        <div className="item__text">
                            <div className="">
                                <span className="bold">
                                    (D)
                                </span> Descuento
                            </div>
                            <span className="bold">
                                {(letra.descuento*1).toFixed(2)}
                            </span>
                        </div>
                        <div className="item__text">
                            <div className="">
                                <span className="bold">
                                    (VR)
                                </span> Valor Total a Recibir
                            </div>
                            <span className="bold">
                                {(letra.valorTotalRecibir*1).toFixed(2)}
                            </span>
                        </div>
                        <div className="item__text">
                            <div className="">
                                <span className="bold">
                                    (VR)
                                </span> Valor Total a Entregar
                            </div>
                            <span className="bold">
                                {(letra.valorTotalEntregar*1).toFixed(2)}
                            </span>
                        </div>

                        <div className="item__text">
                            <div className="">
                                <span className="bold">
                                    (TCEA)
                                </span> Tasa de Costo Efectivo Anual
                            </div>
                            <span className="bold">
                                {(letra.tasaCostoEfectivo*100).toFixed(7)}%
                            </span>
                        </div>

                        <div className="item__buttons">
                            {/*
                            <button className="button--detalles button" onClick={this.handleSubmit}>
                                Ver más detalles
                            </button>
                            */}
                            <button className="button--eliminar button" onClick={()=>{this.props.eliminarLetra(letra.id)}}>
                                Eliminar
                            </button>
                        </div>
                    </div>

                    )
                    
                })
            }
            </div>
        )
    }

}
const mapStateToProps=(state)=>({
    misLetras:state.misLetras,
})
const mapDispatchToProps=(dispatch)=>({
   eliminarLetra(id){
        dispatch(eliminarLetra(id));
   }
})
export default connect(mapStateToProps,mapDispatchToProps)(LetrasList);