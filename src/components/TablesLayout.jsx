import React from 'react'
import Table from './Table'
import { useSelector } from 'react-redux'

const TableLayout = () => {
  const activeSchemaId = useSelector(state => state.schemas.activeSchemaId)
  const tables = useSelector(state =>
    state.schemas.schemas
      .find(s => s.id === activeSchemaId)
      ?.tables || []
  )

  return (
    <div className="flex flex-col gap-3">
      {tables.map(table => (
        <Table key={table.id} tableData={table} />
      ))}
    </div>
  )
}

export default TableLayout