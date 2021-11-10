export const convertirTasaEfectiva=(tasaI,plazoTasa,diasTasaP)=>{
    
    var diasTasaE=0;
    switch(plazoTasa){
        case 'diario':diasTasaE=1;break;
        case 'mensual':diasTasaE=30;break;
        case 'bimestral':diasTasaE=60;break;
        case 'trimestral':diasTasaE=90;break;
        case 'cuatrimestral':diasTasaE=120;break;
        case 'semestral':diasTasaE=180;break;
        case 'anual':diasTasaE=360;break;
        default:break;
    }
    return (Math.pow((1+tasaI),(diasTasaP/diasTasaE))-1);
}
export const calcularTasaDescontada=(tasa)=>{

    return tasa/(1+tasa);
}