import {Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap'; 
import NavbarComp from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ChatContextProvider from './context/ChatContext';
function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}> 
      <NavbarComp />
      <Container className='text-secondary'>
        <Routes>
          <Route path='/' element={ user ? <Chat /> : <Login /> } />
          <Route path='/register' element={ user ? <Chat /> : <Register />} />
          <Route path='/login' element={ user ? <Chat /> : <Login /> } />
          <Route path='*' element={ <Navigate to={'/'} /> } />
        </Routes>
      </Container>
    </ChatContextProvider>
  )
}

export default App
