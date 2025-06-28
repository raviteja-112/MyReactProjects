import { useState, useEffect, useRef, useCallback } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12); // Default length to 12
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = '';
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars.length === 0) {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      result += allChars[randomIndex];
    }

    setPassword(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="absolute top-4 right-4">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium">Dark Mode</span>
        </label>
      </div>

      <h1 className="text-4xl font-extrabold mb-8 text-blue-600 dark:text-blue-400">
        Secure Password Generator
      </h1>

      <div className="mb-6 relative w-full max-w-md">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className={`w-full p-3 pr-24 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        />
        <button
          onClick={copyToClipboard}
          className="absolute right-0 top-0 h-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 rounded-r-lg transition-colors duration-200"
        >
          Copy
        </button>
      </div>

      <div className="mb-6 w-full max-w-md">
        <label htmlFor="password-length" className="block text-lg font-medium mb-2">
          Password Length: <span className="font-bold text-blue-600 dark:text-blue-400">{length}</span>
        </label>
        <input
          type="range"
          id="password-length"
          min="4"
          max="50"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="uppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="uppercase" className="ml-2 text-md font-medium">
            Include Uppercase
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="lowercase"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="lowercase" className="ml-2 text-md font-medium">
            Include Lowercase
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="numbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="numbers" className="ml-2 text-md font-medium">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="symbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="symbols" className="ml-2 text-md font-medium">
            Include Symbols
          </label>
        </div>
      </div>

      <button
        onClick={generatePassword}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200"
      >
        Generate New Password
      </button>
    </div>
  );
}

export default App;
