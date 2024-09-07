import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { signupSchema } from '../../schema/index';
import axios from "axios";

const SignupPage = () => {
    const navigate = useNavigate();
    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: ""
        },
        validationSchema: signupSchema,
        onSubmit,
    })

    function onSubmit() {
        axios.post("/signup", values)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    navigate("/login");
                }
            })
            .catch(error=>{
                console.log(error.response.data.message);
            })
    }

    return (
        <div className='flex w-full h-screen justify-center items-center bg-slate-100'>
            <div className='w-1/2 h-4/5 flex rounded-md overflow-hidden z-auto shadow-xl'>

                {/* gradient div */}
                <div className='w-1/2 bg-gradient-to-r to-blue-400 from-blue-700'>
                </div>

                <div className='bg-white w-1/2 px-14 content-center py-16 '>
                    <div className='text-4xl text-center font-teko'>
                        <h1>SIGN UP</h1>
                        <p className='text-sm py-2 font-teko-400'>start you journey with us!</p>
                    </div>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <div className='mt-4'>
                            <label htmlFor="email" className="block text-lg font-teko-400 leading-6 text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-blue-300"
                            />
                            <p className='h-4 text-xs text-red-700 text-end'>{touched.email && errors.email}</p>
                        </div>
                        <div className=''>
                            <label htmlFor="username" className="block text-lg font-teko-400 leading-6 text-gray-900">
                                Username
                            </label>
                            <input
                                type="username"
                                name="username"
                                id="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md py-1.5 pl-3 text-gray-900 ring-1 ring-blue-300"
                            />
                            <p className='h-4 text-xs text-red-700 text-end'>{touched.username && errors.username}</p>
                        </div>
                        <div className=''>
                            <label htmlFor="password" className="block text-lg font-teko-400 leading-6 text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md py-1.5 pl-3 text-gray-900 ring-1 ring-blue-300"
                            />
                            <p className='h-4 text-xs text-red-700 text-end'>{touched.password && errors.password}</p>
                        </div>

                        <button type='submit' className='w-full bg-slate-900 font-teko-500 text-lg hover:tracking-widest text-white py-2 rounded-md self-center
                        my-2 active:scale-95 active:duration-75 transition-all hover:bg-gray-200 border-black border hover:text-black'>
                            Submit
                        </button>

                    </form>

                    {/* login page link */}
                    <p className='text-xs text-center mt-8'>Already a member?<span className='ml-1 underline text-violet-500 cursor-pointer' onClick={() => navigate("/login")}>Login</span></p>

                </div>

            </div>
        </div>
    )
}

export default SignupPage