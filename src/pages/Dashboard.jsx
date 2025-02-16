import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import AddBtn from '../components/AddBtn'
import SchemaCard from '../components/SchemaCard'
import { FolderPlusIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
    const schemas = useSelector(state => state.schemas.schemas)

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 w-full h-full bg-[#fbfbfb] overflow-none">
                    <div className='flex items-start justify-between px-8 py-6'>
                        <div className='flex flex-col items-start gap-2'>
                            <h1 className='text-xl font-semibold'>Welcome to your Dashboard</h1>
                            <p className='text-gray-400 text-sm font-normal'>
                                You have {schemas.length} Schemas
                            </p>
                        </div>
                        <AddBtn />
                    </div>

                    {schemas.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-4 bg-gray-100 rounded-full">
                                    <FolderPlusIcon className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900">No schemas yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Get started by creating your first schema
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    ) : (
                        <div className='grid grid-cols-5 gap-4 p-6'>
                            {schemas.map(schema => (
                                <SchemaCard key={schema.id} schema={schema} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Dashboard