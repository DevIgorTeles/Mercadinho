import {BrowserRouter as Router,Route, Routes, Navigate} from 'react-router-dom';
import Login from '../../mercadinho/src/components/Login/Login';
import Home from '../../mercadinho/src/components/Home/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login/>} path="/"></Route>
        <Route element={<Home/>} path="home"></Route>
        <Route element={<Navigate to="/"/>} path='*'></Route>
      </Routes>
    </Router>
  );
}

export default App;
