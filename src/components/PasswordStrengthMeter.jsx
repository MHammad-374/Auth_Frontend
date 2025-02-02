import React, { useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

function PasswordStrengthMeter({ password }) {
    const [bgColor, setBgColor] = useState(Array(4).fill(false));


    const criteria = [
        {
            label: "At least 6 characters.",
            error: !(password.length >= 6)
        },
        {
            label: "Contains a letter.",
            error: (!(/[A-Z]/.test(password)) && !(/[a-z]/.test(password)))
        },
        {
            label: "Contains a number.",
            error: !(/[0-9]/.test(password))
        },
        {
            label: "Contains special character.",
            error: !(/[^A-Za-z0-9]/.test(password))
        }
    ]

    const getStrength = () => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (/[A-Z]/.test(password) || /[a-z]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;

        // return strength
        if (strength < 1) {
            return "Very Weak"
        }
        else if (strength === 1) {
            return "Weak"
        }
        else if (strength === 2) {
            return "Fair"
        }
        else if (strength === 3) {
            return "Good"
        }
        else if (strength >= 4) {
            return "Strong"
        }
    }

    return (
        <div className=''>
            <div className="flex justify-between">
                <span className='text-gray-400 text-xs'>Password Strength</span>
                <span className='text-gray-400 text-xs'>
                    {
                        password ? getStrength() : "Very Weak"
                    }
                </span>
            </div>
            <div className='flex gap-1 mt-1'>
                <div className={`w-1/4 h-1 mt-1 rounded ${getStrength() !== "Very Weak" ?
                    getStrength() !== "Weak" ?
                        getStrength() !== "Fair" ?
                            getStrength() !== "Good" ?
                                "bg-green-500"
                                :
                                "bg-yellow-400"
                            :
                            "bg-yellow-500"
                        :
                        "bg-red-500"
                    :
                    "bg-gray-500"
                    }`}
                ></div>
                <div className={`w-1/4 h-1 mt-1 rounded ${getStrength() !== "Very Weak" && getStrength() !== "Weak" ?
                    getStrength() !== "Fair" ?
                        getStrength() !== "Good" ?
                            "bg-green-500"
                            :
                            "bg-yellow-400"
                        :
                        "bg-yellow-500"
                    :
                    "bg-gray-500"
                    }`}
                ></div>
                <div className={`w-1/4 h-1 mt-1 rounded ${getStrength() !== "Very Weak" && getStrength() !== "Weak" && getStrength() !== "Fair" ?
                    getStrength() !== "Good" ?
                        "bg-green-500"
                        :
                        "bg-yellow-400"
                    :
                    "bg-gray-500"
                    }`}
                ></div>
                <div className={`w-1/4 h-1 mt-1 rounded ${getStrength() !== "Very Weak" && getStrength() !== "Weak" && getStrength() !== "Fair" && getStrength() !== "Good" ?
                    "bg-green-500"
                    :
                    "bg-gray-500"
                    }`}
                ></div>

            </div>
            <div className='pt-2'>
                {
                    criteria.map((item) => {
                        return (
                            item.error ?
                                <div key={item.label} className='flex gap-3'>
                                    <CloseOutlinedIcon className='text-gray-400' style={{ fontSize: "20px" }} />
                                    <p className='text-gray-400 text-sm'>{item.label}</p>
                                </div>
                                :
                                <div key={item.label} className='flex gap-3'>
                                    <CheckOutlinedIcon className='text-green-500' style={{ fontSize: "20px" }} />
                                    <p className='text-green-400 text-sm'>{item.label}</p>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PasswordStrengthMeter
