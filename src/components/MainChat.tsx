import { useEffect, useRef, useState } from 'react';
import { Send, Mic, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { fixedResponse, StageMessage } from '../data/fixedResponse';
import { useSavedDocuments } from '../contexts/SavedDocumentsContext';

interface MainChatProps {
  onNavigateToPayment: () => void;
  onNavigateToStorage: () => void;
}

export function MainChat({ onNavigateToPayment, onNavigateToStorage }: MainChatProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([greetingMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { documents } = useSavedDocuments();

  const quickQuestions = [
    '전입신고 해줘',
    '장학금 서류 준비해줘',
    '운전면허 갱신'
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (presetText?: string) => {
    const content = (presetText ?? input).trim();
    if (!content || isTyping) return;

    const stage = fixedResponse.stages[stageIndex] ?? fixedResponse.stages[fixedResponse.stages.length - 1];
    setStageIndex((prev) => Math.min(prev + 1, fixedResponse.stages.length - 1));

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      kind: 'text',
      text: content,
    };

    setInput('');
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      stage.messages.forEach((stageMessage, idx) => {
        const delay = idx * 800; // sequential delay between stage messages
        setTimeout(() => {
          const aiMessage = createAiMessageFromStage(stageMessage, `${stage.id}-${Date.now()}-${idx}`);
          setMessages((prev) => [...prev, aiMessage]);
          if (idx === stage.messages.length - 1) {
            setIsTyping(false);
          }
        }, delay);
      });
    }, fixedResponse.responseDelayMs);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-8 space-y-4 md:space-y-6">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            onNavigateToPayment={onNavigateToPayment}
            onNavigateToStorage={onNavigateToStorage}
            hasSavedDocuments={documents.length > 0}
          />
        ))}
        {messages.length === 1 && messages[0].id === greetingMessage.id && !isTyping && (
          <div className="rounded-2xl border p-4 text-sm md:text-base" style={{ borderColor: '#E4E8EE', backgroundColor: '#FFFFFF', color: '#6B7280' }}>
            {fixedResponse.placeholderText}
          </div>
        )}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input Area */}
      <div 
        className="border-t px-4 md:px-6 py-3 md:py-4"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#E4E8EE'
        }}
      >
        {/* Quick Questions */}
        <div className="flex gap-2 mb-3 md:mb-4 flex-wrap">
          {quickQuestions.map((question, idx) => (
            <button
              key={idx}
              className="px-3 py-2 md:px-4 rounded-full border transition-all hover:border-opacity-100 text-xs md:text-sm"
              style={{ 
                borderColor: '#E4E8EE',
                color: '#0D1321',
                backgroundColor: '#FFFFFF'
              }}
              onClick={() => handleSend(question)}
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div 
          className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-2xl border"
          style={{ borderColor: '#E4E8EE' }}
        >
          <input
            type="text"
            placeholder="필요한 행정 업무를 말씀해주세요..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 outline-none bg-transparent text-sm md:text-base"
            style={{ color: '#0D1321' }}
          />
          <button 
            className="p-2 rounded-full"
            style={{ color: '#6B7280' }}
          >
            <Mic className="w-5 h-5" />
          </button>
          <button 
            className="p-2 rounded-full"
            style={{ backgroundColor: '#1A73E8', color: '#FFFFFF' }}
            onClick={() => handleSend()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

type ChatMessage =
  | { id: string; role: 'user'; kind: 'text'; text: string }
  | { id: string; role: 'ai'; kind: 'text' | 'tip'; text: string }
  | { id: string; role: 'ai'; kind: 'documents' };

const greetingMessage: ChatMessage = {
  id: 'ai-greeting',
  role: 'ai',
  kind: 'text',
  text: fixedResponse.greetingText,
};

interface ChatBubbleProps {
  message: ChatMessage;
  onNavigateToPayment: () => void;
  onNavigateToStorage: () => void;
  hasSavedDocuments: boolean;
}

function ChatBubble({ message, onNavigateToPayment, onNavigateToStorage, hasSavedDocuments }: ChatBubbleProps) {
  if (message.kind === 'documents') {
    return (
      <div className="flex gap-2 md:gap-4">
        <Avatar />
        <div className="flex-1 space-y-3 md:space-y-4">
          <div 
            className="p-4 md:p-6 rounded-2xl border"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#E4E8EE' }}
          >
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <FileText className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#1A73E8' }} />
              <h3 className="text-sm md:text-base" style={{ color: '#0D1321' }}>필요 서류 자동 매핑 결과</h3>
            </div>

            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              {fixedResponse.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#F4F7FB' }}>
                  <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#1A73E8' }} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm md:text-base truncate" style={{ color: '#0D1321' }}>{doc.name}</div>
                      <div className="text-xs md:text-sm" style={{ color: '#6B7280' }}>{doc.agency}</div>
                    </div>
                  </div>
                  <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full whitespace-nowrap ml-2" style={{ backgroundColor: '#E8F1FC', color: '#1A73E8' }}>
                    발급가능
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              <button
                onClick={onNavigateToPayment}
                className="w-full px-4 py-3 rounded-xl transition-all text-sm md:text-base"
                style={{ backgroundColor: '#1A73E8', color: '#FFFFFF' }}
              >
                서류 발급
              </button>
            </div>

            <button className="w-full mt-3 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all text-sm md:text-base" style={{ color: '#1A73E8' }}>
              <span>단계별 안내 보기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {hasSavedDocuments && (
              <button
                onClick={onNavigateToStorage}
                className="w-full mt-3 px-4 py-3 rounded-xl border transition-all text-sm md:text-base"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E4E8EE', color: '#0D1321' }}
              >
                내 문서 보관함으로 이동
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isUser = message.role === 'user';
  const bubbleStyles = isUser
    ? { backgroundColor: '#1A73E8', color: '#FFFFFF' }
    : { backgroundColor: '#FFFFFF', color: '#0D1321' };

  return (
    <div className={`flex gap-2 md:gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <Avatar />}
      <div className={isUser ? 'flex justify-end w-full' : 'flex-1'}>
        <div className="px-3 py-2 md:px-4 md:py-3 rounded-2xl inline-block text-sm md:text-base" style={bubbleStyles}>
          {message.role === 'ai' && (message.kind === 'text' || message.kind === 'tip') ? (
            <TypewriterText text={message.text} speed={fixedResponse.typewriterSpeedMs} />
          ) : (
            message.text
          )}
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1A73E8' }}>
      <span className="text-white text-xs md:text-sm">AI</span>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 md:gap-4">
      <Avatar />
      <div className="px-4 py-3 rounded-2xl inline-flex items-center gap-1" style={{ backgroundColor: '#FFFFFF', color: '#0D1321' }}>
        {[0, 1, 2].map((idx) => (
          <span
            key={idx}
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${idx * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function TypewriterText({ text, speed }: { text: string; speed: number }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
}

function createAiMessageFromStage(stageMessage: StageMessage, id: string): ChatMessage {
  if (stageMessage.kind === 'documents') {
    return {
      id: `ai-docs-${id}`,
      role: 'ai',
      kind: 'documents',
    };
  }

  return {
    id: `ai-${stageMessage.kind}-${id}`,
    role: 'ai',
    kind: stageMessage.kind,
    text: stageMessage.text,
  };
}