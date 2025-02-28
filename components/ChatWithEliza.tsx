'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { sparkles } from '@/images';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWithEliza = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm Eliza, your AI assistant for DeFi risk assessment. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // API credentials and endpoints
  const API_URL = 'https://autonome.alt.technology/rugsh-xvbwyz/';
  const AUTH_HEADER = 'Basic cnVnc2g6RXFhQWJvSkxTTw==';  // This is the correct encoded value for rugsh:EqaAboJLSO
  
  // Skip the fetch and just set the agent ID directly
  const [agentId, setAgentId] = useState<string | null>("a5c47395-6627-0a48-a2f4-5f835e119f0c");
  
  useEffect(() => {
    const fetchAgentId = async () => {
      try {
        console.log('Fetching agent ID from:', `${API_URL}agents`);
        const response = await fetch(`${API_URL}agents`, {
          method: 'GET',
          headers: {
            'Authorization': AUTH_HEADER
          }
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch agent ID: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Agent data:', data);
        
        if (data && data.agents && data.agents.length > 0) {
          // Based on the JSON structure in your screenshot
          setAgentId(data.agents[0].id);
          console.log('Agent ID set to:', data.agents[0].id);
        } else {
          console.error('No agents found in the response');
        }
      } catch (error) {
        console.error('Error fetching agent ID:', error);
      }
    };
    
    fetchAgentId();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !agentId) return;
    
    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}${agentId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': AUTH_HEADER
        },
        body: JSON.stringify({
          text: input
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to get response from Eliza: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle the array response format we see in your screenshot
      if (Array.isArray(data) && data.length > 0 && data[0].text) {
        setMessages(prev => [...prev, {
          text: data[0].text,
          isUser: false,
          timestamp: new Date()
        }]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-[#151516] rounded-lg p-4 flex flex-col h-[400px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 p-1.5 bg-white rounded-lg">
          <Image 
            src="/images/shield.png" 
            alt="Eliza AI" 
            width={24} 
            height={24}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-lg font-medium">Chat with Eliza</div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser 
                  ? 'bg-[#007aff] text-white' 
                  : 'bg-[#ffffff0d] border-[1px] border-[#2d2d2e]'
              }`}
            >
              {!message.isUser && (
                <div className="flex items-center gap-2 mb-1">
                  <Image
                    src={sparkles}
                    alt="sparkles"
                    width={12}
                    height={12}
                  />
                  <span className="text-xs text-[#868686]">Eliza AI</span>
                </div>
              )}
              <p className="text-sm">{message.text}</p>
              <div className="text-xs text-right mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#ffffff0d] border-[1px] border-[#2d2d2e] max-w-[80%] rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="animate-pulse flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about DeFi risks or market conditions..."
          className="flex-1 bg-[#ffffff0d] border-[1px] border-[#2d2d2e] rounded-lg p-3 text-sm resize-none h-[60px]"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim() || !agentId}
          className={`px-4 rounded-lg ${
            isLoading || !input.trim() || !agentId
              ? 'bg-[#3c3c3c] text-[#868686]'
              : 'bg-[#007aff] text-white'
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithEliza; 