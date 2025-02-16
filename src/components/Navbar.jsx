import {
    ChartBarIcon,
    CircleStackIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline'
import logo from '../assets/logo.svg'
import AddBtn from './AddBtn'
import { useSelector } from 'react-redux'



const navigation = [
    { name: 'Overview', href: '/dashboard', icon: ChartBarIcon },

]

const Navbar = () => {

    const schemas = useSelector(state => state.schemas.schemas)

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 pr-8 ">
                            <img className="h-5 w-auto" src={logo} alt="Logo" />
                        </div>
                        <div className="hidden md:flex gap-12 md:items-center">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.name}
                                        {schemas.length && (
                                            <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 ring-1 ring-gray-200">
                                                {schemas.length}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="md:hidden">
                        <button className="text-gray-500 hover:text-gray-900">
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="hidden md:block">
                        <div className="flex items-center">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
