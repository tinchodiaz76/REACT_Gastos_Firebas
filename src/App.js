import logo from './logo.svg';
import './App.css';
/*import {firebaseConfig} from './firebase';*/
import Gastos from './components/gastos';
import Listagastos from './components/listagastos';
import generateStore from './redux/store';
import {Provider} from 'react-redux';

function App() {

  
  const store= generateStore()

  return (
    <>
    <Provider store={store}>
      <Gastos/>
      {/*<Listagastos/>*/}
    </Provider>
    </>
  );
}

export default App;
