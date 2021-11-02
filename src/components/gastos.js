import React, { useState } from "react";
/*import 'date-fns';*/
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import {TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

    const classes = useStyles();

    const[gastosParticular, setGastos]= useState({id:uuid(), titulo:'', nombre:'',monto:'', fecha:''});

    const handleonChange = (e) =>{

        e.preventDefault();
        console.log("En handleonChange ");

        console.log("e.target.name=", e.target.name);
        
        console.log("e.target.value=", e.target.value);

        setGastos({...gastosParticular,[e.target.name] : e.target.value});
    }

    const addorEditGastos = async () => {

        try {
                const docRef = await addDoc(collection(db, "gastos"), gastosParticular);
                /*console.log("Document written with ID: ", docRef.id);*/
                window.alert("Document written with ID: ", docRef.id);
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

        <Button variant="contained" color="secondary">
            Totalizar
        </Button>

        </>
        
        
    )
}

export default Gastos;