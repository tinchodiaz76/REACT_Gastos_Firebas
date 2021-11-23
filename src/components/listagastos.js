import React, { useEffect, useState}  from "react";

import {TextField,Button, ClickAwayListener,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@material-ui/core';
//import { DataGrid } from '@mui/x-data-grid';
//Estilos de Material UI
import { makeStyles } from '@material-ui/core/styles';


//Modal deBoostrap
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
//@material-ui/icons/Delete,
import { Delete, AccessAlarm, ThreeDRotation, HourglassEmpty } from '@material-ui/icons';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import db from "../firebase";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'

import { doc, getDoc, deleteDoc, collection, query, where, getDocs} from "firebase/firestore";

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

const Listagastos= ({MostrarGastos,MostrarTotal, CantPersonas,TotalPorPersona, EliminoRegistro, GraboRegistro})=> {

    const[id, setId]= useState("");
    const[titulo, setTitulo]= useState("");
    const[nombre, setNombre]= useState("");
    const[monto, setMonto]= useState("");
    const[fecha, setFecha]= useState("");

    const[gastomodificado,setGastoModificado]=useState([]);
    
    const classes = useStyles();

    //Se usa para el MODAL
    const [show, setShow] = useState(false);
    //Se usa para el MODAL
    const handleClose = () => setShow(false);
    //Se usa para el MODAL
    const handleShow = () => setShow(true);
    //Se usa para el MODAL

    const valorIndividual =(monto)=>{
          return (monto - TotalPorPersona);
    }

    const EditRegister = (registro) =>{

      setGastoModificado({...gastomodificado,id:registro.id, titulo:registro.titulo, nombre:registro.nombre, monto:registro.monto, fecha:registro.fecha});

      console.log("gastomodificado=", gastomodificado);

      handleShow(); //Muestra el Modal
    }

    const DeleteRegister= (registro)=>{
      if (window.confirm("Esta seguro de que desea eliminar a "+ registro.nombre))
      {
          EliminoRegistro(registro.id);
      }
    }

    const SaveRegister = ()=>{
      console.log("SaveRegister---->gastomodificado=", gastomodificado);      
      GraboRegistro(gastomodificado);
      handleClose();  //Cierro el Modal
    }

    const validationSchema = yup.object().shape({
      titulo: yup.string().required("Por favor ingresa el Titulo")
                          .min(3,"El Titulo debe tener como minimo 2 caracteres")
                          .max(20,"El Titulo debe tener menos de 20 caracteres"),
      nombre: yup.string().required("Por favor ingresa el Nombre")
                          .min(3,"El Nombre debe tener como minimo 2 caracteres")
                          .max(40,"El Nombre debe tener menos de 40 caracteres"),
      monto: yup.number().required("Por favor ingresa el Monto")
                          .min(1,"El Monto no debe ser menor a $1")
                          .max(99999,"El Monto no debe ser superior a $99999"),
      fecha: yup.date().required("Por favor ingresa la Fecha")
    });


    const initialValues = {
      id: gastomodificado.id,
      titulo: gastomodificado.titulo,
      nombre: gastomodificado.nombre,
      monto: gastomodificado.monto,
      fecha: gastomodificado.fecha,
      };


    return (
        <>
        <div>
            <h2>Total: {MostrarTotal}</h2>
            <h2>Cantidad de Personas: {CantPersonas}</h2>
            <h2>Total por Persona: {TotalPorPersona}</h2>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Titulo</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                    <TableCell align="right">Adeuda</TableCell>
                    <TableCell align="right">Editar</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MostrarGastos.map((row) => (
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
                      <TableCell align="right">{valorIndividual(row.monto)}</TableCell>
                      <TableCell align="right"><EditIcon onClick={()=>EditRegister(row)} /></TableCell>
                      <TableCell align="right"><DeleteIcon onClick={()=>DeleteRegister(row)}/></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
                   
        
        <Modal show={show} onHide={handleClose}>
        <Formik async
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    //setGastoModificado({...values});
                    //SaveRegister();
                    GraboRegistro({...values});
                    handleClose();  //Cierro el Modal
                  }}
            >
                 {({ touched, errors, isSubmitting, handleBlur }) => (
          <Form>
                <Modal.Header closeButton>
                  <Modal.Title>Agregar Participante</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField required id="standard-required" label="IDs"  name="id" defaultValue={gastomodificado.id} hidden/>
                        </div>

                        <div>
                            <label htmlFor="titulo">Titulo</label>
                            <Field
                            type="text"
                            name="titulo"
                            defaultValue={gastomodificado.titulo}
                            className={`form-control ${
                                touched.titulo && errors.titulo ? "is-invalid" : ""
                            }`}
                            />
                            <ErrorMessage
                            component="div"
                            name="titulo"
                            className="invalid-feedback"
                            />
                        </div>
                         
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                            type="text"
                            name="nombre"
                            defaultValue={gastomodificado.nombre}
                            className={`form-control ${
                                touched.nombre && errors.nombre ? "is-invalid" : ""
                            }`}
                            />
                            <ErrorMessage
                            component="div"
                            name="nombre"
                            className="invalid-feedback"
                            />
                        </div>
                  
                        <div>
                            <label htmlFor="monto"> Monto</label>
                            <Field
                            type="text"
                            name="monto"
                            defaultValue={gastomodificado.monto}
                            className={`form-control ${
                                touched.monto && errors.monto ? "is-invalid" : ""
                            }`}
                            />
                            <ErrorMessage
                            component="div"
                            name="monto"
                            className="invalid-feedback"
                            />
                        </div>

                        <div>
                            <label htmlFor="fecha"> Fecha</label>
                            <Field
                            id="date"
                            type="date"
                            name="fecha"
                            defaultValue={gastomodificado.fecha}
                            InputLabelProps={{
                              shrink: true,
                              }}
                            className={`form-control ${
                                touched.fecha && errors.fecha ? "is-invalid" : ""
                            }`}
                            />
                            <ErrorMessage
                            component="div"
                            name="fecha"
                            className="invalid-feedback"
                            />
                        </div>
                      
                    </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>handleClose}>
                    Cerrar
                  </Button>
                  <div>
                  <Button variant="contained"  type="submit" color="primary">Enviar</Button>
                  </div>
{/*
                  <Button variant="primary" onClick={()=>SaveRegister()}>
                    Grabar
                  </Button>
*/}
                </Modal.Footer>
          </Form>
                )}            
        </Formik>
        </Modal>
        </>
    );
}

export default Listagastos;;