import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const { userid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userid) {
      setLoading(true);
      setError(null);
      fetch(`https://api.github.com/users/${userid}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [userid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 text-gray-800 text-2xl font-bold shadow-lg rounded-lg m-8">
        Loading GitHub profile for {userid}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-red-100 text-red-800 text-2xl font-bold shadow-lg rounded-lg m-8">
        Error: {error.message}. Could not load GitHub profile for {userid}.
      </div>
    );
  }

  if (!data || data.message === "Not Found") {
    return (
      <div className="flex items-center justify-center h-48 bg-yellow-100 text-yellow-800 text-2xl font-bold shadow-lg rounded-lg m-8">
        No GitHub profile found for {userid}.
      </div>
    );
  }

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

export default User;
