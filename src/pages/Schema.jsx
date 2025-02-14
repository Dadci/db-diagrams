import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Background, Controls, ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { setActiveSchema, updateEdges, updateTablePosition } from '../store/unifiedSchemaSlice';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Headerbar from '../components/Headerbar';
import CustomNode from '../components/CustomNode';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
    custom: CustomNode,
};

const Schema = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schemaRef = useRef(null);
    const flowRef = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    // Updated selectors with null checks
    const schema = useSelector(state =>
        state.schemas.schemas.find(s => s.id === id)
    );

    const tables = useSelector(state =>
        state.schemas.schemas.find(s => s.id === id)?.tables || []
    );

    const storedEdges = useSelector(state => state.schemas.edges || []);

    // Set active schema when component mounts
    useEffect(() => {
        if (id) {
            dispatch(setActiveSchema(id));
        }

        // Redirect if schema doesn't exist
        if (!schema) {
            navigate('/');
            return;
        }
    }, [id, dispatch, schema, navigate]);

    // Handle edges
    useEffect(() => {
        if (storedEdges?.length > 0) {
            setEdges(storedEdges);
        }
    }, [storedEdges, setEdges]);

    // Create nodes from tables with null check
    const tableNodes = useMemo(() => {
        if (!tables) return [];

        return tables.map(table => ({
            id: table.id,
            type: 'custom',
            position: table.position || { x: 0, y: 0 },
            data: { ...table }
        }));
    }, [tables]);

    // Update nodes when tables change
    useEffect(() => {
        if (tableNodes?.length > 0) {
            setNodes(tableNodes);
        }
    }, [tableNodes, setNodes]);

    const onNodeDragStop = useCallback((_, node) => {
        dispatch(updateTablePosition({
            tableId: node.id,
            position: node.position
        }));
    }, [dispatch]);

    const onEdgesChange = useCallback((changes) => {
        const newEdges = applyEdgeChanges(changes, edges);
        setEdges(newEdges);
        dispatch(updateEdges(newEdges));
    }, [edges, setEdges, dispatch]);

    const onConnect = useCallback((params) => {
        const newEdges = addEdge(params, edges);
        setEdges(newEdges);
        dispatch(updateEdges(newEdges));
    }, [edges, setEdges, dispatch]);

    if (!schema) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="h-screen" ref={schemaRef}>
                <div className="flex flex-col h-screen">
                    <Navbar />
                    <Headerbar schema={schema} flowRef={flowRef} />
                    <div className="flex flex-1 overflow-hidden">
                        <Sidebar />
                        <main
                            className="flex-1 w-full h-full bg-[#fefefe] overflow-none"
                            ref={flowRef}
                        >
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onNodeDragStop={onNodeDragStop}
                                onConnect={onConnect}
                                nodeTypes={nodeTypes}
                                fitView
                                connectOnClick={true}
                                snapToGrid={true}
                                defaultEdgeOptions={{
                                    type: 'smoothstep',
                                    animated: true,
                                    style: { stroke: '#666' }
                                }}
                            >
                                <Controls />
                                <Background variant="dots" color="#aaa" gap={12} />
                            </ReactFlow>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schema;