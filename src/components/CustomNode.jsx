import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TableCellsIcon } from '@heroicons/react/24/outline';

const CustomNode = ({ data }) => {
    const { name, fields = [] } = data;
    
    return (
        <div className='border border-gray-200 rounded-md w-64 flex-col shadow-md p-[2px] bg-white'>
            <div className="bg-purple-100 font-semibold p-2 text-purple-700 rounded-t-[4px] flex items-center gap-1">
                <TableCellsIcon className="w-5 h-5" />
                <p className='text-sm'>{name}</p>
            </div>
            <div className='p-2 text-sm text-gray-700 bg-white space-y-2'>
                {fields.map((field) => (
                    <div key={field.id} className='flex items-center justify-between text-sm font-light'>
                        <p className='text-gray-700'>{field.name}</p>
                        <p className='text-gray-400'>{field.type}</p>
                    </div>
                ))}
            </div>
            <Handle type="target" position={Position.Left} className="bg-gray-600 w-16" />
            <Handle type="source" position={Position.Right} className="!bg-white border !border-gray-200" />
        </div>
    )
}

export default memo(CustomNode);