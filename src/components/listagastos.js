import React, { useEffect, useState}  from "react";
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';

import {TextField,Button, ClickAwayListener} from '@material-ui/core';

import {useDispatch, useSelector} from 'react-redux';
import {guardarGastos, totalizarGastos} from '../redux/gastosDucks';
import store  from '../redux/store';

const columns = [
    {
      id: 1,
      field: 'titulo',
      headerName: 'Titulo',
      width: 150,
      editable: true,
    },
    {
      id: 2,
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: true,
    },
    {
      id: 3,
      field: 'monto',
      headerName: 'Monto',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      id: 4,
      field: 'fecha',
      width: 150,
      headerName: 'Fecha',
      description: 'This column has a value getter and is not sortable.',
    },
    {
      id:5,
      field: 'Resta',
      width: 150,
      headerName: 'Abono',
      description: 'This column has a value getter and is not sortable.',
    }
    /*
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'nombre') || ''} ${
          params.getValue(params.id, 'titulo') || ''
        }`,
    },
    */
  ];


const Listagastos= ()=> {

    const dispatch = useDispatch();
      
    const gastos_puro=useSelector(store=>store);
    console.log("gastos_puro=", gastos_puro);
    
    const gastos=useSelector(store=>store.gastosRedux.gastos); //EL store, apunta al unico reducer declarado "gastosRedux" y gastosRedux apunta al reducer gastosReducer
    //y gastosReducer esta definido en el archivo gastosDucks.js
    console.log("gastos=", gastos);

    const totalizo=useSelector(store=>store.gastosRedux.total);

    console.log("totalizo=", totalizo);

    const [rowGastos,setRowGastos] = useState([]);

    
    /*const [rowMontos,setRowMontos] = useState([]);*/
    /*const [montoTotal,setMontoTotal]= useState(0);*/

    const [montoIndividual_1, setMontoIndividual]= useState({monto:''});
    
        // De forma similar a componentDidMount y componentDidUpdate
        useEffect( async () => {
          //Leer documentos
          const citiesCol = collection(db, 'gastos');
          const citySnapshot = await getDocs(citiesCol);
    
          //dispatch(leerGastos()); //Leo los gastos de la BD

          setRowGastos(citySnapshot.docs.map(doc => doc.data()));

/*          dispatch(guardarGastos(citySnapshot.docs.map(doc => doc.data())));*/

          //dispatch(totalizarGastos());
/*
          dispatch(totalizarGastos(citySnapshot.docs.map(doc => doc.data())));
*/        

        },[]);

    const Dale = async () => {

      console.log("rowGastos=", rowGastos);

    }


    return (
        <>
         {/*
         <div>
          <TextField required id="standard-required" label="TotalxPersona" defaultValue={montoIndividual_1} name="TotalxPersona" />
         </div>
         */}
         <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rowGastos}
                /*{citySnapshot.docs.map(doc => rows= doc.data())} /*{citySnapshot.docs.map(doc => doc.data().titulo)}*/
                columns={columns}
                pmontoSize={5}
                rowsPerPmontoOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>

        <h1>Total: {totalizo}</h1>

        </>
      );

}

export default Listagastos;
