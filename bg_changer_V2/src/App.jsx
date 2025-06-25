import { useState } from 'react'

function App() {
  const [bgColor, setBgColor] = useState('#ffffff')

  const handleColorChange = (event) => {
    setBgColor(event.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-500 ease-in-out" style={{ backgroundColor: bgColor }}>
      <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-2xl w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Background Color Changer
        </h1>
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="color"
            className="w-12 h-12 p-0 border-none rounded-full cursor-pointer"
            value={bgColor}
            onChange={handleColorChange}
          />
          <span className="text-lg text-gray-600">Selected color: {bgColor}</span>
        </div>
        <div className="w-full">
          <button
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out"
            onClick={() => setBgColor('#' + Math.floor(Math.random()*16777215).toString(16))}
          >
            Random Color
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
