import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Create socket instance
const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentChannel, setCurrentChannel] = useState(1); // Default to channel 1

  // Connect to socket and load messages when component mounts
  useEffect(() => {
    console.log('Setting up socket listeners...');
    
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    console.log('Joining channel:', currentChannel);
    socket.emit('join_channel', currentChannel);

    // Load existing messages
    fetchMessages();

    // Listen for new messages
    socket.on('new_message', (message) => {
      console.log('Received new message via socket:', message);
      setMessages(prev => [...prev, message]);
    });

    return () => {
      console.log('Cleaning up socket listeners...');
      socket.off('new_message');
      socket.emit('leave_channel', currentChannel);
    };
  }, [currentChannel]);

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/channel/${currentChannel}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send message handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/messages/channel/${currentChannel}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: currentMessage,
          userId: 'test123', // Using our test user for now
        }),
      });

      if (response.ok) {
        setCurrentMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.message_id} className="flex items-start">
              <div className="bg-gray-800 rounded-lg px-4 py-2 max-w-xl">
                <div className="font-bold text-white">{message.user_name || 'Unknown User'}</div>
                <div className="text-gray-300">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="h-20 border-t border-gray-600 p-4">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Message #general"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
