import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Stats from '../components/Stats'
import Headerbar from '../components/Headerbar'
import { Background, Controls, ReactFlow } from '@xyflow/react'

const Dashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Headerbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 w-full h-full bg-gray-50 overflow-none">

                    <ReactFlow>
                        <Background color="#aaa" gap={14} />
                        <Controls />



                    </ReactFlow>

                </main>
            </div>
        </div>
    )
}

export default Dashboard