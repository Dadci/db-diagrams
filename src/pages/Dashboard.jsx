import React, { useCallback } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Stats from '../components/Stats'
import Headerbar from '../components/Headerbar'
import { Background, Controls, ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react'
import '@xyflow/react/dist/style.css';



const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    { id: '3', position: { x: 0, y: 200 }, data: { label: '3' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const Dashboard = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );


    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Headerbar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 w-full h-full bg-gray-50 overflow-none">

                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                    >

                        <Controls />
                        <Background variant='dots' color="#aaa" gap={12} />
                    </ReactFlow>

                </main>
            </div>
        </div>
    )
}

export default Dashboard