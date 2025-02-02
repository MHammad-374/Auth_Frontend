import React, { useState } from 'react'
import Form from '../components/form'
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function ResetPassword() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const input_fields = [
        {
            id: 1,
            type: "password",
            placeholder: "Set your new password",
            name: "password",
            icon: <VpnKeyOutlinedIcon style={{ color: "#20B057", fontSize: "30px" }} />
        },
        // {
        //     id: 2,
        //     type: "password",
        //     placeholder: "Confirm Password",
        //     name: "password",
        //     icon: <VpnKeyOutlinedIcon style={{ color: "#20B057", fontSize: "30px" }} />
        // },
    ]

    const resetPassword = async (password) => {
        setLoading(true)
        const url = window.location.href;
        const lastPart = url.split('/').pop();
        // console.log(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${lastPart}`)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${lastPart}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password }),
            credentials: "include"
        })
        const data = await res.json();
        if (res.status === 200) {
            console.log(data.message)
            navigate("/")
        }
        else {
            console.log(data.message)
        }
        setLoading(false)
    }

    return (
        <>
            <div className="main_page">
                <div data-aos="fade-up">
                    <div className="outer_box">
                        <Form
                            name_heading="Forgot Password"
                            input_fields={input_fields}
                            forgot_password={false}
                            button={"Confirm"}
                            loading={loading}
                            account={"Don't have an account?"}
                            link_name={"Sign up"}
                            link={"/signup"}
                            resetPassword={resetPassword}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
