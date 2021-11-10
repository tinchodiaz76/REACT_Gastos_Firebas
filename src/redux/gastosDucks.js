import axios from 'axios';
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../firebase";
//Constantes
const initialValues={
    gastos:[],/*{id:'',titulo:'',nombre:'',monto:'', fecha:''},*/
    total:0,
}

const GUARDAR_GASTOS='GUARDAR_GASTOS';
const TOTALIZAR='TOTALIZAR';
const LEERGASTOS='LEERGASTOS';
const INSERTA_DATOS_LEIDOS='INSERTA_DATOS_LEIDOS';


//Reducers Los REDUCERS modifican el state
export default function gastosReducer (state= initialValues, action){

    switch(action.type){
        case GUARDAR_GASTOS:

            console.log("action.payload.gastosGuardar=", action.payload.gastosGuardar);    
            return {...state, gastos:[...state.gastos, action.payload.gastosGuardar]};
/*
        case INSERTA_DATOS_LEIDOS:

            console.log("action.payload.gastosLeido=", action.payload.gastosLeidos);
            
            return {...state, gastos:[...state.gastos,action.payload.gastosLeidos]};
*/
/*
        case TOTALIZAR:

            var array_montos= state.gastos.map(function (task) {

                return Number(task.monto); 
            
            });

            console.log("montos=", array_montos);


            var totalizo= array_montos.reduce(function (previous, current) {
                return previous + current;
            }, 0);
            

            return {...state, total:totalizo };

            ///*const reduced = state.gastos.reduce((prev, next) => prev + next, 0);
*/
        default:
            return state
    };
    console.log("state_____2=", state);
}

//Acciones
/*Los primeros dos parentesis reciben parametros de entrada*/
/*Lo segundos dos parentesis son parametros de salida*/
export const guardarGastos = (gastos_p)=> async (dispatch, getState)=>{
    
        /*const resp= await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')*/
        /*const resp= await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)*/
        dispatch({
            type: GUARDAR_GASTOS,
            payload:{gastosGuardar: gastos_p}
        });
};

export const InsertaDatosLeidos =(gastos_pi) => async (dispatch,getState)=> {
    dispatch({
        type: INSERTA_DATOS_LEIDOS,
        payload:{gastosLeidos: gastos_pi}
    });
};

/*
export const totalizarGastos =()=> async  (dispatch, getState)=>{
    dispatch({
        type: TOTALIZAR
    });
//  console.log("totalizarGastos...getState().gastos-2=", getState().total)
}
*/