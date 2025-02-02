import React, { useState } from 'react'
import "./Form.css"
import { useForm } from 'react-hook-form'
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { NavLink } from 'react-router-dom';

function Form({ name_heading, input_fields, forgot_password, button, loading, account, link_name, link, signUp = false, login = false, forgotPassword = false, resetPassword = false }) {
    const [password, setPassword] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()


    const onSubmit = data => {
        // console.log(data)
        if (signUp) signUp(data.username, data.email, data.password)
        if (login) login(data.email, data.password)
        if (forgotPassword) forgotPassword(data.email)
        if (resetPassword) resetPassword(data.password)
    };



    return (
        <>
            <h1 className="heading_form">{name_heading}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="errors">
                    {
                        (errors.username || errors.email) ?
                            "Please enter all the fields."
                            :
                            errors.password && errors.password.message
                    }
                </div>
                {
                    input_fields.map(input => {
                        return (
                            <div className="input_field" key={input.id}>
                                {input.icon}
                                <input
                                    className='inpt_1'
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    {...register(input.name,
                                        input.type === "password" && !forgot_password ?
                                            {
                                                required: {
                                                    value: true,
                                                    message: "Please enter all the feilds."
                                                },
                                                onChange: (e) => { setPassword(e.target.value) },
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must have at least 6 characters."
                                                },
                                                // pattern: {
                                                //     value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                                //     message: ""
                                                //     // "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
                                                // },
                                                // pattern: {
                                                //     value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                                //     message: ""
                                                // Password must include at least one letter, one number, and one special character.
                                                // }
                                            } : {
                                                required: {
                                                    value: true,
                                                    message: "Please enter all the feilds."
                                                }
                                            }
                                    )}
                                />
                            </div>
                        )
                    })
                }
                {
                    // button === "Confirm" ?
                    //     <></>
                    //     :
                        forgot_password ?
                            button === "Send" ?
                                <NavLink
                                    className={"text-green-400 hover:underline "}
                                    to={"/login"}
                                >
                                    Back
                                </NavLink>
                                :
                                <NavLink
                                    className={"text-green-400 hover:underline "}
                                    to={"/forgot-password"}
                                >
                                    Forgot Password?
                                </NavLink>
                            :
                            <PasswordStrengthMeter password={password} />
                }
                {
                    loading ?
                        <button className='loading_btn w-full mt-5 py-3 text-white font-bold rounded-lg shadow-lg text-lg' disabled={true}>Loading...</button>
                        :
                        <button className='submit_btn w-full mt-5 py-3 text-white font-bold rounded-lg shadow-lg text-lg' disabled={false} type='submit'>{button}</button>
                }
            </form >
            {
                button === "Confirm" ?
                    <></>
                    :
                    <div className='account_page bg-opacity-50 text-gray-400 px-8 py-4 bg-gray-800'>
                        {account}
                        <NavLink className={"text-green-400 hover:underline ml-2"} to={link}>{link_name}</NavLink>
                    </div>
            }
        </>
    )
}

export default Form
