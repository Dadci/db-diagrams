import React from 'react'
import { useNavigate } from 'react-router-dom'
import { WindowIcon, TrashIcon, CloudArrowUpIcon, CircleStackIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { deleteSchema } from '../store/schemaSlice'
import { deleteTableAsync, deleteAllTables } from '../store/tableSlice'

const SchemaCard = ({ schema }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        navigate(`/schema/${schema.id}`)
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        dispatch(deleteSchema(schema.id))
        dispatch(deleteAllTables(schema.id))
    }

    return (
        <div
            onClick={handleClick}
            className='flex flex-col items-start gap-2 bg-white cursor-pointer border border-gray-200 hover:border-gray-300 rounded-lg p-4 shadow-sm'
        >
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <p className='text-gray-800 text font-medium'>{schema.title}</p>
                    <CircleStackIcon className='w-4 text-gray-500' />
                </div>
            </div>
            <p className='text-gray-500 text-sm'>{schema.description}</p>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-2'>
                    <span className='px-2 py-1 text-xs rounded-full font-medium bg-indigo-100 text-gray-600'>
                        {new Date(schema.createdAt).toLocaleDateString()}
                    </span>
                    <span className='px-2 py-1 text-xs rounded-full font-medium bg-teal-100 text-gray-600'>
                        {schema.tables.length} Tables
                    </span>
                </div>
                <TrashIcon
                    className='w-4 text-gray-500 hover:text-red-400'
                    onClick={handleDelete}
                />
            </div>
        </div>
    )
}

export default SchemaCard