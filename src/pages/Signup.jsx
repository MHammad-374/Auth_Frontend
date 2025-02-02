import React, { useState } from 'react'
import Form from '../components/form.jsx'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { ToastContainer, toast, } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

AOS.init();

function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const input_fields = [
        {
            id: 1,
            type: "text",
            placeholder: "Full Name",
            name: "username",
            icon: <PermIdentityOutlinedIcon style={{ color: "#20B057", fontSize: "33px" }} />
        },
        {
            id: 2,
            type: "email",
            placeholder: "Email Address",
            name: "email",
            icon: <MailOutlinedIcon style={{ color: "#20B057", fontSize: "30px" }} />
        },
        {
            id: 3,
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





    const signUp = async (name, email, password) => {
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
            credentials: "include"
        })
        const data = await res.json();
        if (res.status === 201)
            navigate('/email-verification')
        notify(data.message)
        setLoading(false)
    }





    return (
        <>
            <div className="main_page">
                <div data-aos="fade-up">
                    <div className="outer_box">
                        <Form
                            name_heading="Create Account"
                            input_fields={input_fields}
                            forgot_password={false}
                            button={"Submit"}
                            loading={loading}
                            account={"Already have an account?"}
                            link_name={"Login"}
                            link={"/login"}
                            signUp={signUp}
                        />
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Signup
