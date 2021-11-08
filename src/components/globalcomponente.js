import React, { useEffect, useState}  from "react";

import Gastos from "./gastos";

import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
/*
import {TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {useDispatch, useSelector} from 'react-redux';
import {guardarGastos,totalizarGastos, InsertaDatosLeidos} from '../redux/gastosDucks';
import store  from '../redux/store';

import uuid from 'react-uuid'
import Listagastos from "./listagastos";
*/


const Globalcomponente= () =>{


    useEffect(() => {
        //Leo lo que tiene Firebase
        LecturaFireBase();
      },[]);

    const LecturaFireBase= async () =>{
        const citiesCol = collection(db, 'gastos');
        const citySnapshot = await getDocs(citiesCol);

        console.log("LecturaFireBase=", citySnapshot.docs.map(doc => doc.data()));
    };


    const addGasto=  async (objetoGasto) => {
        console.log("En Globalcomponente-addGasto ");

        console.log("En Globalcomponente-objetoGasto=",objetoGasto);
/*
        try {
*/           


                //Guardo en Firebase
                const docRef = await addDoc(collection(db, "gastos"), objetoGasto); //Guardo en la Base de Datos
                window.alert("Se agrego a la lista a "+ objetoGasto.nombre + "!!");

                /*setGastosParticulares(gastosParticular);*/

                //Guardo en Store
                /*dispatch(guardarGastos(gastosParticular));*/

                //Firebase cambio, vuelvo a leer lo que tiene Firebase
                //LecturaFireBase();
/*
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        */
        
    }

    return(
        <Gastos AgregarGasto={addGasto}/>

    )
}

export default Globalcomponente;