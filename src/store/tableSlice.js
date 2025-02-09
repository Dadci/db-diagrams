import { createSlice } from '@reduxjs/toolkit'
import { getRandomTailwindColor } from '../utils/getRandomTailwindColor'

const tableSlice = createSlice({
  name: 'tables',
  initialState: {
    tables: [],
    activeTable: null
  },
  reducers: {
    addTable: (state, action) => {
      state.tables.push({
        id: Date.now().toString(),
        name: action.payload.name,
        color:getRandomTailwindColor(),
        fields: []
      })
    },
    deleteTable: (state, action) => {
      state.tables = state.tables.filter(t => t.id !== action.payload)
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
  }
})

export const { addTable, deleteTable, addField, setActiveTable, saveTable } = tableSlice.actions
export default tableSlice.reducer