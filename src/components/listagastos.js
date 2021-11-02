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

  const rows = [
    {id: 1, titulo: 'Snow', nombre: 'Jon', monto: 35, fecha: '02/11/2021' },
    {id: 2, titulo: 'Lannister', nombre: 'Cersei', monto: 42, fecha: '02/11/2021' },
    {id: 3, titulo: 'Lannister', nombre: 'Jaime', monto: 45, fecha: '02/11/2021' },
    {id: 4, titulo: 'Stark', nombre: 'Arya', monto: 16, fecha: '02/11/2021' },
    {id: 5, titulo: 'Targaryen', nombre: 'Daenerys', monto: 20, fecha: '02/11/2021' },
    {id: 6, titulo: 'Melisandre', nombre: null, monto: 150, fecha: '02/11/2021' },
    {id: 7, titulo: 'Clifford', nombre: 'Ferrara', monto: 44, fecha: '02/11/2021' },
    {id: 8, titulo: 'Frances', nombre: 'Rossini', monto: 36, fecha: '02/11/2021' },
    {id: 9, titulo: 'Roxie', nombre: 'Harvey', monto: 65, fecha: '02/11/2021' },
  ];

  var pedro= {titulo:'',nombre:'',monto:'',fecha:''};

/*
const addorEditGastos = async () => {

    console.log("gastosParticular=", gastosParticular)
    
    try {
            const docRef = await addDoc(collection(db, "gastos"), gastosParticular);
            //console.log("Document written with ID: ", docRef.id);
            window.alert("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    //Leer documentos
    //const citiesCol = collection(db, 'cities');
    //const citySnapshot = await getDocs(citiesCol);
    //const cityList = citySnapshot.docs.map(doc => doc.data());
    //return cityList;
    //FIN Leer documentos
    
}
*/

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
