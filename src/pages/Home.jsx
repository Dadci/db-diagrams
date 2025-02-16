import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import screen from '../assets/screenshot.png'

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="relative isolate">
                {/* Background decoration */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-teal-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center pt-24 pb-12 lg:pt-32">
                        <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-700/10">
                            <span className="text-sm font-semibold">Now in Beta</span>
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                            Design Your Database Schema
                            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                                With Ease
                            </span>
                        </h1>

                        <p className="mt-8 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                            Create, visualize, and manage your database relationships with our intuitive diagram tool.
                            Perfect for developers and database architects.
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/dashboard"
                                className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                            >
                                Get Started Free
                                <ArrowRightIcon
                                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Improved Screenshot Section */}
                    <div className="mt-16 sm:mt-24 pb-24">
                        <div className="relative mx-auto max-w-6xl">
                            {/* Browser-like frame */}
                            <div className="rounded-xl bg-gray-800/5 p-1.5">
                                {/* Browser top bar */}
                                <div className="flex items-center gap-2 border-b border-gray-900/10 bg-white px-4 py-3 rounded-t-lg">
                                    <div className="flex gap-2">
                                        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                                        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                                        <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                                    </div>
                                </div>

                                {/* Screenshot container */}
                                <div className="overflow-hidden rounded-b-lg bg-gray-50">
                                    <img
                                        src={screen}
                                        alt="DB Diagrams interface preview"
                                        className="w-full object-cover shadow-sm"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 -left-4 -bottom-4 -z-10 bg-gradient-to-b from-blue-50 to-white rounded-xl"></div>
                            <div className="absolute -top-8 -right-8 -left-8 -bottom-8 -z-20 bg-gradient-to-tr from-blue-50/50 to-teal-50/50 rounded-xl blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home