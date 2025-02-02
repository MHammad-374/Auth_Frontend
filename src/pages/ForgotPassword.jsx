import React, { useState } from 'react'
import Form from '../components/form'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function ForgotPassword() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [binary, setBinary] = useState(false)

    const input_fields = [
        {
            id: 1,
            type: "email",
            placeholder: "Email Address",
            name: "email",
            icon: <MailOutlinedIcon style={{ color: "#20B057", fontSize: "30px" }} />
        }
    ]

    const notifyWarn = (message) => toast.warn(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });



    const forgotPassword = async (email) => {
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
            credentials: "include"
        })
        const data = await res.json();
        if (res.status === 200) setBinary(true)
        else notifyWarn(data.message)
        setLoading(false)
    }

    return (
        <>
            <div className="main_page">
                <div data-aos="fade-up">
                    {
                        binary ?
                            <h1 className='text-white text-4xl'>Reset Password link send to your email.</h1>
                            :
                            <div className="outer_box">
                                <Form
                                    name_heading="Forgot Password"
                                    input_fields={input_fields}
                                    forgot_password={true}
                                    button={"Send"}
                                    loading={loading}
                                    account={"Don't have an account?"}
                                    link_name={"Sign up"}
                                    link={"/signup"}
                                    forgotPassword={forgotPassword}
                                />
                            </div>
                    }
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
