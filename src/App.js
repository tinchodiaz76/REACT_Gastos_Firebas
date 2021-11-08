import logo from './logo.svg';
import './App.css';
/*import {firebaseConfig} from './firebase';*/

import Globalcomponente from './components/globalcomponente';
import Gastos from './components/gastos';
import Listagastos from './components/listagastos';
import generateStore from './redux/store';
import {Provider} from 'react-redux';
import React, { useState}  from "react";

function App() {
  const store= generateStore()
  /*
  const [gastosLeidos,setGastosLeidos]=useState([]);

  const [totalizo,setTotalizo]=useState(0);

  const TotalGastos= ()=>{
    var array_montos= gastosLeidos.map(function (task) {

      return Number(task.monto); 
  
    });

    var totalizo= array_montos.reduce(function (previous, current) {
        return previous + current;
    }, 0);

    console.log("totalizo=", totalizo);
    setTotalizo(totalizo);
  }
*/
  return (
    <>
    <Provider store={store}>
      <Globalcomponente />
      {/*
      <Gastos setGastosLeidos={setGastosLeidos}/>
      <Listagastos setGastosLeidos={setGastosLeidos} gastosLeidos={gastosLeidos} TotalGastos={TotalGastos} totalizo={totalizo}/>
      */}
    </Provider>
    </>
  );
}

export default App;
