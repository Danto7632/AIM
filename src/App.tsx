import { useState } from 'react';
import { Home, FileText, CreditCard, FolderOpen, User } from 'lucide-react';
import { MainChat } from './components/MainChat';
import { DocumentStatus } from './components/DocumentStatus';
import { Payment } from './components/Payment';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { TopNav } from './components/TopNav';
import { DocumentStorage } from './components/DocumentStorage';
import { SavedDocumentsProvider } from './contexts/SavedDocumentsContext';

type Page = 'chat' | 'documents' | 'payment' | 'storage' | 'account';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('chat');

  const menuItems = [
    { id: 'chat' as Page, icon: Home, label: '홈' },
    { id: 'documents' as Page, icon: FileText, label: '발급 요청 내역' },
    { id: 'payment' as Page, icon: CreditCard, label: '결제 내역' },
    { id: 'storage' as Page, icon: FolderOpen, label: '내 문서 보관함' },
    { id: 'account' as Page, icon: User, label: '계정 정보' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return (
          <MainChat 
            onNavigateToPayment={() => setCurrentPage('payment')} 
            onNavigateToStorage={() => setCurrentPage('storage')} 
          />
        );
      case 'documents':
        return <DocumentStatus />;
      case 'payment':
        return (
          <Payment 
            onNavigateToStorage={() => setCurrentPage('storage')} 
            onNavigateHome={() => setCurrentPage('chat')} 
          />
        );
      case 'storage':
        return <DocumentStorage />;
      case 'account':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <User className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4" style={{ color: '#1A73E8' }} />
              <p style={{ color: '#0D1321' }}>계정 정보</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <SavedDocumentsProvider>
      <div className="flex h-screen" style={{ backgroundColor: '#F4F7FB' }}>
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar 
            menuItems={menuItems}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 overflow-auto pb-16 md:pb-0">
            {renderPage()}
          </main>
          
          {/* Mobile Bottom Navigation */}
          <div className="md:hidden">
            <BottomNav
              menuItems={menuItems}
              currentPage={currentPage}
              onNavigate={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </SavedDocumentsProvider>
  );
}