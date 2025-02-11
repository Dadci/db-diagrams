import React, { memo, useMemo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

const selectTableById = (state, id) =>
    state.tables.tables.find(t => t.id === id);

const CustomNode = memo(({ data }) => {
    const table = useSelector(state => selectTableById(state, data.id));

    const styles = useMemo(() => ({
        headerBgClass: `bg-${table?.color}/10`,
        borderClass: `border-${table?.color}/30`
    }), [table?.color]);

    if (!table) return null;

    return (
        <div className={`border ${styles.borderClass} rounded-md w-64 flex-col shadow-md p-[2px] bg-white`}>
            <div className={`${styles.headerBgClass} font-semibold p-2 text-${table.color} rounded-t-[4px] flex items-center gap-1 drag-handle cursor-move`}>
                <TableCellsIcon className="w-5 h-5" />
                <p className="text-sm">{table.name}</p>
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
                className="!bg-gray-500 !w-3 !h-3 !border-2 !border-white"
                isValidConnection={(connection) => true}
                style={{ zIndex: 1 }}
            />
            <Handle
                type="source"
                position={Position.Right}
                className="!bg-gray-500 !w-3 !h-3 !border-2 !border-white"
                isValidConnection={(connection) => true}
                style={{ zIndex: 1 }}
            />
        </div>
    );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;