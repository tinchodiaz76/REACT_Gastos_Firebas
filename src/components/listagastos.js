import React, { useEffect, useState}  from "react";

//Se usa para la BD
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

import {useDispatch, useSelector} from 'react-redux';
import {guardarGastos, totalizarGastos} from '../redux/gastosDucks';
import store  from '../redux/store';

//Componente de Material UI
import {TextField,Button, ClickAwayListener} from '@material-ui/core';
//import { DataGrid } from '@mui/x-data-grid';
//Estilos de Material UI
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


//Modal deBoostrap
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

//Genera un identificador
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


const Listagastos= ({setGastosLeidos,gastosLeidos,TotalGastos,totalizo})=> {
  
    //Se va a ejecutar al inicio de la sesion, porque tiene esto [] como parametro
    useEffect(() => {
        //Leo lo que tiene Firebase
        LecturaFireBase();
      },[]);

    const LecturaFireBase= async () =>{
        const citiesCol = collection(db, 'gastos');
        const citySnapshot = await getDocs(citiesCol);

        setGastosLeidos(citySnapshot.docs.map(doc => doc.data()));
    };

/*
  useEffect(() => {
    //Leo lo que tiene Firebase
    TotalGastos();
  },[]);
*/

    const classes = useStyles();

    const dispatch = useDispatch();
      
    const gastos_puro=useSelector(store=>store);
    //console.log("gastos_puro=", gastos_puro);
    
    const gastos=useSelector(store=>store.gastosRedux.gastos); //EL store, apunta al unico reducer declarado "gastosRedux" y gastosRedux apunta al reducer gastosReducer
    //y gastosReducer esta definido en el archivo gastosDucks.js
    //console.log("gastos=", gastos);

    //const totalizo=useSelector(store=>store.gastosRedux.total);

    //console.log("totalizo=", totalizo);

    const[gastosParticular, setGastosParticulares]= useState({id:uuid(), titulo:'', nombre:'',monto:'0', fecha:''});

    /*const [rowGastos,setRowGastos] = useState([]);*/
        
    //Se usa para el MODAL
    const [show, setShow] = useState(false);
    //Se usa para el MODAL
    const handleClose = () => setShow(false);
    //Se usa para el MODAL
    const handleShow = () => setShow(true);

    const handleonChange = (e) =>{
      e.preventDefault();
      setGastosParticulares({...gastosParticular,[e.target.name] : e.target.value});
    }

    const AgregarParticipante= async ()=>{
      console.log("gastosParticular=", gastosParticular);

      const docRef = await addDoc(collection(db, "gastos"), gastosParticular); //Guardo en la Base de Datos
    
      dispatch(guardarGastos(gastosParticular));
      
      window.alert("Se agrego el Participante");

      setShow(false);
    }

    return (
        <>
   
         <div>
         <Button variant="contained" color="primary" onClick={handleShow}>
            Agregar Participante
        </Button>
        </div>

        <h1>El total es {totalizo}</h1>

        <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Titulo</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gastosLeidos.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.titulo}
                      </TableCell>
                      <TableCell align="right">{row.nombre}</TableCell>
                      <TableCell align="right">{row.monto}</TableCell>
                      <TableCell align="right">{row.fecha}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
        

        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Participante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={AgregarParticipante}>
                Agregar
              </Button>
            </Modal.Footer>
        </Modal>

        </>
      );

}

export default Listagastos;
