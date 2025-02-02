import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import { ToastContainer, toast, } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState("Loading...")
  const [login, setLogin] = useState(false)

  const notify = (message) => toast.success(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verified-user`, {
        method: 'GET', // or 'POST', 'PUT', etc.
        credentials: 'include', // Include cookies for cross-origin requests
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json();
      if (res.status === 200) {
        setLogin(true)
        setUser(data.message)
      }
      else if (res.status === 400) {
        navigate("/email-verification")
      }
      else setUser("Please Login...");
    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = async () => {
    setLogin(false);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
    const data = await res.json(); 
    notify(data.message)
    checkAuth();
  }

  useEffect(() => {
    checkAuth();
  }, [])



  return (
    <>
      <Navbar logout={logout} login={login} />
      <h1 className='text-4xl text-center'>{user}</h1>
      <ToastContainer />


    </>
  )
}

export default Home
