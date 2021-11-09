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

const Listagastos= ({MostrarGastos,MostrarTotal, CantPersonas,TotalPorPersona})=> {

    const classes = useStyles();

    //Se usa para el MODAL
    const [show, setShow] = useState(false);
    //Se usa para el MODAL
    const handleClose = () => setShow(false);
    //Se usa para el MODAL
    const handleShow = () => setShow(true);
    //Se usa para el MODAL
    const handleonChange = (e) =>{
        e.preventDefault();
        /*
        setGastosParticulares({...gastosParticular,[e.target.name] : e.target.value});
        */
      }

    return (
        <>
            <h1>Listado de Gastos</h1>
            <h2>Total: {MostrarTotal}</h2>
            <h2>Cantidad de Personas: {CantPersonas}</h2>
            <h2>Total por Persona: {TotalPorPersona}</h2>
            <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Titulo</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="right">Fecha</TableCell>
                    <TableCell align="right">Adeuda</TableCell>
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
                      <TableCell align="right">0</TableCell>
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
              <Button variant="primary">
                Agregar
              </Button>
            </Modal.Footer>
        </Modal>


            {/*MostrarGastos.map((item)=>(item.nombre))*/}
        </>

    );
}

export default Listagastos;