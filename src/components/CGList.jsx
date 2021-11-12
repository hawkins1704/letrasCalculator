import React from "react";
import {addCGInicial,addCGFinal} from '../actions';
import {connect} from 'react-redux';
import '../assets/styles/components/CGList.css';

class CGList extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            motivo:'',
            valorNominal:''
        }
    }


    handleInput=e=>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=e=>{
        e.preventDefault();
        switch(this.props.type){
            case 'Iniciales':this.props.addCGInicial(this.state);break
            case 'Finales':this.props.addCGFinal(this.state);break
            default:return;
        }
    }
    render(){
        return(
            <form >

                <div className="form__section--label">
                    <label htmlFor="motivo">Motivo: </label>
                    <input type="text" name="motivo" id="motivo" onChange={this.handleInput}/>
                </div>
                <div className="form__section--label">
                    <label htmlFor="valorNominal">Valor Nominal: </label>
                    <input type="text" name="valorNominal" id="valorNominal" onChange={this.handleInput}/>
                </div>
                <div className="listContainer">
                    <button className="listContainer__button" onClick={this.handleSubmit}>
                        +
                    </button>
                    <div className="listContainer__list" >
                        {
                            this.props.type==='Iniciales'?
                            this.props.CGIniciales.map((item, index)=>{
                                return(
                                    <div key={index} >{item.motivo} - {item.valorNominal}</div>
                                    )
                                }):
                                this.props.CGFinales.map((item,index)=>{
                                    return(
                                        <div key={index}>{item.motivo} - {item.valorNominal}</div>
                                        )
                                    })
                                }
                    </div>
                </div>
            </form>
        )
    }
    

}
const mapStateToProps=(state)=>({
    CGIniciales:state.letraActual.cGIniciales,
    CGFinales:state.letraActual.cGFinales,
})
const mapDispatchToProps=(dispatch)=>({
    addCGInicial(CGInicial){
        dispatch(addCGInicial(CGInicial));
    },
    addCGFinal(CGFinal){
        dispatch(addCGFinal(CGFinal));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CGList);