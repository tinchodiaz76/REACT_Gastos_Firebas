import React, { useEffect, useState}  from "react";

import Gastos from "./gastos";

import db from "../firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc,updateDoc  } from "firebase/firestore";
import Listagastos from "./listagastos";
import { ContactsOutlined } from "@material-ui/icons";

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

    const [montototal, setMontoTotal] = useState(0);

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
        //console.log("gastos=", gastos); devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en hacer el MAP

        console.log("Array Montos=", citySnapshot.docs.map(doc => doc.data().monto));

        setMontoTotal(( citySnapshot.docs.map(doc => Number(doc.data().monto)).reduce(function (previous, current) {
            return previous + current;
        }, 0)));

        //setCantidadPersonas(gastos.length); devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en armar gastos 
        //console.log("gastos.length=", gastos.length); devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en armar gastos 

        setCantidadPersonas(citySnapshot.docs.map(doc => doc.data().monto).length);

        //setTotalPorPersona(total/cantpersonas);devuelve 0,ya que se ejecuta mas rapido,que lo que tarda en armar total y cantperesona 
        //console.log("totalporpersona=", totalporpersona);

        if ((citySnapshot.docs.map(doc => doc.data().monto).length)===0) {
            setTotalPorPersona(0);
        }
        else
        {
            setTotalPorPersona((citySnapshot.docs.map(doc => Number(doc.data().monto)).reduce(function (previous, current) {
                return previous + current;
            }, 0))/(citySnapshot.docs.map(doc => doc.data().monto).length).toFixed(2));
        }
    };



    const addGasto=  async (objetoGasto) => {
        console.log("En Globalcomponente-addGasto ");

        console.log("En Globalcomponente-objetoGasto=",objetoGasto);
        try {

             //Guardo en Firebase
                const docRef = await addDoc(collection(db, "gastos"), objetoGasto); //Guardo en la Base de Datos
                window.alert("Se agrego a la lista a "+ objetoGasto.nombre + "!!");

                LecturaFireBase();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
    }

    const deleteregister= async (id)=>{
        //Leo lo que tiene Firebase
        var v_id='';

        //Listo todos los documentos que tengan el campo ID, igual al parametro que le paso a la funcion
        const q = query(collection(db, "gastos"), where("id", "==", id));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        v_id= doc.id;  //Si ponia deleteDoc(doc(db, "gastos", v_id)); no andaba.
        });
        
        await deleteDoc(doc(db, "gastos", v_id));
        window.alert("Se elimino el registro");

        LecturaFireBase();
    }
    
    const modifyregister =async (registro)=> {
        var v_id='';
        console.log("modifyregister-registro=", registro.id);
 
        const q = query(collection(db, "gastos"), where("id", "==", registro.id));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            v_id= doc.id;  //Si ponia deleteDoc(doc(db, "gastos", v_id)); no andaba.
        })


        await updateDoc(doc(db, "gastos", v_id),{
            titulo: registro.titulo,
            nombre: registro.nombre,
            monto: registro.monto,
            fecha: registro.fecha,
          });

          window.alert("Se modifico el registro");

          LecturaFireBase();
    }
    
    return(
        <>
        <Gastos AgregarGasto={addGasto}/>
        <Listagastos MostrarGastos={gastos}  MostrarTotal={montototal} CantPersonas={cantpersonas} TotalPorPersona={totalporpersona} EliminoRegistro={deleteregister} GraboRegistro={modifyregister}/>
        </>
        )
}

export default Globalcomponente;