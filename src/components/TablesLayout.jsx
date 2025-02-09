import React from 'react'
import Table from './Table'
import { useSelector } from 'react-redux'


const TableLayout = () => {
    const tables = useSelector(state => state.tables.tables)
    return (
        <div className="flex flex-col gap-3">
        {tables.map(table => (
          <Table key={table.id} tableData={table} />
        ))}
      </div>
    )
}

export default TableLayout