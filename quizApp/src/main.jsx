import React, { useState, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeWrapper />
  </React.StrictMode>,
)

function ColorModeWrapper() {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    // Check for saved mode in localStorage
    const savedMode = localStorage.getItem('color-mode')
    if (savedMode) {
      setMode(savedMode)
    }
  }, [])

  useEffect(() => {
    // Save mode to localStorage
    localStorage.setItem('color-mode', mode)
    // Add or remove dark class from the root element
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <App />
    </ColorModeContext.Provider>
  )
}
