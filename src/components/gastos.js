import React, { useEffect, useState}  from "react";
import {TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import uuid from "react-uuid"

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'

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

    const classes = useStyles();

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
    id: "",
    titulo: "",
    nombre: "",
    monto: "",
    fecha:"",
    };

    const[gastosParticular, setGastosParticulares]= useState(initialValues);

    /*
    const handleonChange = (e) =>{
        e.preventDefault();
        setGastosParticulares({...gastosParticular,[e.target.name] : e.target.value});
    }
    */

    return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // same shape as initial values
                    console.log("Se envia", values);


                    AgregarGasto({...values, id:uuid()});

                    //values= initialValues;

                    setGastosParticulares({...initialValues});
                  }}
            >
                 {({ touched, errors, isSubmitting, handleBlur }) => (
                <Form>
 
                    <div>
                        <label htmlFor="Titulo">Titulo</label>
                        <Field
                        type="text"
                        name="titulo"
                        placeholder="Ingresa el Titulo del Evento"
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
                        placeholder="Ingresa el Nombre"
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
                        <label htmlFor="monto">Monto</label>
                        <Field
                        type="number"
                        name="monto"
                        placeholder="Ingresa el Monto"
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
                        <label htmlFor="fecha">Fecha</label>
                        <Field
                        type="date"
                        name="fecha"
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

                    <div>
                    <Button variant="contained"  type="submit" color="primary">Enviar</Button>
                    </div>
                </Form>
                )}            
  
            </Formik>
        )
}

export default Gastos;