import React, { useEffect, useState}  from "react";

import Gastos from "./gastos";

import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Listagastos from "./listagastos";

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

    const initialEstado= [];

    const [gastos, setGastos] = useState(initialEstado);

    const [total, setTotal] = useState(0);

    const [cantpersonas, setCantidadPersonas] = useState(0);

    const [totalporpersona, setTotalPorPersona]=useState(0);


    useEffect(() => {
        //Leo lo que tiene Firebase
        LecturaFireBase();
      },[]);

    const LecturaFireBase= async () =>{
        //Leo lo que tiene Firebase
        const citiesCol = collection(db, 'gastos');
        const citySnapshot = await getDocs(citiesCol);

        console.log(citySnapshot.docs.map(doc => doc.data()));

        setGastos(citySnapshot.docs.map(doc => doc.data()));
        //console.log("gastos=", gastos); devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en sacar gastos

        console.log(citySnapshot.docs.map(doc => doc.data().monto));

        setTotal(( citySnapshot.docs.map(doc => Number(doc.data().monto)).reduce(function (previous, current) {
            return previous + current;
        }, 0)));

        //setCantidadPersonas(gastos.length); devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en armar gastos 
        //console.log("gastos.length=", gastos.length); devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en armar gastos 

        setCantidadPersonas(citySnapshot.docs.map(doc => doc.data().monto).length);

        //setTotalPorPersona(total/cantpersonas);devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en armar total y cantperesona 
        //console.log("totalporpersona=", totalporpersona);
        setTotalPorPersona((citySnapshot.docs.map(doc => Number(doc.data().monto)).reduce(function (previous, current) {
            return previous + current;
        }, 0))/(citySnapshot.docs.map(doc => doc.data().monto).length).toFixed(2));

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


                LecturaFireBase();
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
        <>
        <Gastos AgregarGasto={addGasto}/>
        <Listagastos MostrarGastos={gastos}  MostrarTotal={total} CantPersonas={cantpersonas} TotalPorPersona={totalporpersona}/> 
        </>
        )
}

export default Globalcomponente;