import React, { useCallback, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Stats from '../components/Stats'
import Headerbar from '../components/Headerbar'
import { Background, Controls, ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react'
import CustomNode from '../components/CustomNode'
import { useSelector } from 'react-redux'


import '@xyflow/react/dist/style.css';



const nodeTypes = {
    custom: CustomNode,
};


const Schema = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const tables = useSelector(state => state.tables.tables)
    const schemas = useSelector(state => state.schemas.schemas)

    useEffect(() => {

        if (!tables.length) return;
        const tableNodes = tables.map((table, index) => ({
            id: table.id,
            type: 'custom',
            position: {
                x: (index % 3) * 300 + 50,
                y: Math.floor(index / 3) * 200 + 50
            },
            data: {
                id: table.id
            }
        }));

        setNodes(tableNodes);
    }, [tables, setNodes]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );


    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Headerbar schemas={schemas} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 w-full h-full bg-[#fefefe] overflow-none">

                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView
                    >

                        <Controls />
                        <Background variant='dots' color="#aaa" gap={12} />
                    </ReactFlow>

                </main>
            </div>
        </div>
    )
}

export default Schema