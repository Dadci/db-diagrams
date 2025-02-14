import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTable } from '../store/unifiedSchemaSlice'
import { useParams } from 'react-router-dom'
import { Position } from '@xyflow/react'
import CodeModal from './CodeModal'
import { CodeBracketIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import ExportDialog from './ExportDialog'

const Headerbar = ({ flowRef }) => {
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const { id } = useParams();
    const schema = useSelector(state =>
        state.schemas.schemas.find(s => s.id === id)
    );

    const dispatch = useDispatch()

    const handleAddTable = () => {
        dispatch(addTable({
            position: { x: 100, y: 100 }
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
                <div className='flex justify-between items-center'>
                    <div className='flex-col items-center gap-2'>
                        <h2 className='text-lg font-semibold text-gray-900'>{schema?.title}</h2>
                        <h3 className='text-gray-400 text-sm font-normal'>{schema?.description}</h3>
                    </div>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => setIsExportOpen(true)}
                            className='px-4 py-1.5 bg-blue-500 border text-sm border-blue-600 text-white rounded-lg gap-2 hover:bg-blue-700 transition-colors'
                        >
                            <ArrowDownTrayIcon className='w-4 inline-block mr-2' />
                            Export
                        </button>
                        <button
                            onClick={() => setIsCodeModalOpen(true)}
                            className='px-4 py-1.5 bg-indigo-500 border text-sm border-indigo-600 text-white rounded-lg gap-2 hover:bg-indigo-700 transition-colors'
                        >
                            <CodeBracketIcon className='w-4 inline-block mr-2' />
                            Generate Code
                        </button>
                    </div>
                </div>
            </div>
            <CodeModal
                isOpen={isCodeModalOpen}
                onClose={() => setIsCodeModalOpen(false)}
            />
            <ExportDialog
                isOpen={isExportOpen}
                onClose={() => setIsExportOpen(false)}
                schema={schema}
                flowRef={flowRef}
            />
        </div>
    );
};

export default Headerbar;