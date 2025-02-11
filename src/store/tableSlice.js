import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRandomTailwindColor } from '../utils/getRandomTailwindColor'
import { addTableToSchema, removeTableFromSchema } from './schemaSlice'
import { calculateTablePosition } from '../utils/calculateTablePosition';

export const addTable = createAsyncThunk(
  'tables/addTable',
  async (payload, { getState }) => {
    const tableId = Date.now().toString();
    const activeSchema = getState().schemas.activeSchema;
    const existingTables = getState().tables.tables;
    
    // Calculate position only for the new table
    const position = calculateTablePosition(existingTables.length);

    return {
      id: tableId,
      name: payload.name || 'New Table',
      color: getRandomTailwindColor(),
      fields: [],
      schemaId: activeSchema,
      position
    };
  }
);

const tableSlice = createSlice({
  name: 'tables',
  initialState: {
    tables: [],
    activeTable: null,
    edges: [] // Add edges to the state
  },
  reducers: {
    deleteTable: (state, action) => {
      // Remove the table
      state.tables = state.tables.filter(table => table.id !== action.payload);
      
      // Remove any edges connected to the deleted table
      state.edges = state.edges.filter(edge => 
        edge.source !== action.payload && edge.target !== action.payload
      );
    },
    updateEdges: (state, action) => {
      state.edges = action.payload;
    },
    deleteAllTables: (state) => {
      state.tables = []
    },
    addField: (state, action) => {
      const table = state.tables.find(t => t.id === action.payload.tableId)
      if (table) {
        table.fields.push({
          id: Date.now().toString(),
          name: action.payload.name,
          type: action.payload.type
        })
      }
    },
    saveTable: (state, action) => {
      const table = state.tables.find(t => t.id === action.payload.tableId);
      if (table) {
        const position = table.position; // Save current position
        Object.assign(table, action.payload);
        table.position = position; // Restore position
      }
    },
    setActiveTable: (state, action) => {
      state.activeTable = action.payload
    },
    updateTablePosition: (state, action) => {
      const { tableId, position } = action.payload;
      const table = state.tables.find(t => t.id === tableId);
      if (table) {
        table.position = position;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTable.fulfilled, (state, action) => {
        // Add new table while preserving existing ones
        const existingTable = state.tables.find(t => t.id === action.payload.id);
        if (!existingTable) {
          state.tables.push({
            ...action.payload,
            position: action.payload.position || { 
              x: Math.random() * 500,
              y: Math.random() * 500
            }
          });
        }
      })
      .addCase('schemas/deleteSchemaWithTables', (state, action) => {
        // Remove all tables associated with the deleted schema
        state.tables = state.tables.filter(table =>
          !action.payload.tablesIds.includes(table.id)
        )
      })
  }
})

// Create a thunk for deleting tables
export const deleteTableAsync = createAsyncThunk(
  'tables/deleteTableAsync',
  async (tableId, { getState, dispatch }) => {
    const schema = getState().schemas.schemas.find(
      s => s.id === getState().schemas.activeSchema
    );

    if (schema) {
      // Delete the table
      dispatch(deleteTable(tableId));
      
      // Remove table from schema
      dispatch(removeTableFromSchema({
        schemaId: schema.id,
        tableId: tableId
      }));
    }
  }
);

export const { deleteTable, deleteAllTables, addField, setActiveTable, saveTable, updateTablePosition, updateEdges } = tableSlice.actions
export default tableSlice.reducer