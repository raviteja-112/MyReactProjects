import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-left">
                        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                            Discover Your Next Read
                            <span className="hidden sm:block text-3xl">Explore a World of Stories</span>
                        </h2>

                        <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-600 rounded-lg hover:bg-orange-700 transition duration-300"
                            to="/about"
                        >
                            Learn More
                            <svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                ></path>
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full">
                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="https://images.unsplash.com/photo-1557804506-669a67965da0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                        alt="Modern Blog Image"
                    />
                </div>
            </aside>

            <div className="grid place-items-center sm:mt-20 mt-10">
                <img
                    className="sm:w-96 w-48 rounded-lg shadow-lg"
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Blog Post Image"
                />
            </div>

            <h1 className="text-center text-3xl sm:text-5xl py-10 font-extrabold text-gray-800">
                Fresh Perspectives, Engaging Content
            </h1>
        </div>
    );
}
