import { CircleStackIcon } from '@heroicons/react/24/outline'
import AddBtn from './AddBtn'
import TableLayout from './TablesLayout'

const tables = [
  { id: 1, name: 'Users', href: '#', icon: CircleStackIcon, current: false },
  { id: 2, name: 'Products', href: '#', icon: CircleStackIcon, current: false },
  { id: 3, name: 'Orders', href: '#', icon: CircleStackIcon, current: false },
]

function Sidebar() {
  return (
    <div className="flex min-h-screen w-[360px] flex-col gap-y-5 overflow-y-auto bg-white px-3 border-r border-gray-200">
      <div className="pt-3">
        <TableLayout />
      </div>
     
    </div>
  )
}

export default Sidebar
