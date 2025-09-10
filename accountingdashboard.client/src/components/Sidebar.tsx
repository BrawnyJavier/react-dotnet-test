import { useState } from 'react';
import { ChevronDown, ChevronRight, BarChart3, DollarSign, TrendingUp, Receipt } from 'lucide-react';

interface SidebarProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Sidebar({ onNavigate, currentSection }: SidebarProps) {
  const [isAccountingOpen, setIsAccountingOpen] = useState(true);

  const menuItems = [
    {
      id: 'receivables-monitoring',
      label: 'Receivables Monitoring',
      icon: Receipt,
      active: currentSection === 'receivables-monitoring'
    },
    {
      id: 'commission-validation',
      label: 'Commission Validation',
      icon: DollarSign,
      active: false,
      disabled: true
    },
    {
      id: 'cpc-spend-monitoring',
      label: 'CPC & Spend Monitoring',
      icon: TrendingUp,
      active: false,
      disabled: true
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <BarChart3 size={24} className="sidebar-logo" />
        <h2>Dashboard</h2>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <button 
            className="nav-section-header"
            onClick={() => setIsAccountingOpen(!isAccountingOpen)}
          >
            <span>Accounting</span>
            {isAccountingOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {isAccountingOpen && (
            <ul className="nav-submenu">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-item ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                    onClick={() => !item.disabled && onNavigate(item.id)}
                    disabled={item.disabled}
                  >
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}
