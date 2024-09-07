import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from '../../service/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/slices/userSlice';

const LoginPage = () => {
    // const location = useLocation() //use state.from prop to remember the from location to redirect after loggin in.
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, handleSubmit, handleChange, isSubmitting, resetForm } = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: false
        },
        onSubmit
    })

    function onSubmit() {
        axios.post("/login", values)
            .then(res => {
                if (res.data.success) {
                    dispatch(setUser({
                        email: values.email,
                    }))
                    navigate("/", { replace: true });
                }
                resetForm();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='flex w-full h-screen justify-center items-center bg-slate-100'>
            <div className='w-1/2 h-4/5 flex rounded-md overflow-hidden shadow-xl'>

                <div className='bg-white w-full lg:w-3/4 xl:w-1/2 px-14 content-center py-16 '>
                    <div className='text-4xl text-center font-teko'>
                        <h1>WELCOME BACK</h1>
                        <p className='text-sm py-2 font-teko-400'>Pickup where you left off!</p>
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
                                value={values.email}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-green-300"
                            />
                            <p className='h-4 text-xs text-red-700 text-end'></p>
                        </div>
                        <div className=''>
                            <label htmlFor="password" className="block text-lg font-teko-400 leading-6 text-gray-900">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                className="block w-full rounded-md py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-green-300"
                            />
                            <p className='h-4 text-xs text-red-700 text-end'></p>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <input className='align-middle'
                                    type="checkbox"
                                    name="remember"
                                    onChange={handleChange}
                                    id="remember"
                                    value="true" />
                                <label className='text-sm font-teko-300 tracking-wide' htmlFor="remember">remember me</label>
                            </div>
                            <a href="#" className='text-violet-500 text-sm font-teko-300 content-center tracking-wide'>forgot password?</a>
                        </div>
                        <button type="submit" disabled={isSubmitting} className='w-full bg-slate-900 font-teko-500 text-lg hover:tracking-widest text-white py-2 rounded-md self-center my-2 
                        active:scale-95 active:duration-75 transition-all hover:bg-green-100 border-black border hover:text-black'>
                            Login
                        </button>
                    </form>

                    {/* signup page link */}
                    <p className='text-xs text-center mt-8'>Don't have an account yet?<span className='ml-1 underline text-violet-500 cursor-pointer' onClick={() => navigate("/signup")}>Sign Up</span></p>
                </div>

                {/* gradient div */}
                <div className='lg:w-1/2 bg-gradient-to-r from-green-300 to-green-800'>
                </div>

            </div>
        </div>
    )
}

export default LoginPage