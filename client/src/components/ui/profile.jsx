import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(state=>state.user);
    return (
        <div className='flex justify-center items-center h-4/5 flex-col gap-4 '>
            <img className='rounded-full max-h-40'
                src={user.avatar} alt="profile" />
            <label className='block'>
                <span className='sr-only'>Choose profile photo</span>
            </label>
            <input type='file' className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-lg font-teko-400 
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100' />
            {/* <form>
                <label htmlFor="name" className='font-teko-500 tracking-wide'>Name</label>
                <input type="text" name="name" id="name" 
                    className='font-teko-300 block w-52 pl-1 py-1 rounded'
                />
                <label htmlFor="email" className='font-teko-500 tracking-wide'>Email</label>
                <input type="email" name="email" id="email" 
                    className='font-teko-300 block w-52 pl-1 py-1 rounded'
                />
                <label htmlFor="password" className='font-teko-500 tracking-wide'>Password</label>
                <input type="password" name="password" id="password" 
                    className='font-teko-300 block w-52 pl-1 py-1 rounded'
                />
            </form> */}
        </div>
    )
}

export default Profile