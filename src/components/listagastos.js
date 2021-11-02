import React, { useEffect, useState}  from "react";
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
      id: 1,
      field: 'titulo',
      headerName: 'Titulo',
      width: 150,
      editable: true,
    },
    {
      id: 2,
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: true,
    },
    {
      id: 3,
      field: 'monto',
      headerName: 'Monto',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      id: 4,
      field: 'fecha',
      width: 150,
      headerName: 'Fecha',
      description: 'This column has a value getter and is not sortable.',
    },
    /*
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'nombre') || ''} ${
          params.getValue(params.id, 'titulo') || ''
        }`,
    },
    */
  ];


const Listagastos= ()=> {

    const [rowGastos,setRowData] = useState([]);

    const [count, setCount] = useState(0);

    // De forma similar a componentDidMount y componentDidUpdate
    useEffect( async () => {
      // Actualiza el título del documento usando la API del navegador
      /*document.title = `You clicked ${count} times`;*/
      //Leer documentos
      const citiesCol = collection(db, 'gastos');
      const citySnapshot = await getDocs(citiesCol);
      console.log("citySnapshot=", citySnapshot);
      console.log("pedro=", citySnapshot.docs.map(doc => doc.data()));
      setRowData(citySnapshot.docs.map(doc => doc.data()));
      /*citySnapshot.docs.map(doc => doc.data()));*/
      
     //const cityList = citySnapshot.docs.map(doc => doc.data());
    });


    return (
        <>
         <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rowGastos}
                /*{citySnapshot.docs.map(doc => rows= doc.data())} /*{citySnapshot.docs.map(doc => doc.data().titulo)}*/
                columns={columns}
                pmontoSize={5}
                rowsPerPmontoOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>

        </>
      );

}

export default Listagastos;
