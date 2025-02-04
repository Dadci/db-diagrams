import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  CircleStackIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'

import { CircleStackIcon as CircleOutline } from '@heroicons/react/24/outline'
import logo from '../assets/logo.svg'

const navigation = [
  { name: 'Overview', href: '#', icon: ChartBarIcon, current: true },

  { name: 'Databases', href: '#', icon: CircleStackIcon, count: '12', current: false },



]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', icon: <CircleOutline className="h-4 w-4 text-gray-500" />, current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', icon: <CircleOutline className="h-4 w-4 text-gray-500" />, current: false },
  { id: 3, name: 'Workcation', href: '#', icon: <CircleOutline className="h-4 w-4 text-gray-500" />, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Sidebar() {
  return (
    <div className="flex min-h-screen w-[260px] flex-col gap-y-5 overflow-y-auto bg-gray-950 px-6 border-r border-gray-700">
      <div className="flex h-16 shrink-0 items-center">
        <img
          alt="Your Company"
          src={logo}
          className="h-6 w-auto"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    )}
                  >
                    <item.icon aria-hidden="true" className="h-6 w-6 shrink-0" />
                    {item.name}
                    {item.count ? (
                      <span
                        aria-hidden="true"
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">Databases</div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    href={team.href}
                    className={classNames(
                      team.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.icon}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
            >
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-8 w-8 rounded-full bg-gray-800"
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar