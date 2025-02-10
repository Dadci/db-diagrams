import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRandomTailwindColor } from '../utils/getRandomTailwindColor'
import { addTableToSchema, removeTableFromSchema } from './schemaSlice'

export const addTable = createAsyncThunk(
  'tables/addTable',
  async (payload, { getState, dispatch }) => {
    const tableId = Date.now().toString();
    const activeSchema = getState().schemas.activeSchema;

    dispatch(addTableToSchema({
      schemaId: activeSchema,
      tableId: tableId
    }));

    return {
      id: tableId,
      name: payload.name || 'New Table',
      color: getRandomTailwindColor(),
      fields: [],
      schemaId: activeSchema
    };
  }
);

const tableSlice = createSlice({
  name: 'tables',
  initialState: {
    tables: [],
    activeTable: null
  },
  reducers: {
    deleteTable: (state, action) => {
      const table = state.tables.find(t => t.id === action.payload)
      if (table) {
        state.tables = state.tables.filter(t => t.id !== action.payload)
        // We'll handle this in our thunk
      }
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
      const table = state.tables.find(t => t.id === action.payload.tableId)
      if (table) {
        table.name = action.payload.name
        table.fields = action.payload.fields
      }
    },
    setActiveTable: (state, action) => {
      state.activeTable = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTable.fulfilled, (state, action) => {
        state.tables.push(action.payload)
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
    const table = getState().tables.tables.find(t => t.id === tableId)
    if (table) {
      dispatch(deleteTable(tableId))
      dispatch(removeTableFromSchema({
        schemaId: table.schemaId,
        tableId: tableId
      }))
    }
  }
)

export const { deleteTable, addField, setActiveTable, saveTable } = tableSlice.actions
export default tableSlice.reducer