import React, { useEffect, useState}  from "react";

/*import 'date-fns';*/
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import {TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {useDispatch, useSelector} from 'react-redux';
import {guardarGastos,totalizarGastos, InsertaDatosLeidos} from '../redux/gastosDucks';
import store  from '../redux/store';

import uuid from "react-uuid"
import Listagastos from "./listagastos";

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


    const Gastos= ({AgregarGasto}) =>{

        const initialStateValue= {id:'', titulo:'', nombre:'',monto:'0', fecha:''}
/*
    //Se va a ejecutar al inicio de la sesion, porque tiene esto [] como parametro
    useEffect(() => {
        //Leo lo que tiene Firebase
        LecturaFireBase();
      },[]);

*/
/*
    const LecturaFireBase= async () =>{
        const citiesCol = collection(db, 'gastos');
        const citySnapshot = await getDocs(citiesCol);

        setGastosLeidos(citySnapshot.docs.map(doc => doc.data()));
    };
*/
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

    const classes = useStyles();

    const[gastosParticular, setGastosParticulares]= useState(initialStateValue);
    /*const[gastosParticular, setGastosParticulares]= useState([]);*/

    const handleonChange = (e) =>{

        e.preventDefault();
        setGastosParticulares({...gastosParticular,[e.target.name] : e.target.value});
    }

    const NewGasto = async () => {

        AgregarGasto({...gastosParticular, id:uuid()});

        setGastosParticulares({...initialStateValue});

        /*
        try {
                //Guardo en Firebase
                const docRef = await addDoc(collection(db, "gastos"), gastosParticular); //Guardo en la Base de Datos
                window.alert("Se agrego a la lista a "+ gastosParticular.nombre + "!!");

                setGastosParticulares(gastosParticular);

                //Guardo en Store
                dispatch(guardarGastos(gastosParticular));

                //Firebase cambio, vuelvo a leer lo que tiene Firebase
          
            } catch (e) {
                console.error("Error adding document: ", e);
            }
*/            
        
    }


    return (
        <>
          <h1>App de Gastos</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField required id="standard-required" label="Titulo" defaultValue="" name="titulo" onChange={handleonChange} value={gastosParticular.titulo}/>
                </div>
                <div>    
                    <TextField required id="standard-required" label="Nombre" defaultValue="" name="nombre" onChange={handleonChange} value={gastosParticular.nombre}/>
                </div>
                <div>
                    <TextField required id="standard-required" label="Monto" defaultValue="" name="monto" onChange={handleonChange} value={gastosParticular.monto}/>
                </div>
                <div>
                    <TextField
                        id="date"
                        name="fecha"
                        label="Fecha"
                        type="date"
                        defaultValue=""
                        className={classes.textField}
                        onChange={handleonChange}
                        InputLabelProps={{
                        shrink: true
                        }}
                    />
                </div>
            </form>

            <Button variant="contained" color="primary" onClick={()=>NewGasto()}>
                Enviar
            </Button>
        
       </>
        
    )
}

export default Gastos;