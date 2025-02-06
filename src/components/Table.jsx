import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { WindowIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Table = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [newField, setNewField] = useState([
        {
            name: '',
            type: ''
        }
    ])
   
    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...newField]
        updatedFields[index][field] = value
        setNewField(updatedFields)
    }

    const addField = () => {
        setNewField([...newField, { name: '', type: '' }])
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={ `flex flex-col px-3 py-3 bg-gray-50 rounded-xl border border-gray-200 ` }>
            <div className='flex items-center justify-between cursor-pointer' onClick={handleOpen}>
                <div className='flex items-center gap-2'>
                    <span className='w-1 h-4 rounded-full bg-purple-600'></span>
                    <h2 className='font-semibold text-gray-800'>Users</h2>
                </div>
                <EllipsisVerticalIcon className='w-4 text-gray-500' />
            </div>

            <div className={`overflow-hidden overflow-y-auto transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-[600px]' : 'max-h-0 '}`}>
                {/* Move all content that should slide down inside this div */}
                <div className='flex items-center gap-2 mt-4'>
                    <WindowIcon className='w-4 text-gray-500' />
                    <p className='text-gray-500 text-sm font-normal'>Fields</p>
                </div>
                
                {newField.map((field, index) => (
                    <div key={index} className='flex items-center gap-2 mt-2 '>
                        <input 
                            type="text" 
                            value={field.name}
                            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                            className='w-1/2 bg-white border shadow-sm border-gray-200 rounded-md focus:outline-none px-2 p-[4px] text-sm text-gray-900' 
                            placeholder='Field name' 
                        />

                        <select 
                            value={field.type}
                            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                            className='w-1/2 bg-white border shadow-sm border-gray-200 rounded-md focus:outline-none px-2 p-[4px] text-sm text-gray-700 font'
                        >
                            <option value="">Select type</option>
                            <option value="varchar">Varchar</option>
                            <option value="integer">Integer</option>
                            <option value="boolean">Boolean</option>
                            <option value="date">Date</option>
                            <option value="timestamp">Timestamp</option>
                            <option value="decimal">Decimal</option>
                            <option value="text">Text</option>
                        </select>
                    </div>
                ))}

                <div className='px-2 mt-3 border-[0.5px] border-b-gray-200'></div>
                <div className='flex justify-end mt-3'>
                    <button 
                        className='px-4 py-1 flex items-center gap-2 border shadow-sm text-sm border-gray-700 font-medium bg-gray-600 text-white rounded-md' 
                        onClick={addField}
                    >
                        <WindowIcon className='w-4 text-gray-300' />
                        Add Field
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table