import React from 'react'

const Headerbar = () => {
    return (
        <div className='flex items-center bg-white border-b border-gray-200'>
            <div className='w-[340px] border-r border-gray-200'>
                <div className='pl-6 pr-4 py-5'>
                    <div className='flex items-center justify-between'>
                        <h2 className=' font-semibold text-gray-900'>Tables</h2>
                        <button className='px-4 py-1 border shadow-sm border-teal-600 text-sm font-medium bg-teal-500 text-white rounded-lg'>+ Add Table</button>
                    </div>
                </div>
            </div>
            <div className='flex-1 py-2 px-6'>
                <div className='flex-col items-center gap-2'>
                    <h2 className='text-lg font-semibold text-gray-900'>Schema Name</h2>
                    <h3 className='text-gray-400 text-sm font-normal '>Schema Description</h3>
                </div>
            </div>
        </div>
    )
}

export default Headerbar