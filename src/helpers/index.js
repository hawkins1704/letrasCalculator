import algebra, { Equation } from 'algebra.js';
import nerdamer from 'nerdamer/all.min';
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

export const convertirNominalAEfectiva=(plazoTasa,tasa,capitalizacion)=>{
    console.log("Estoy convirtiendo");
    console.log("Recibi: ",plazoTasa,tasa,capitalizacion);
    var diasTasaN=0;
    switch(plazoTasa){
        case 'diario':diasTasaN=1;break;
        case 'mensual':diasTasaN=30;break;
        case 'bimestral':diasTasaN=60;break;
        case 'trimestral':diasTasaN=90;break;
        case 'cuatrimestral':diasTasaN=120;break;
        case 'semestral':diasTasaN=180;break;
        case 'anual':diasTasaN=360;break;
        default:break;
    }
    console.log(((tasa/100)/(diasTasaN/capitalizacion)));
    return (Math.pow(1+((tasa/100)/(diasTasaN/capitalizacion)),(diasTasaN/capitalizacion))-1);
}

export const calcularTCEA=(letras,sumatoriaTotalRecibir)=>{
     if(letras.length===1){
         console.log(letras[0].tasaCostoEfectivo);
         return letras[0].tasaCostoEfectivo
     }
     console.log(letras);
     console.log("Sumatoria total a Recibir:",sumatoriaTotalRecibir);
     var eq=nerdamer(`sum=${sumatoriaTotalRecibir}`);
     var sum='';
     var ter='';
     for(var i=0;i<letras.length;i++)
     {   
         ter=`(${letras[i].valorTotalEntregar})/((1+x)^${letras[i].diasTranscurridos/360})`;
         sum+=`+${ter}`;
        // console.log(sum);
     }
     eq=eq.evaluate({sum:sum})
     var sol=eq.solveFor('x');
    // var eq= nerdamer.solveEquations('x^(-2)+2=11');
    var tcea=sol[1].symbol.multiplier.num/sol[1].symbol.multiplier.den;
    return tcea;

}