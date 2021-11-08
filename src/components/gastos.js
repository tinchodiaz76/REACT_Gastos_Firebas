import React, { useEffect, useState}  from "react";

/*import 'date-fns';*/
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import {TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {useDispatch, useSelector} from 'react-redux';
import {guardarGastos,totalizarGastos, InsertaDatosLeidos} from '../redux/gastosDucks';
import store  from '../redux/store';

import uuid from 'react-uuid'

    const useStyles = makeStyles((theme) => ({
        root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& > span': {
            margin: theme.spacing(2),
          },
          textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
          },
        },
    }));

const Gastos= () =>{

    const dispatch = useDispatch();
    
    const gastos_puro=useSelector(store=>store);
/*    
    console.log("gastos_puro=", gastos_puro);
*/    
    const gastos=useSelector(store=>store.gastosRedux.gastos); //EL store, apunta al unico reducer declarado "gastosRedux" y gastosRedux apunta al reducer gastosReducer
                                                                //y gastosReducer esta definido en el archivo gastosDucks.js
/*
    console.log("gastos=", gastos);
*/
    const totalizo=useSelector(store=>store.gastosRedux.total);
/*
    console.log("totalizo=", totalizo);
*/
    const classes = useStyles();

    const[gastosParticular, setGastosParticulares]= useState({id:uuid(), titulo:'', nombre:'',monto:'0', fecha:''});
    /*const[gastosParticular, setGastosParticulares]= useState([]);*/

    const[gastosLeidos, setGastosLeidos]=useState([]);


    useEffect( async () => {
        //Leer documentos
        const citiesCol = collection(db, 'gastos');
        const citySnapshot = await getDocs(citiesCol);
  
        console.log("citySnapshot.docs.map(doc => doc.data())=", citySnapshot.docs.map(doc => doc.data()));

        setGastosLeidos(citySnapshot.docs.map(doc => doc.data()));

         //Leo los gastos de la BD
        /* dispatch(InsertaDatosLeidos(gastosLeidos)); // No llega a completar gastosLeidos....por eso lo invoco en addorEditGastos*/
      },[]);


    const handleonChange = (e) =>{

        e.preventDefault();
        setGastosParticulares({...gastosParticular,[e.target.name] : e.target.value});
    }

    const addorEditGastos = async () => {

        try {

            console.log("gastosLeidos=",gastosLeidos); 
            console.log("gastosLeidos.lenght=", gastosLeidos.length);
/*
                if (gastosLeidos.length>0)
                {
                dispatch(guardarGastos(gastosLeidos));
                }
*/                
                const docRef = await addDoc(collection(db, "gastos"), gastosParticular); //Guardo en la Base de Datos
                window.alert("Document written with ID: ", docRef.id);
                //Guardo en el STORE

                setGastosParticulares(gastosParticular);

                dispatch(guardarGastos(gastosParticular));
/*
                dispatch(totalizarGastos());
*/
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        
    }

    return (
        <>
          <h1>App de Gastos</h1>
          <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField required id="standard-required" label="Titulo" defaultValue="" name="titulo" onChange={handleonChange} />
                </div>
                <div>    
                    <TextField required id="standard-required" label="Nombre" defaultValue="" name="nombre" onChange={handleonChange} />
                </div>
                <div>
                    <TextField required id="standard-required" label="Monto" defaultValue="" name="monto" onChange={handleonChange} />
                </div>
                <div>
                    <TextField
                        id="date"
                        name="fecha"
                        label="Birthday"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        onChange={handleonChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>

                </form>

        <Button variant="contained" color="primary" onClick={()=>addorEditGastos()}>
            Enviar
        </Button>

        <Button variant="contained" color="secondary" onClick={()=> dispatch(totalizarGastos())}>
            Totalizar
        </Button>

        <h1>Total: {totalizo}</h1>

        </>
        
        
    )
}

export default Gastos;