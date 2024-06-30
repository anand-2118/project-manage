import logo from './logo.svg';
import './App.css';
import Registration from './pages/registration/Registration';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import TaskProvider from './pages/context/taskContext';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='register' element={<Registration/>}></Route>  
    <Route path='/' element={<Login/>}></Route>  


    <Route path='/dashboard' element={<TaskProvider><Dashboard/></TaskProvider>}></Route>  


    </Routes>
    </BrowserRouter>
  );
}

export default App;
