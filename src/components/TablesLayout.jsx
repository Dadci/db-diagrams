import React from 'react'
import Table from './Table'
import { useSelector } from 'react-redux'
import { TableCellsIcon } from '@heroicons/react/24/outline'

const TableLayout = () => {
  const activeSchemaId = useSelector(state => state.schemas.activeSchemaId)
  const tables = useSelector(state =>
    state.schemas.schemas
      .find(s => s.id === activeSchemaId)
      ?.tables || []
  )

  if (tables.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <TableCellsIcon className="w-8 h-8 text-gray-400" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">No tables yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first table
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {tables.map(table => (
        <Table key={table.id} tableData={table} />
      ))}
    </div>
  )
}

export default TableLayout