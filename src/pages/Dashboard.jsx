import React from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
    return (
        <div className='flex'>
        <Sidebar />
        <main className='flex-grow bg-gray-900 p-6'>
            <h1 className=' text-white text-2xl font-bold'>Dashboard</h1>
        </main>
        </div>
    )
}

export default Dashboard