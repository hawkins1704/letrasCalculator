import React from "react";

class CGList extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            CGIniciales:[{
                motivo:'G.Administrativos',
                valorNominal:2000,
            }],
            motivo:'',
            valorNominal:'',
        }
    }
    handleAdd=e=>{
        e.preventDefault();
        this.setState({
            ...this.state,
            CGIniciales:[...this.state.CGIniciales,
                {
                    motivo:this.state.motivo,
                    valorNominal:this.state.valorNominal
                }],
            })
    }

    handleChange=e=>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        })
    }
    
    render(){
        return(
            <form action="">

                <div className="form__section--label">
                    <label htmlFor="motivo">Motivo: </label>
                    <input type="text" name="motivo" id="motivo" onChange={this.handleChange}/>
                </div>
                <div className="form__section--label">
                    <label htmlFor="valorNominal">Valor Nominal: </label>
                    <input type="text" name="valorNominal" id="valorNominal" onChange={this.handleChange}/>
                </div>
                <button onClick={this.handleAdd}>
                    Agregar
                </button>
                <select name="listaCGIniciales" style={{width:"368px"}} size="5" id="listaCGIniciales" >
                    {
                        this.state.CGIniciales.map((item)=>{
                            return(
                                <option value={item.valorNominal} name={item.motivo}>{item.motivo} - {item.valorNominal}</option>
                            )
                        })
                    }
                </select>
            </form>
        )
    }
    

}
export default CGList;