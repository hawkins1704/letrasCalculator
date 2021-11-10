const reducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN_REQUEST':
        {
            return {
                ...state,
                user:action.payload,
            }
        }
        case 'ADD_CGINICIAL':
        {
            return {
                ...state,
                letraActual:{
                    ...state.letraActual,
                    cGIniciales:[
                        ...state.letraActual.cGIniciales,
                        action.payload,
                    ]
                }
            }
        }
        case 'ADD_CGFINAL':
        {
            return {
                ...state,
                letraActual:{
                    ...state.letraActual,
                    cGFinales:[
                        ...state.letraActual.cGFinales,
                        action.payload,
                    ]
                }
            }
        }
        case 'ENVIAR_LETRA':
        {
            return{
                ...state,
                letraActual:{
                    ...state.letraActual,
                    moneda:action.payload.moneda||'soles',
                    fechaEmision:action.payload.fechaEmision,
                    fechaVencimiento:action.payload.fechaVencimiento,
                    valorNominal:parseInt(action.payload.valorNominal)||0,
                    retencion:parseInt(action.payload.retencion)||0,
                    plazoTasa:action.payload.plazoTasa||'diario',
                    tasaEfectiva:(parseInt(action.payload.tasaEfectiva)/100),
                    fechaDescuento:action.payload.fechaDescuento,
                },
            }
        }
        case 'ENVIAR_RESULTADOS_PREVIOS':
        {
            return{
                ...state,
                resultadoActual:{
                    ...state.resultadoActual,
                    tasaEfectiva:(parseInt(action.payload.tasaEfectiva)/100)||0,
                    diasTranscurridos:action.payload.diasTranscurridos||0,
                    retencion:parseInt(action.payload.retencion)||0,
                    moneda:action.payload.moneda||'soles',
                }
            }
        }
        case 'ENVIAR_RESULTADOS_RESTANTES':
        {
            return{
                ...state,
                resultadoActual:{
                    ...state.resultadoActual,
                    tasaEfectivaP:action.payload.tasaEfectivaP,
                    tasaDescontadaP:action.payload.tasaDescontadaP,
                }
            }
        }
        default:
            return state;

    }
}
export default reducer;