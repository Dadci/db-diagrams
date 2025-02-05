import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNode = () => {
    return (
        <div className='border border-gray-200 rounded-md overflow-hidden  '>
            <div className="bg-red-200 font-medium text-sm p-2.5 ">
                Custom Node
            </div>
            <Handle type="source" position={Position.Top} className="bg-gray-600 w-16" />
            <Handle type="target" position={Position.Bottom} className="!bg-white border !border-gray-200  " />
        </div>
    )
}

export default memo(CustomNode);