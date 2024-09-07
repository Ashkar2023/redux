import React, { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import axios from "../../service/api.js";
import { setAdmin } from '../../state/slices/adminSlice.js';
import { useNavigate } from 'react-router-dom';

const loginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/admin/login", formData);
            if (response.data.success) {
                dispatch(setAdmin({
                    email: formData.email
                }));
                navigate("/admin/dashboard");
                formRef.current.reset();
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded-lg drop-shadow-md">
                <h1 className="text-3xl font-teko-400 font-bold text-center mb-8">Admin Login</h1>

                <form className='font-teko-300' onSubmit={handleSubmit} ref={formRef}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-center font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default loginPage