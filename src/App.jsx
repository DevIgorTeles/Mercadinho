import {BrowserRouter as Router,Route, Routes, Navigate} from 'react-router-dom';
import Login from '../../mercadinho/src/components/Login/Login';
import Home from '../../mercadinho/src/components/Home/Home';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login/>} path="/"></Route>
        <Route element={<Home/>} path="home"></Route>
        <Route element={<Navigate to="/"/>} path='*'></Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
