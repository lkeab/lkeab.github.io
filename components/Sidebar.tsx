
import React from 'react';
import { PROFILE, SOCIAL_LINKS } from '../constants';
import { SectionId } from '../types';
import { Github, Twitter, Linkedin, Mail, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: SectionId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'github': return <Github size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'email': return <Mail size={18} />;
      case 'scholar': return <BookOpen size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  const navItems = [
    { id: SectionId.HOME, label: 'About' },
    { id: SectionId.NEWS, label: 'Updates' },
    { id: SectionId.PUBLICATIONS, label: 'Publications' },
    { id: SectionId.EXPERIENCE, label: 'Experience' },
    { id: SectionId.AWARDS, label: 'Awards' },
    { id: SectionId.ACTIVITIES, label: 'Professional Activities' },
    { id: SectionId.MISC, label: 'Misc' },
  ];

  return (
    <aside className="lg:w-72 xl:w-80 w-full flex-shrink-0 lg:h-screen lg:sticky lg:top-0 p-6 lg:p-10 flex flex-col bg-white border-r border-gray-200 z-10 overflow-y-auto">
      <div className="mb-8 text-center lg:text-left">
        <img 
          src={PROFILE.avatarUrl} 
          alt={PROFILE.name} 
          className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0 mb-4 border-2 border-gray-100 shadow-sm"
        />
        <h1 className="text-2xl font-serif font-bold text-gray-900">{PROFILE.name}</h1>
        <p className="text-blue-600 font-medium mt-1">{PROFILE.title}</p>
        <p className="text-sm text-gray-500 mt-1">{PROFILE.affiliation}</p>
        {PROFILE.university && <p className="text-sm text-gray-500">{PROFILE.university}</p>}
      </div>

      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
        {SOCIAL_LINKS.map((link) => (
          <a 
            key={link.platform}
            href={link.url}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
          >
            {getIcon(link.icon)}
          </a>
        ))}
      </div>

      <nav className="hidden lg:block flex-1 mb-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  activeSection === item.id 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
