export const loginRequest=(payload)=>{
    return {
        type:'LOGIN_REQUEST',
        payload:payload
    }
}
export const addCGInicial=(payload)=>{
    return {
        type:'ADD_CGINICIAL',
        payload:payload,
    }
}
export const addCGFinal=(payload)=>{
    return {
        type:'ADD_CGFINAL',
        payload:payload,
    }
}
export const enviarLetra=(payload)=>{
    return{
        type:'ENVIAR_LETRA',
        payload,
    }
}
export const enviarResultadosPrevios=(payload)=>{
    return{
        type:'ENVIAR_RESULTADOS_PREVIOS',
        payload,
    }
}
export const enviarResultadosRestantes=(payload)=>{
    return{
        type:'ENVIAR_RESULTADOS_RESTANTES',
        payload,
    }
}