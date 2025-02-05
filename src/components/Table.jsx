import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { WindowIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Table = () => {

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }


    return (
        <div className='flex flex-col px-4 py-2 bg-gray-50 rounded-xl border border-gray-200' >
            <div className='flex items-center justify-between cursor-pointer' onClick={handleOpen}>
                <div className='flex items-center gap-2'>
                    <span className='w-1 h-4 rounded-full bg-purple-600'></span>
                    <h2 className=' font-semibold text-gray-800'>Users</h2>

                </div>
                <EllipsisVerticalIcon className='w-5 text-gray-500' />

            </div>

            {isOpen && (
                <div className='flex items-center gap-2 mt-4'>
                    <WindowIcon className='w-5 text-gray-500' />
                    <p className='text-gray-500 text-sm font-normal'>Fields</p>
                </div>
            )}



        </div>
    )
}

export default Table