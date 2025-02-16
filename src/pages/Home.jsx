import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import screen from '../assets/screenshot.png'

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center pt-32 pb-12">
                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Design Your Database Schema
                        <span className="block text-teal-500">With Ease</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                        Create, visualize, and manage your database relationships with our intuitive diagram tool.
                        Perfect for developers and database architects.
                    </p>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/dashboard
              "
                            className="group relative flex items-center gap-2 rounded-lg bg-teal-500 border border-teal-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                        >
                            Get Started
                            <ArrowRightIcon
                                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Link>


                    </div>
                </div>

                {/* Optional: Add a preview image */}
                <div className="mt-10 flow-root sm:mt-24">
                    <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl">
                        <img
                            src={screen}
                            alt="App preview"
                            className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home