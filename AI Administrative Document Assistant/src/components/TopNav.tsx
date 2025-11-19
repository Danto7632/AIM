import { HelpCircle, Settings, Menu } from 'lucide-react';

export function TopNav() {
  return (
    <header 
      className="border-b px-4 md:px-6 py-3 md:py-4 flex items-center justify-between"
      style={{ 
        backgroundColor: '#FFFFFF',
        borderColor: '#E4E8EE'
      }}
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#1A73E8' }}
        >
          <span className="text-white text-sm">AI</span>
        </div>
        <h1 className="text-base md:text-lg" style={{ color: '#0D1321' }}>AI 행정서류 비서</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-opacity-10"
          style={{ color: '#0D1321' }}
        >
          <HelpCircle className="w-5 h-5" />
          <span>도움말</span>
        </button>
        <button 
          className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-full transition-all hover:bg-opacity-10"
          style={{ color: '#0D1321' }}
        >
          <Settings className="w-5 h-5" />
          <span className="hidden md:inline">설정</span>
        </button>
      </div>
    </header>
  );
}