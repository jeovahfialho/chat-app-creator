import React, { useState, useRef } from 'react';
import { Sun, Moon, MessageSquare, Settings, User, Upload, Image, Mic, File } from 'lucide-react';

const ChatDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [interactionType, setInteractionType] = useState('text');
  const [options, setOptions] = useState([]);
  const [logs, setLogs] = useState([]);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', content: inputValue }]);
      setInputValue('');
      // Simulação de resposta do backend
      setTimeout(() => {
        const backendResponse = { type: 'bot', content: `Resposta do backend para: "${inputValue}"` };
        setMessages(prev => [...prev, backendResponse]);
        // Simular mudança de interação
        if (Math.random() > 0.7) {
          setInteractionType(Math.random() > 0.5 ? 'yesno' : 'options');
          if (interactionType === 'options') {
            setOptions(['Opção 1', 'Opção 2', 'Opção 3']);
          }
        } else {
          setInteractionType('text');
        }
        // Atualizar logs
        setLogs(prev => [...prev, `Step ${currentStep}: Mensagem enviada e resposta recebida`]);
        setCurrentStep(prev => prev + 1);
      }, 1000);
    }
  };

  const handleYesNo = (answer) => {
    setMessages([...messages, { type: 'user', content: answer ? 'Sim' : 'Não' }]);
    setInteractionType('text');
    setLogs(prev => [...prev, `Step ${currentStep}: Resposta ${answer ? 'Sim' : 'Não'} enviada`]);
    setCurrentStep(prev => prev + 1);
  };

  const handleOptions = (option) => {
    setMessages([...messages, { type: 'user', content: `Opção selecionada: ${option}` }]);
    setInteractionType('text');
    setLogs(prev => [...prev, `Step ${currentStep}: Opção "${option}" selecionada`]);
    setCurrentStep(prev => prev + 1);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Aqui você implementaria a lógica real de upload
      setMessages([...messages, { type: 'user', content: `Arquivo enviado: ${file.name}` }]);
      setLogs(prev => [...prev, `Step ${currentStep}: Arquivo "${file.name}" enviado`]);
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Menu superior */}
      <header className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chat Dashboard</h1>
          <nav className="flex items-center">
            <button className={`mr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => fileInputRef.current.click()}>
              <Upload size={24} />
            </button>
            <button className={`mr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => fileInputRef.current.click()}>
              <Image size={24} />
            </button>
            <button className={`mr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => fileInputRef.current.click()}>
              <Mic size={24} />
            </button>
            <button className={`mr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`} onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button className={`mr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}><MessageSquare size={24} /></button>
            <button className={`${darkMode ? 'text-white' : 'text-gray-900'}`}><Settings size={24} /></button>
          </nav>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      </header>

      {/* Área principal */}
      <main className="flex-grow container mx-auto p-4 overflow-hidden flex">
        {/* Chat e área de entrada */}
        <div className="flex flex-col w-3/4 mr-4">
          {/* Chat */}
          <div className={`flex-grow overflow-y-auto mb-4 p-4 rounded-lg shadow-inner ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-300 text-gray-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Área de entrada */}
          <div className="flex flex-col space-y-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`flex-grow p-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
              }`}
              placeholder="Digite sua mensagem..."
              rows="3"
            />
            <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-lg">Enviar</button>
          </div>

          {/* Botões Sim/Não */}
          {interactionType === 'yesno' && (
            <div className="mt-4 flex justify-center space-x-4">
              <button onClick={() => handleYesNo(true)} className="p-2 bg-green-500 text-white rounded-lg">Sim</button>
              <button onClick={() => handleYesNo(false)} className="p-2 bg-red-500 text-white rounded-lg">Não</button>
            </div>
          )}

          {/* Opções */}
          {interactionType === 'options' && (
            <div className="mt-4 flex justify-center space-x-4">
              {options.map((option, index) => (
                <button key={index} onClick={() => handleOptions(option)} className="p-2 bg-purple-500 text-white rounded-lg">{option}</button>
              ))}
            </div>
          )}
        </div>

        {/* Quadro de logs */}
        <div className={`w-1/4 p-4 rounded-lg overflow-y-auto shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-lg font-bold mb-2">Logs</h2>
          {logs.map((log, index) => (
            <div key={index} className="mb-2 text-sm">
              {log}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;