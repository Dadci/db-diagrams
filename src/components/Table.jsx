import React from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { WindowIcon, TrashIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { addField, saveTable, deleteTableAsync } from '../store/tableSlice'
import { useDispatch } from 'react-redux'

const Table = ({ tableData }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [tableName, setTableName] = useState(tableData.name)
    const [newField, setNewField] = useState(
        tableData.fields.length > 0 ? tableData.fields : [{ name: '', type: '' }]
    );

    const dispatch = useDispatch()

    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...newField]
        updatedFields[index][field] = value
        setNewField(updatedFields)
    }

    const addField = () => {
        setNewField([...newField, { name: '', type: '' }])
    }

    const handleSave = () => {
        const currentPosition = tableData.position;
        dispatch(saveTable({
            tableId: tableData.id,
            name: tableName,
            fields: newField,
            position: currentPosition // Keep the current position
        }));
        setIsOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteTableAsync(tableData.id))
    }


    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`flex flex-col px-3 py-3 bg-gray-50 rounded-xl border border-gray-200 `}>
            <div className='flex items-center justify-between cursor-pointer' onClick={handleOpen}>
                <div className='flex items-center gap-2'>
                    <span className={`w-1 h-4 rounded-full bg-${tableData.color}`}></span>
                    <input
                        type="text"
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}
                        onClick={(e) => e.stopPropagation()} // Prevent collapse when editing name
                        className="font-semibold text-gray-800 bg-transparent border-none focus:outline-none"
                    />
                </div>
                <EllipsisVerticalIcon className='w-4 text-gray-500' />
            </div>

            <div className={`overflow-hidden overflow-y-auto transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-[600px]' : 'max-h-0 '}`}>
                {/* Move all content that should slide down inside this div */}
                <div className='flex items-center gap-2 mt-4'>
                    <WindowIcon className='w-5 text-gray-500' />
                    <p className='text-gray-500 text-sm font-normal'>Fields</p>
                </div>

                {newField.map((field, index) => (
                    <div key={index} className='flex items-center gap-2 mt-3 '>
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

                <div className='px-2 mt-6 border-[0.5px] border-b-gray-200'></div>
                <div className='flex justify-between mt-3 gap-2'>
                    <div className='flex gap-2'>

                        <button
                            className='px-3 py-0.5 flex items-center gap-2 border shadow-sm text-sm border-gray-300 font-medium bg-gray-200 hover:bg-slate-100 text-gray-700 hover:text-gray-600 rounded-md'
                            onClick={addField}
                        >
                            <WindowIcon className='w-5 text-gray-700' />
                            Add Field
                        </button>
                        <button
                            className='px-3 py-0.5 flex items-center gap-2 border shadow-sm text-sm border-gray-700 hover:border-gray-600 font-medium bg-gray-600 hover:bg-gray-500 text-white rounded-md'
                            onClick={handleSave}
                        >
                            <CloudArrowUpIcon className='w-5 text-white' />
                            Save
                        </button>
                    </div>
                    <button className='p-0.5 hover:bg-red-100 rounded-md' onClick={handleDelete}>
                        <TrashIcon className='w-5 text-red-400 ' />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Table