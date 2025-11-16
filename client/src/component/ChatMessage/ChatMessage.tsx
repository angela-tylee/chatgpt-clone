import LoadingDots from "../LoadingDots/LoadingDots";
import TypingText from "../TypingText/TypingText";
import "./ChatMessage.css";

interface Message {
  id: string;
  isAi: boolean;
  content: string;
  isLoading?: boolean;
  isTyping?: boolean;
}

const ChatMessage: React.FC<{ message: Message; onTypingComplete: () => void }> = ({ message, onTypingComplete }) => {

  return (
    <div className="wrapper">
      <div className="chat">
        <div className="profile">
          {message.isAi ? 
            <img src="./assets/bot.svg" alt="bot" />
            : 
            <img src="./assets/user.svg" alt="user" />
          }
        </div>
        <div className="message">
          {message.isLoading ? (
            <LoadingDots />
          ) : message.isTyping ? (
            <TypingText text={message.content} onComplete={onTypingComplete} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: message.content }} />
          )}
        </div>
      </div>
    </div>)
}

export default ChatMessage;