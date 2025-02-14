import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTable } from '../store/unifiedSchemaSlice'
import { useParams } from 'react-router-dom'
import { Position } from '@xyflow/react'

const Headerbar = () => {
    const { id } = useParams();
    const schema = useSelector(state =>
        state.schemas.schemas.find(s => s.id === id)
    );

    const dispatch = useDispatch()

    const handleAddTable = () => {
        dispatch(addTable({
            name: 'New Table',
        }))
    }

    return (
        <div className='flex items-center bg-white border-b border-gray-200'>
            <div className='w-[360px] border-r border-gray-200'>
                <div className='pl-6 pr-4 py-5'>
                    <div className='flex items-center justify-between'>
                        <h2 className='font-semibold text-gray-900'>Tables</h2>
                        <button
                            className='px-4 py-1 border shadow-sm border-teal-600 text-sm font-medium bg-teal-500 text-white rounded-md'
                            onClick={handleAddTable}
                        >
                            + Add Table
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex-1 py-2 px-6'>
                <div className='flex-col items-center gap-2'>
                    <h2 className='text-lg font-semibold text-gray-900'>{schema?.title}</h2>
                    <h3 className='text-gray-400 text-sm font-normal'>{schema?.description}</h3>
                </div>
            </div>
        </div>
    );
};

export default Headerbar