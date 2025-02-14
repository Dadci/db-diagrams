// src/store/unifiedSchemaSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { getRandomTailwindColor } from '../utils/getRandomTailwindColor'
import { calculateTablePosition } from '../utils/calculateTablePosition'

const initialState = {
    schemas: [],
    activeSchemaId: null,
    edges: []
}

export const addTable = createAsyncThunk(
    'schemas/addTable',
    async (payload, { getState }) => {
        const state = getState();
        const activeSchema = state.schemas.activeSchemaId;
        const schema = state.schemas.schemas.find(s => s.id === activeSchema);
        const tableCount = schema ? schema.tables.length : 0;

        return {
            id: Date.now().toString(),
            name: payload.name || 'New Table',
            color: getRandomTailwindColor(),
            fields: [],
            position: calculateTablePosition(tableCount)
        };
    }
);

// Add deleteTableAsync thunk
export const deleteTableAsync = createAsyncThunk(
    'schemas/deleteTableAsync',
    async (tableId, { getState, dispatch }) => {
        const state = getState();
        const activeSchemaId = state.schemas.activeSchemaId;

        dispatch(deleteTable(tableId));
        return { tableId, schemaId: activeSchemaId };
    }
);

const unifiedSchemaSlice = createSlice({
    name: 'schemas',
    initialState,
    reducers: {
        addSchema: (state, action) => {
            state.schemas.push({
                id: Date.now().toString(),
                title: action.payload.title,
                description: action.payload.description,
                createdAt: new Date().toISOString(),
                tables: [] // Tables will be stored directly in the schema
            })
            state.activeSchemaId = action.payload.id
            toast.success('Schema created successfully!')
        },
        deleteSchema: (state, action) => {
            state.schemas = state.schemas.filter(s => s.id !== action.payload);
            if (state.activeSchemaId === action.payload) {
                state.activeSchemaId = null;
            }
            toast.success('Schema deleted successfully!')
        },
        setActiveSchema: (state, action) => {
            state.activeSchemaId = action.payload
        },
        deleteTable: (state, action) => {
            const schema = state.schemas.find(s => s.id === state.activeSchemaId);
            if (schema) {
                schema.tables = schema.tables.filter(t => t.id !== action.payload);
                // Clean up edges
                state.edges = state.edges.filter(edge =>
                    edge.source !== action.payload && edge.target !== action.payload
                );
            }
        },
        updateTablePosition: (state, action) => {
            const schema = state.schemas.find(s => s.id === state.activeSchemaId);
            if (schema) {
                const table = schema.tables.find(t => t.id === action.payload.tableId);
                if (table) {
                    table.position = action.payload.position;
                }
            }
        },
        saveTable: (state, action) => {
            const schema = state.schemas.find(s => s.id === state.activeSchemaId);
            if (schema) {
                const table = schema.tables.find(t => t.id === action.payload.tableId);
                if (table) {
                    const position = table.position;
                    Object.assign(table, action.payload);
                    table.position = position;
                }
            }
        },
        updateEdges: (state, action) => {
            state.edges = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTable.fulfilled, (state, action) => {
                const schema = state.schemas.find(s => s.id === state.activeSchemaId);
                if (schema) {
                    schema.tables.push(action.payload);
                }
            })
            .addCase(deleteTableAsync.fulfilled, (state, action) => {
                const schema = state.schemas.find(s => s.id === action.payload.schemaId);
                if (schema) {
                    schema.tables = schema.tables.filter(t => t.id !== action.payload.tableId);
                    // Clean up edges
                    state.edges = state.edges.filter(edge =>
                        edge.source !== action.payload.tableId &&
                        edge.target !== action.payload.tableId
                    );
                }
            });
    }
});

// Update exports to include deleteTableAsync
export const {
    addSchema,
    deleteSchema,
    setActiveSchema,
    deleteTable,
    updateTablePosition,
    saveTable,
    updateEdges
} = unifiedSchemaSlice.actions;

export default unifiedSchemaSlice.reducer;