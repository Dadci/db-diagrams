import { createSlice } from '@reduxjs/toolkit'

const schemaSlice = createSlice({
    name: 'schemas',
    initialState: {
        schemas: [],
        activeSchema: null
    },
    reducers: {
        addSchema: (state, action) => {
            state.schemas.push({
                id: Date.now().toString(),
                title: action.payload.title,
                description: action.payload.description,
                createdAt: new Date().toISOString(),
                tables: []
            })
        },
        deleteSchema: (state, action) => {
            const schema = state.schemas.find(s => s.id === action.payload);
            if (schema) {
                // Dispatch action to delete associated tables
                state.schemas = state.schemas.filter(s => s.id !== action.payload);
            }
        },
        setActiveSchema: (state, action) => {
            state.activeSchema = action.payload
        },
        addTableToSchema: (state, action) => {
            const schema = state.schemas.find(s => s.id === action.payload.schemaId)
            if (schema && !schema.tables.includes(action.payload.tableId)) {
                schema.tables.push(action.payload.tableId)
            }
        },
        removeTableFromSchema: (state, action) => {
            const schema = state.schemas.find(s => s.id === action.payload.schemaId)
            if (schema) {
                schema.tables = schema.tables.filter(id => id !== action.payload.tableId)
            }
        },
        updateTableInSchema: (state, action) => {
            const schema = state.schemas.find(s => s.id === action.payload.schemaId)
            if (schema) {
                // Update any schema-specific table data if needed
            }
        },
        updateTablePosition: (state, action) => {
            const { tableId, position } = action.payload;
            const table = state.tables.find(t => t.id === tableId);
            if (table) {
                table.position = position;
            }
        }
    }
})

export const {
    addSchema,
    deleteSchema,
    setActiveSchema,
    addTableToSchema,
    removeTableFromSchema,
    updateTableInSchema,
    
    updateTablePosition
} = schemaSlice.actions

export default schemaSlice.reducer