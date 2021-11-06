import React from "react";
import { Link } from "react-router-dom";
import CGList from "../components/CGList";

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            moneda:"soles",
        }
    }

    handleInput=e=>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value,
        })
    }

    handleSubmit=e=>{
        e.preventDefault();
    }
    render(){
        return (
            <div className="home">
                <div className="home__container">
                    <form onSubmit={this.handleSubmit} className="home__container--form">
                        <div className="form__section">
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
                                <label htmlFor="valorNominal">Dias por año: </label>
                                <select name="DiasPorAnio" id="" onChange={this.handleInput}>
                                    <option value="360">360</option>
                                    <option value="365">365</option>
                                </select>
                            </div>

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
                            <CGList/>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default Home;