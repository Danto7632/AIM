import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  currentPage: string;
  onNavigate: (page: any) => void;
}

export function Sidebar({ menuItems, currentPage, onNavigate }: SidebarProps) {
  return (
    <aside 
      className="w-64 flex flex-col border-r" 
      style={{ 
        backgroundColor: '#FFFFFF',
        borderColor: '#E4E8EE'
      }}
    >
      <div className="p-6 border-b" style={{ borderColor: '#E4E8EE' }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#1A73E8' }}
          >
            <span className="text-white">AI</span>
          </div>
          <div>
            <div style={{ color: '#0D1321' }}>행정서류 비서</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 transition-all"
                  style={{
                    backgroundColor: isActive ? '#E8F1FC' : 'transparent',
                    color: isActive ? '#1A73E8' : '#0D1321',
                    borderRadius: '12px',
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
