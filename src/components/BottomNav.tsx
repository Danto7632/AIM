import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface BottomNavProps {
  menuItems: MenuItem[];
  currentPage: string;
  onNavigate: (page: any) => void;
}

export function BottomNav({ menuItems, currentPage, onNavigate }: BottomNavProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 border-t safe-area-bottom"
      style={{ 
        backgroundColor: '#FFFFFF',
        borderColor: '#E4E8EE',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-0 flex-1"
              style={{
                color: isActive ? '#1A73E8' : '#6B7280',
              }}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <span className="text-xs truncate w-full text-center">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
