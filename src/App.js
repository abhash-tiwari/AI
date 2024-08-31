import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import { generateGitCommands } from './utils/openaiService';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);

    try {
      const commands = await generateGitCommands(message);
      setMessages([...newMessages, { role: 'assistant', content: commands.join('\n') }]);
    } catch (error) {
      console.error('Error generating Git commands:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Error generating Git commands. Please try again.' }]);
    }
  };

  const insertCommand = (command) => {
    console.log('Inserting command:', command);
  };

  return (
    <div className="App">
      <h1>Git Commander</h1>
      <ChatInterface
        messages={messages}
        onSendMessage={sendMessage}
        onInsertCommand={insertCommand}
      />
    </div>
  );
}

export default App;