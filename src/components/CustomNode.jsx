import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TableCellsIcon } from '@heroicons/react/24/outline';


const CustomNode = () => {
    return (
        <div className='border border-gray-200 rounded-md  w-64 flex-col shadow-md p-[2px] bg-white '>
            <div className="bg-purple-100 font-semibold p-2 text-purple-700 rounded-t-[4px] flex items-center gap-1">
                <TableCellsIcon className="w-5 h-5" />
                <p className='text-sm'>Table_Name</p>

            </div>
            <div className='p-2 text-sm text-gray-700 bg-white space-y-2'>
                <div className='flex items-center justify-between text-sm font-light'>
                    <p className='text-gray-700'> FieldName</p>
                    <p className='text-gray-400'> DataType</p>
                </div>
                <div className='flex items-center justify-between text-sm font-light'>
                    <p className='text-gray-700'> FieldName</p>
                    <p className='text-gray-400'> DataType</p>
                </div>
            </div>

            <Handle type="target" position={Position.Left} className="bg-gray-600 w-16" />
            <Handle type="source" position={Position.Right} className="!bg-white border !border-gray-200  " />
        </div>
    )
}

export default memo(CustomNode);