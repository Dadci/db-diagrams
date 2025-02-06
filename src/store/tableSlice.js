import { createSlice } from '@reduxjs/toolkit'

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
        fields: []
      })
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
    setActiveTable: (state, action) => {
      state.activeTable = action.payload
    }
  }
})

export const { addTable, addField, setActiveTable } = tableSlice.actions
export default tableSlice.reducer