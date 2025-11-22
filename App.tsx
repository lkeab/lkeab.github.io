
import React, { useEffect, useState } from 'react';
import PublicationItem from './components/PublicationItem';
import ChatWidget from './components/ChatWidget';
import { PROFILE, NEWS, PUBLICATIONS, EXPERIENCES, AWARDS, ACTIVITIES, SOCIAL_LINKS } from './constants';
import { SectionId, Publication } from './types';
import { Newspaper, GraduationCap, ExternalLink, Award, Building2, Users, Camera, Github, Twitter, Mail, BookOpen } from 'lucide-react';

// Helper for parsing text with embedded links: {{LINK|text|url}}
const renderTextWithLinks = (text: string) => {
  if (!text) return null;
  const parts = text.split(/({{LINK\|.*?\|.*?}})/);
  return parts.map((part, index) => {
    const match = part.match(/{{LINK\|(.*?)\|(.*?)}}/);
    if (match) {
      return (
        <a
          key={index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {match[1]}
        </a>
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

  const categoryOrder = ["Segmentation and Tracking", "3D Reconstruction, Tracking and Generation"];

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'github': return <Github size={18} />;
      case 'twitter': return <Twitter size={18} />;
      case 'linkedin': return <Users size={18} />; // Fallback
      case 'email': return <Mail size={18} />;
      case 'scholar': return <BookOpen size={18} />;
      default: return <ExternalLink size={18} />;
    }
  };

  const navItems = [
    { id: SectionId.HOME, label: 'ABOUT' },
    { id: SectionId.NEWS, label: 'UPDATES' },
    { id: SectionId.PUBLICATIONS, label: 'PUBLICATIONS' },
    { id: SectionId.EXPERIENCE, label: 'EXPERIENCE' },
    { id: SectionId.AWARDS, label: 'AWARDS' },
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
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
            {/* Left: Image */}
            <div className="flex-shrink-0 md:w-1/3 lg:w-1/4">
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100">
                <img 
                  src={PROFILE.avatarUrl} 
                  alt={PROFILE.name} 
                  className="w-full h-auto object-cover aspect-[3/4]"
                />
              </div>
              
              <div className="flex justify-center gap-3 mt-6">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.platform}
                    href={link.url}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-gray-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                  >
                    {getIcon(link.icon)}
                  </a>
                ))}
              </div>
              
            </div>

            {/* Right: Content */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-serif">{PROFILE.name}</h1>
              <p className="text-xl text-gray-600 font-medium mb-6">{PROFILE.title}, {PROFILE.affiliation}</p>
              
              <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line max-w-none">
                {renderTextWithLinks(PROFILE.bio)}
              </div>

              {/* Quick Stats / Badges can go here */}
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

        {/* Publications Section */}
        <section id={SectionId.PUBLICATIONS} className="mb-24 scroll-mt-28">
          <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wider">Publications</h2>
          </div>

          <div className="flex flex-col space-y-16">
            {categoryOrder.map(category => (
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
            {Object.keys(groupedPublications).filter(k => !categoryOrder.includes(k)).map(category => (
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
