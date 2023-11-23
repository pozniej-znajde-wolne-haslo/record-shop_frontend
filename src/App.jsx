// implement context api
// react-router-dom implement routing
// URL path SMALL letter !! (capital will get converted into e.g. 'login20%blabla')
// ROUTES below - CLIENT-SIDE ROUTING (just displaying dynamic COMPs & changing URL)
// not sending REQs anywhere!

// SERVER-SIDE ROUTING - when changing URL, sending a REQ to backend & changing DATA !!

//(nextJS (built on react), nuxtJS (built on Vue) ) --> other frameworks
// SSR / SSZ ???
// there u can make full server-side routing
// REACT ---> only CLIENT-side routing (all the code on client, not getting anything from
// the backend), no server-side-routing

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import Records from './components/Records';
import Cart from './components/Cart';
import { useContext } from 'react';
import { MyContext } from './context/context';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  // ONLOAD ---> useEFFECT (z empty ARR)
  // FETCH ---> to get data
  // MUTABLE DATA ---> state
  const { user, setUser } = useContext(MyContext);

  const logout = () => {
    toast.success('successful logout');
    setTimeout(() => {
      setUser(null);
      //localStorage.removeItem('token');
    }, 1500);
  };

  return (
    <BrowserRouter>
      <div className='header'>
        <h1 style={{ letterSpacing: '1px', fontSize: '40px' }}>RECORD SHOP</h1>
        <ul className='nav'>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/records'>Records</NavLink>
          </li>
          <li>
            <NavLink to='/cart'>Cart</NavLink>
          </li>
          {user ? (
            <>
              <Toaster position='top-center' />
              <li>
                <NavLink to='/profile'>Profile</NavLink>
              </li>
              <li onClick={logout}>
                <NavLink to='/'>Log Out</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to='/register'>Register</NavLink>
              </li>
              <li>
                <NavLink to='/login'>Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/records' element={<Records />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
