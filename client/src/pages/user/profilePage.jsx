import React from 'react'
import Navbar from '../../components/ui/navbar'
import Profile from '../../components/ui/profile'

const ProfilePage = () => {
    return (
        <div className='h-screen bg-slate-400'>
            <Navbar />
            <Profile />
        </div>
    )
}

export default ProfilePage