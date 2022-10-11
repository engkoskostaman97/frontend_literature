
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Landing from './pages/Landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Mycollection from './pages/Mycollection';
import Addliterature from './pages/Addliterature';
import Search from './pages/Search';
import Detail from './pages/Detail';
import NotFound from './component/NotFound'
import Admin from './pages/Admin';
import { API, setAuthToken } from './config/api'
import { UserContext } from './context/userContext'
import React, { useContext, useEffect } from 'react'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {

  const [state, dispatch] = useContext(UserContext)

  const checkUser = async () => {
    try {
      const response = await API.get("/checkauth");
      // return console.log("response",response.data.data)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (

    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/mycollection' element={<Mycollection />} />
        <Route path='/addliterature' element={<Addliterature />} />
        <Route path='/search' element={<Search />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;