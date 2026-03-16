

import React, { useEffect, useState } from 'react';
import PublicationItem from './components/PublicationItem';
import ChatWidget from './components/ChatWidget';
import { PROFILE, NEWS, PUBLICATIONS, EXPERIENCES, AWARDS, ACTIVITIES, SOCIAL_LINKS } from './constants';
import { SectionId, Publication } from './types';
import { ExternalLink, Users, Camera} from 'lucide-react';

// --- Custom Filled Icons for Profile ---

const FilledScholarIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} role="img" aria-label="Google Scholar">
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 4.354C6.048 11.334 8.618 9.5 11.999 9.5c3.382 0 5.952 1.835 7.162 4.354L24 9.5 12 0z" />
  </svg>
);

const FilledEmailIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} role="img" aria-label="Email">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const FilledGithubIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} role="img" aria-label="GitHub">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const FilledTwitterIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} role="img" aria-label="Twitter">
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
  </svg>
);

// Helper for parsing text with embedded links: {{LINK|text|url}} and bold: {{BOLD|text}}
const renderTextWithLinks = (text: string) => {
  if (!text) return null;
  const parts = text.split(/({{LINK\|.*?\|.*?}}|{{BOLD\|.*?}})/);
  return parts.map((part, index) => {
    const linkMatch = part.match(/{{LINK\|(.*?)\|(.*?)}}/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {linkMatch[1]}
        </a>
      );
    }
    const boldMatch = part.match(/{{BOLD\|(.*?)}}/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-bold text-gray-900">
          {boldMatch[1]}
        </strong>
      );
    }
    return part;
  });
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SectionId.HOME);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar styling and scrollspy
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = Object.values(SectionId);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset check for top navbar
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Helper to group publications
  const groupedPublications = PUBLICATIONS.reduce((acc, pub) => {
    const category = pub.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);

  const recentCategories = ["Vision and Language Models"];
  const selectedCategories = ["Segmentation and Tracking", "3D Reconstruction, Tracking and Generation"];

  // Mapping social icons to our filled custom components
  const getProfileIcon = (iconName: string) => {
    switch(iconName) {
      case 'github': return <FilledGithubIcon className="w-8 h-8 md:w-9 md:h-9" />;
      case 'twitter': return <FilledTwitterIcon className="w-8 h-8 md:w-9 md:h-9" />;
      case 'email': return <FilledEmailIcon className="w-8 h-8 md:w-9 md:h-9" />;
      case 'scholar': return <FilledScholarIcon className="w-8 h-8 md:w-9 md:h-9" />;
      default: return <Users className="w-8 h-8 md:w-9 md:h-9" />;
    }
  };

  const navItems = [
    { id: SectionId.HOME, label: 'ABOUT' },
    { id: SectionId.NEWS, label: 'UPDATES' },
    { id: SectionId.RECENT_WORKS, label: 'RECENT WORKS' },
    { id: SectionId.PUBLICATIONS, label: 'SELECTED PUBLICATIONS' },
    { id: SectionId.EXPERIENCE, label: 'EXPERIENCE' },
    { id: SectionId.ACTIVITIES, label: 'SERVICE' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* Top Navigation Bar */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 border-b border-gray-800 ${scrolled ? 'bg-gray-900 shadow-md py-3' : 'bg-gray-900 py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-white font-bold text-xl tracking-wider uppercase font-serif cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {PROFILE.name}
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-bold tracking-wide uppercase transition-colors ${
                      activeSection === item.id 
                        ? 'text-blue-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* Mobile Menu Button (Simplified) */}
          <div className="md:hidden text-white">
            <span className="font-bold">MENU</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Profile Hero Section */}
        <section id={SectionId.HOME} className="mb-24 scroll-mt-28">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            {/* Left Column: Profile Card Style */}
            <div className="flex-shrink-0 md:w-1/3 lg:w-1/4 flex flex-col items-center text-center">
              <div className="mb-6">
                <img 
                  src={PROFILE.avatarUrl} 
                  alt={PROFILE.name} 
                  className="w-48 h-48 rounded-full object-cover shadow-sm border border-gray-100"
                />
              </div>
              
              <h1 className="text-4xl font-normal text-black mb-2 font-sans tracking-tight">{PROFILE.name}</h1>
              <p className="text-xl text-gray-500 font-light mb-1">{PROFILE.title}</p>
              <p className="text-xl text-gray-500 font-light mb-4">{PROFILE.affiliation}</p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-2">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.platform}
                    href={link.url}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                  >
                    {getProfileIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Bio & Research Interests */}
            <div className="flex-1 pt-4">
              <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line max-w-none">
                {renderTextWithLinks(PROFILE.bio)}
              </div>

              <p className="text-red-600 font-bold mt-4 mb-6">
                I am hiring full-time employees and student interns for the multi-modal foundation models. Please contact me by email if you are interested.
              </p>

              {/* Quick Stats / Badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                 <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
                   Multimodal Foundation Models
                 </span>
                 <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
                   Visual Reasoning
                 </span>
                 <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
                   Generative AI
                 </span>
              </div>
            </div>
          </div>
        </section>

        {/* Updates Section */}
        <section id={SectionId.NEWS} className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Updates</h2>
          </div>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-blue-400 transition-colors shadow-inner">
            <div className="space-y-5">
              {NEWS.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:gap-6 gap-1">
                  <span className="text-sm font-bold text-blue-700 font-mono min-w-[80px] pt-0.5">{item.date}</span>
                  <span className="text-gray-700 text-base leading-relaxed">
                    {item.content}
                    {item.link && (
                       <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline ml-1.5 align-text-bottom">
                          <ExternalLink size={14} />
                       </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Works Section */}
        <section id={SectionId.RECENT_WORKS} className="mb-24 scroll-mt-28">
          <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mr-2">Recent Works</h2>
          </div>

          <div className="flex flex-col space-y-16">
            {recentCategories.map(category => (
              groupedPublications[category] && (
                <div key={category}>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 pl-3 border-l-4 border-blue-600 uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {groupedPublications[category].map((pub) => (
                      <PublicationItem key={pub.id} pub={pub} />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* Selected Publications Section */}
        <section id={SectionId.PUBLICATIONS} className="mb-24 scroll-mt-28">
          <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mr-2">Selected Publications</h2>
          </div>

          <div className="flex flex-col space-y-16">
            {selectedCategories.map(category => (
              groupedPublications[category] && (
                <div key={category}>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 pl-3 border-l-4 border-blue-600 uppercase tracking-wide">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {groupedPublications[category].map((pub) => (
                      <PublicationItem key={pub.id} pub={pub} />
                    ))}
                  </div>
                </div>
              )
            ))}
            {/* Fallback for unclassified papers */}
            {Object.keys(groupedPublications).filter(k => ![...recentCategories, ...selectedCategories].includes(k)).map(category => (
               <div key={category}>
               <h3 className="text-xl font-bold text-gray-800 mb-6 pl-3 border-l-4 border-gray-400 uppercase tracking-wide">
                 {category}
               </h3>
               <div className="space-y-2">
                 {groupedPublications[category].map((pub) => (
                   <PublicationItem key={pub.id} pub={pub} />
                 ))}
               </div>
             </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id={SectionId.EXPERIENCE} className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
             <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Experience</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="group relative bg-white hover:bg-gray-50 p-6 rounded-xl border border-gray-100 transition-all hover:shadow-sm flex flex-col sm:flex-row gap-6">
                {exp.logo && (
                  <div className="flex-shrink-0 pt-1">
                    <img 
                      src={exp.logo} 
                      alt={exp.institution} 
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{exp.institution}</h3>
                      <p className="text-lg font-medium text-blue-700">{exp.role}</p>
                    </div>
                    <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold font-mono whitespace-nowrap mt-1 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  
                  {exp.description && (
                    <p className="text-gray-600 mt-3 text-base leading-relaxed border-l-2 border-gray-200 pl-4">
                      {renderTextWithLinks(exp.description)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activities Section */}
        <section id={SectionId.ACTIVITIES} className="mb-24 scroll-mt-28">
           <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Professional Activities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACTIVITIES.map((activity, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                   <Users size={18} className="text-blue-600" />
                   {activity.category}
                </h3>
                <ul className="space-y-2">
                  {activity.items.map((item, i) => (
                    <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                      <span className="block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section id={SectionId.AWARDS} className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Awards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AWARDS.map((award) => (
              <div key={award.id} className="flex gap-4 items-start p-5 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors">
                <span className="font-mono text-blue-600 font-bold text-lg">{award.year}</span>
                <div>
                  <h3 className="font-bold text-gray-900">{award.title}</h3>
                  {award.description && <p className="text-sm text-gray-500 mt-1">{award.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Misc Section */}
        <section id={SectionId.MISC} className="mb-12 scroll-mt-28">
           <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Misc</h2>
          </div>
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-xl border border-gray-200 text-gray-700 flex items-center gap-4">
            <Camera size={32} className="text-gray-400 flex-shrink-0" />
            <p className="text-lg">
              Some <a href="https://500px.com/keleiwhu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold">photography</a> of natural scenery and delicate architecture during my daily life and travelling.
            </p>
          </div>
        </section>

        <footer className="pt-12 border-t border-gray-200 text-center text-gray-400 text-sm pb-8">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        </footer>

      </main>
      
      <ChatWidget />
    </div>
  );
};

export default App;
