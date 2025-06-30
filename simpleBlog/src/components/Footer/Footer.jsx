import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-800 border-t border-gray-700">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://flowbite.com/docs/images/logo.svg"
                                className="mr-3 h-16"
                                alt="SimpleBlog Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">SimpleBlog</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Resources</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:underline">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="hover:underline">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Follow us</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/raviteja-112"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">
                                        LinkedIn
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">
                                        Twitter
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">Legal</h2>
                            <ul className="text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">
                                        Terms & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-400 sm:text-center">
                        © {new Date().getFullYear()}
                        <a href="" className="hover:underline">
                            Raviteja
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        {/* Social media icons can be added here if needed, using modern SVG icons */}
                        {/* Example: */}
                        {/* <Link to="#" className="text-gray-400 hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C17.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </Link> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
