import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';

const initialState={
  "hasUser":false,
  "user":{},
  "letraActual":{
      moneda:"",
      fechaEmision:"",
      fechaVencimiento:"",
      valorNominal:"",
      retencion:"",
      plazoTasa:"",
      tasaEfectiva:"",
      fechaDescuento:"",
      cGIniciales:[],
      cGFinales:[]
  },
  "resultadoActual":{
      moneda:"",//
      tasaEfectiva:"",//
      diasTranscurridos:0,//
      tasaEfectivaP:"",///
      tasaDescontadaP:"",///
      descuento:"",///
      retencion:"",//
      cITotales:"",///
      valorNeto:"",///
      valorTotalRecibir:"",///
      cFTotales:"",///
      valorTotalEntregar:"",///
      tasaCostoEfectivo:"",
  },
  "misLetras":[],

}
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store=createStore(reducer,initialState,composeEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


