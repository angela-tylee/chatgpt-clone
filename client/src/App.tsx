import { useEffect, useRef, useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import ChatMessage from './component/ChatMessage/ChatMessage';

interface Message {
  id: string;
  isAi: boolean;
  content: string;
  isLoading?: boolean;
  isTyping?: boolean;
}

function App() {

  // function loader(element) {
  //   element.textContent = '';

  //   let loadInterval = setInterval(() => {
  //     element.textContent += '.';

  //     if (element.textContent === '....') {
  //       element.textContent = '';
  //     }
  //   }, 300)
  // }

  // function typeText(element, text) {
  //   let index = 0;

  //   let interval = setInterval(() => {
  //     if (index < text.length) {
  //       element.innerHTML += text.charAt(index);
  //       index++;
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 20)
  // }

  // generate unique ID for each message div of bot
  // necessary for typing text effect for that specific reply
  // without unique ID, typing text will work on every element
  function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isSubmitting) return;

    const userMessage: Message = {
      id: generateUniqueId(),
      isAi: false,
      content: inputValue.trim()
    };

    const botLoadingMessage: Message = {
      id: generateUniqueId(),
      isAi: true,
      content: '',
      isLoading: true
    };

    setMessages(prev => [...prev, userMessage, botLoadingMessage]);
    setInputValue('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://chatgpt-clone-c1hk.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage.content
        })
      });

      if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();

        setMessages(prev =>
          prev.map(msg =>
            msg.id === botLoadingMessage.id
              ? { ...msg, content: parsedData, isLoading: false, isTyping: true }
              : msg
          )
        );
      } else {
        const err = await response.text();
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botLoadingMessage.id
              ? { ...msg, content: 'Something went wrong', isLoading: false }
              : msg
          )
        );
        alert(err);
      }
    } catch {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botLoadingMessage.id
            ? { ...msg, content: 'Something went wrong', isLoading: false }
            : msg
        )
      );
      alert('Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypingComplete = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, isTyping: false }
          : msg
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };


  return (
    <>
      <div
        ref={chatContainerRef}
        className="container">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            onTypingComplete={() => handleTypingComplete(message.id)}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask codex..."
          disabled={isSubmitting}
          rows={1}
        />
        <button
          type="submit"
          disabled={isSubmitting || !inputValue.trim()}
        >
          <img src="./assets/send.svg" alt="send" />
        </button>
      </form>
    </>
  )
}

export default App
