import React, { useState } from 'react'
import Form from '../components/form.jsx'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const input_fields = [
    {
      id: 1,
      type: "email",
      placeholder: "Email Address",
      name: "email",
      icon: <MailOutlinedIcon style={{ color: "#20B057", fontSize: "30px" }} />
    },
    {
      id: 2,
      type: "password",
      placeholder: "Password",
      name: "password",
      icon: <VpnKeyOutlinedIcon style={{ color: "#20B057", fontSize: "28px" }} />
    },
  ]

  const notify = (message) => toast.warn(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const login = async (email, password) => {
    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    })
    const data = await res.json();
    if (res.status === 200) {
      navigate('/')
    }
    notify(data.message)
    setLoading(false)
  }

  return (
    <>
      <div className="main_page">
        <div data-aos="fade-up">
          <div className="outer_box">
            <Form
              name_heading="Welcome Back"
              input_fields={input_fields}
              forgot_password={true}
              button={"Login"}
              loading={loading}
              account={"Don't have an account?"}
              link_name={"Sign up"}
              link={"/signup"}
              login={login}
            />
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default Login
