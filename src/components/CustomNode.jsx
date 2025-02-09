import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import clsx from 'clsx';


const CustomNode = ({ data }) => {
    // Get the table data from the store using the id passed in data
    const table = useSelector(state =>
        state.tables.tables.find(t => t.id === data.id)
    );

    if (!table) return null;

    const headerBgClass = `bg-${table.color}/10`;
    const textClass = `text-${table.color}`;
    const handleBgClass = `!bg-${table.color}`;


    return (
        <div className={`border ${headerBgClass} rounded-md w-64 flex-col shadow-md p-[2px] bg-white`}>
            <div className={`${headerBgClass} font-semibold p-2 text-${table.color} rounded-t-[4px] flex items-center gap-1`}>
                <TableCellsIcon className="w-5 h-5" />
                <p className='text-sm'>{table.name}</p>
            </div>
            <div className='p-2 text-sm text-gray-700 bg-white space-y-2'>
                {table.fields.map((field, index) => (
                    <div key={index} className='flex items-center justify-between text-sm font-light'>
                        <p className='text-gray-700'>{field.name}</p>
                        <p className='text-gray-400'>{field.type}</p>
                    </div>
                ))}
            </div>
            <Handle
                type="target"
                position={Position.Left}
                className="!bg-gray-300 border !border-gray-300 "
            />
            <Handle
                type="source"
                position={Position.Right}
                className="!bg-gray-300 border !border-gray-300 "

            />
        </div>
    )
};

export default memo(CustomNode);