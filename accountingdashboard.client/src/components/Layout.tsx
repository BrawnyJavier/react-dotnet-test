import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  currentSection: string;
  onNavigate: (section: string) => void;
}

export default function Layout({ children, currentSection, onNavigate }: LayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar currentSection={currentSection} onNavigate={onNavigate} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
