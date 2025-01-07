import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-4">Chat App</h1>
        
        {/* Channels Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Channels</h2>
          <ul className="space-y-1">
            <li className="px-2 py-1 hover:bg-gray-700 rounded cursor-pointer"># general</li>
            <li className="px-2 py-1 hover:bg-gray-700 rounded cursor-pointer"># random</li>
          </ul>
        </div>

        {/* Direct Messages Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">Direct Messages</h2>
          <ul className="space-y-1">
            <li className="px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
              John Doe
            </li>
            <li className="px-2 py-1 hover:bg-gray-700 rounded cursor-pointer">
              <span className="w-2 h-2 bg-gray-500 rounded-full inline-block mr-2"></span>
              Jane Smith
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-700">
        {/* Channel Header */}
        <div className="h-14 border-b border-gray-600 px-4 flex items-center">
          <h2 className="text-white text-lg font-semibold"># general</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Messages will go here */}
        </div>

        {/* Message Input */}
        <div className="h-20 border-t border-gray-600 p-4">
          <input
            type="text"
            placeholder="Message #general"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
