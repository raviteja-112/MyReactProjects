import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-8 m-8 rounded-lg shadow-xl">
      <img
        src={data.avatar_url}
        alt="Github Avatar"
        width={200}
        className="rounded-full border-4 border-blue-500 mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">GitHub Profile</h1>
      <p className="text-2xl text-gray-300 mb-4">Username: {data.login}</p>
      <p className="text-3xl font-semibold text-blue-400">Followers: {data.followers}</p>
      <p className="text-xl text-gray-400 mt-2">Public Repos: {data.public_repos}</p>
      <a
        href={data.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center px-6 py-3 font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 text-white"
      >
        View Profile on GitHub
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
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          ></path>
        </svg>
      </a>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch(`https://api.github.com/users/raviteja-112`);
  return response.json();
};
