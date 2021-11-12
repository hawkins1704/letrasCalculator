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
        payload:payload,
    }
}
export const enviarResultadosRestantes=(payload)=>{
    return{
        type:'ENVIAR_RESULTADOS_RESTANTES',
        payload:payload,
    }
}
export const LogoutRequest=(payload)=>{
    return{
        type:'HANDLE_LOGOUT',
        payload,
    }
}
export const agregarLetra=(payload)=>{
    return{
        type:'AGREGAR_LETRA',
        payload,
    }
}
export const eliminarLetra=(payload)=>{
    return{
        type:'ELIMINAR_LETRA',
        payload,
    }
}