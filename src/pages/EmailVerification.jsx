import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function EmailVerification() {
    const [loading, setLoading] = useState(false)
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }

    } = useForm()

    // Handle input change and move focus
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        if (!value) {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
        setValue(`otp[${index}]`, value); // Update the form state
    };

    const notify = (message) => {
        toast.warn(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
        });
    }

    const verifyEmail = async (code) => {
        setLoading(true)
        await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code }),
            credentials: "include"
        })
            .then(res => {
                return res.json().then(data => {
                    if (res.status === 200) {
                        navigate("/"); // Navigate on successful validation
                        // return data; // Success: return data to the next `.then()`
                    } else {
                        // throw new Error(data.message || 'Something went wrong'); // Extract and throw the backend error message
                        notify(data.message || "Somthing went wrong");
                    }
                });
            })
            // .then(data => {
            // console.log(data.message); // Backend's success message
            // })
            .catch((error) => console.log("Something went wrong! \n" + error))
        setLoading(false)
    }

    const onSubmit = (data) => {
        // console.log(data)
        const otp = Object.values(data.otp).join("");  // Combine OTP values
        // console.log("Submitted OTP:", otp);
        verifyEmail(otp)

    };

    const checkAuth = async () => {

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/before-verify-email`, {
                method: 'GET', // or 'POST', 'PUT', etc.
                credentials: 'include', // Include cookies for cross-origin requests
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            if (res.status != 200) navigate("/signup")
            // notify(data.message); 2
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])


    return (
        <div className="main_page">
            <div data-aos="fade-up">
                <div className="outer_box">
                    <h1 className="heading_form">Verify Your Email</h1>
                    <p className='text-gray-300 text-center '>Enter the 6-digit code send to your email address.</p>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className='flex justify-between mt-3'>
                            {Array.from({ length: 6 }, (_, index) => (
                                <input
                                    className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none'
                                    key={index}
                                    type="number"
                                    {...register(`otp[${index}]`, { required: true, maxLength: 1 })}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    onChange={(e) => handleInputChange(e, index)}
                                />
                            ))}
                        </div>
                        {
                            loading ?
                                <button className='loading_btn w-full mt-5 py-3 text-white font-bold rounded-lg shadow-lg text-lg' disabled={true}>Loading...</button>
                                :
                                <button className='submit_btn w-full mt-5 py-3 text-white font-bold rounded-lg shadow-lg text-lg' type='submit'>Verify Email</button>
                        }
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default EmailVerification
