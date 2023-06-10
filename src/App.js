import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import EventsList from './components/EventsList';
import AddEvent from './components/AddEvent';

function App() {

  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
          <Route path='/' element={<EventsList/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/addEvent' element={<AddEvent/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
