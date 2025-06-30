import React from 'react';

export default function About() {
    return (
        <div className="py-16 bg-gray-50">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-12 lg:items-center lg:gap-20">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt="Modern Team Collaboration"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-3xl text-gray-900 font-extrabold md:text-4xl">
                            Our Passion for Modern Web Development
                        </h2>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                            At SimpleBlog, we believe in crafting seamless and engaging web experiences. Our team of
                            dedicated developers is passionate about bringing innovative ideas to life, focusing on
                            clean code, modern design, and user-centric functionality.
                        </p>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            We leverage the latest technologies like React and Tailwind CSS to build robust and
                            scalable applications that meet the demands of today's digital landscape. Join us on our
                            journey to create impactful web solutions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
