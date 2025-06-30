import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="shadow-md sticky z-50 top-0 bg-white">
            <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="mr-3 h-16"
                            alt="SimpleBlog Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">SimpleBlog</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="#"
                            className="text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none transition duration-300"
                        >
                            Log in
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none transition duration-300"
                        >
                            Get started
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/contact"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/github"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Github
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to="/user"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 
                                        ${isActive ? "text-blue-700" : "text-gray-700" } lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    User
                                </NavLink>
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
