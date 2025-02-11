import React, { useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Background, Controls, ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import { setActiveSchema } from '../store/schemaSlice';
import { selectTablesBySchemaId, selectSchemaById } from '../store/selectors';
import  {updateEdges, updateTablePosition}  from '../store/tableSlice'; // Changed import
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

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);
    const storedEdges = useSelector(state => state.tables.edges);

    const tables = useSelector(state => selectTablesBySchemaId(state, id));
    const schema = useSelector(state => selectSchemaById(state, id));

    useEffect(() => {
        if (id) {
            dispatch(setActiveSchema(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (storedEdges.length > 0) {
            setEdges(storedEdges);
        }
    }, [storedEdges, setEdges]);

    const tableNodes = useMemo(() => {
        if (!tables.length) return [];
        
        // Preserve existing nodes positions
        return tables.map((table) => {
            const existingNode = nodes.find(node => node.id === table.id);
            return {
                id: table.id,
                type: 'custom',
                // Use existing node position if available, otherwise use stored position
                position: existingNode?.position || table.position,
                data: { ...table },
                dragHandle: '.drag-handle'
            };
        });
    }, [tables, nodes]);

    // Only update nodes when necessary
    useEffect(() => {
        setNodes(currentNodes => {
            const newNode = tableNodes.find(tn => !currentNodes.find(cn => cn.id === tn.id));
            if (newNode) {
                return [...currentNodes, newNode];
            }
            return currentNodes;
        });
    }, [tableNodes, setNodes]);

    const onNodeDragStop = useCallback((_, node) => {
        dispatch(updateTablePosition({
            tableId: node.id,
            position: node.position
        }));
    }, [dispatch]);

    const onEdgesChange = useCallback((changes) => {
        setEdges((eds) => {
            const newEdges = eds;
            dispatch(updateEdges(newEdges));
            return newEdges;
        });
    }, [dispatch]);

    const onConnect = useCallback((params) => {
        setEdges((eds) => {
            const newEdges = addEdge(params, eds);
            dispatch(updateEdges(newEdges));
            return newEdges;
        });
    }, [dispatch]);

    if (!schema) {
        navigate('/');
        return null;
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <Headerbar schema={schema} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 w-full h-full bg-[#fefefe] overflow-none">
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
    );
};

export default Schema;