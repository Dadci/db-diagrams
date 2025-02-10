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
            state.schemas = state.schemas.filter(s => s.id !== action.payload)
            
            

            

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
        }
    }
})

export const {
    addSchema,
    deleteSchema,
    setActiveSchema,
    addTableToSchema,
    removeTableFromSchema,
    updateTableInSchema
} = schemaSlice.actions

export default schemaSlice.reducer