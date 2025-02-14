import Navbar from '../components/Navbar'

import { useSelector } from 'react-redux'
import { addSchema } from '../store/unifiedSchemaSlice'
import AddBtn from '../components/AddBtn'
import SchemaCard from '../components/SchemaCard'

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

                    <div className='grid grid-cols-6 gap-4 p-6'>
                        {schemas.map(schema => (
                            <SchemaCard key={schema.id} schema={schema} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard