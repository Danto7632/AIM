import { useState } from 'react';
import { Send, Mic, FileText, CheckCircle, ArrowRight, Download } from 'lucide-react';

interface MainChatProps {
  onNavigateToPayment: () => void;
}

export function MainChat({ onNavigateToPayment }: MainChatProps) {
  const [input, setInput] = useState('');

  const quickQuestions = [
    '전입신고 해줘',
    '장학금 서류 준비해줘',
    '운전면허 갱신'
  ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto px-4 md:px-6 py-4 md:py-8 space-y-4 md:space-y-6">
        {/* AI Message */}
        <div className="flex gap-2 md:gap-4">
          <div 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#1A73E8' }}
          >
            <span className="text-white text-xs md:text-sm">AI</span>
          </div>
          <div className="flex-1">
            <div 
              className="px-3 py-2 md:px-4 md:py-3 rounded-2xl inline-block text-sm md:text-base"
              style={{ backgroundColor: '#FFFFFF', color: '#0D1321' }}
            >
              안녕하세요! AI 행정서류 비서입니다. 어떤 행정 업무를 도와드릴까요?
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-2 md:gap-4 justify-end">
          <div 
            className="px-3 py-2 md:px-4 md:py-3 rounded-2xl inline-block text-sm md:text-base"
            style={{ backgroundColor: '#1A73E8', color: '#FFFFFF' }}
          >
            전입신고 하고 싶어요
          </div>
        </div>

        {/* AI Response with Document Card */}
        <div className="flex gap-2 md:gap-4">
          <div 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#1A73E8' }}
          >
            <span className="text-white text-xs md:text-sm">AI</span>
          </div>
          <div className="flex-1 space-y-3 md:space-y-4">
            <div 
              className="px-3 py-2 md:px-4 md:py-3 rounded-2xl inline-block text-sm md:text-base"
              style={{ backgroundColor: '#FFFFFF', color: '#0D1321' }}
            >
              전입신고를 도와드리겠습니다. 필요한 서류를 자동으로 확인했어요.
            </div>

            {/* Document Mapping Card */}
            <div 
              className="p-4 md:p-6 rounded-2xl border"
              style={{ 
                backgroundColor: '#FFFFFF',
                borderColor: '#E4E8EE'
              }}
            >
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <FileText className="w-4 h-4 md:w-5 md:h-5" style={{ color: '#1A73E8' }} />
                <h3 className="text-sm md:text-base" style={{ color: '#0D1321' }}>필요 서류 자동 매핑 결과</h3>
              </div>

              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                {[
                  { name: '주민등록등본', agency: '정부24', status: 'ready' },
                  { name: '전입세대 열람내역서', agency: '정부24', status: 'ready' },
                  { name: '건강보험자격득실확인서', agency: '국민건강보험공단', status: 'ready' }
                ].map((doc, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: '#F4F7FB' }}
                  >
                    <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#1A73E8' }} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm md:text-base truncate" style={{ color: '#0D1321' }}>{doc.name}</div>
                        <div className="text-xs md:text-sm" style={{ color: '#6B7280' }}>
                          {doc.agency}
                        </div>
                      </div>
                    </div>
                    <span 
                      className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full whitespace-nowrap ml-2"
                      style={{ backgroundColor: '#E8F1FC', color: '#1A73E8' }}
                    >
                      발급가능
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                <button
                  className="flex-1 px-4 py-3 rounded-xl transition-all text-sm md:text-base"
                  style={{ 
                    backgroundColor: '#1A73E8',
                    color: '#FFFFFF'
                  }}
                >
                  서류 자동발급
                </button>
                <button
                  onClick={onNavigateToPayment}
                  className="flex-1 px-4 py-3 rounded-xl border transition-all text-sm md:text-base"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E4E8EE',
                    color: '#0D1321'
                  }}
                >
                  결제 진행
                </button>
              </div>

              <button
                className="w-full mt-3 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all text-sm md:text-base"
                style={{ color: '#1A73E8' }}
              >
                <span>단계별 안내 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Additional Info Card */}
            <div 
              className="p-3 md:p-4 rounded-2xl text-sm md:text-base"
              style={{ backgroundColor: '#FFF9E6', borderLeft: '4px solid #FFC107' }}
            >
              <div style={{ color: '#0D1321' }}>
                💡 전입신고는 이사 후 14일 이내에 완료하셔야 합니다.
              </div>
            </div>
          </div>
        </div>
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
              onClick={() => setInput(question)}
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
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}