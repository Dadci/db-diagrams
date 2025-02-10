import React, { useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Background, Controls, ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react'
import { setActiveSchema } from '../store/schemaSlice'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Headerbar from '../components/Headerbar'
import CustomNode from '../components/CustomNode'
import '@xyflow/react/dist/style.css'

const nodeTypes = {
    custom: CustomNode,
};

const Schema = () => {
    const { id } = useParams(); // Add this line to get id from URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // Set active schema when component mounts
    useEffect(() => {
        if (id) {
            dispatch(setActiveSchema(id));
        }
    }, [id, dispatch]);

    const tables = useSelector(state =>
        state.tables.tables.filter(table => table.schemaId === id)
    );
    const schemas = useSelector(state => state.schemas.schemas)
    const schema = useSelector(state => state.schemas.schemas.find(s => s.id === id));

    if (!schema) {
        navigate('/');
        return null;
    }

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