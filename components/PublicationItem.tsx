
import React from 'react';
import { Publication } from '../types';
import { FileText, Code, Video, MonitorPlay, Presentation, Globe, BookOpen, Smile } from 'lucide-react';

interface PublicationItemProps {
  pub: Publication;
}

const PublicationItem: React.FC<PublicationItemProps> = ({ pub }) => {
  
  // Function to parse abstract and render special highlighted links
  const renderAbstract = (abstract: string) => {
    const linkRegex = /{{LINK\|(.*?)\|(.*?)}}/;
    const match = abstract.match(linkRegex);
    
    if (match) {
      const [fullMatch, text, url] = match;
      const parts = abstract.split(fullMatch);
      return (
        <>
          {parts[0]}
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 font-bold hover:underline"
          >
            {text}
          </a>
          {parts[1]}
        </>
      );
    }
    return abstract;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 py-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors rounded-lg px-2 -mx-2">
      <div className="flex-shrink-0 md:w-48 hidden md:block group">
        {pub.thumbnail ? (
          <div className="relative w-full h-32 overflow-hidden rounded-md border border-gray-200 shadow-sm">
            <img 
              src={pub.thumbnail} 
              alt={pub.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
            <FileText size={32} />
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
          {pub.title}
        </h3>
        
        <div className="mb-2 text-gray-700 text-sm leading-relaxed">
          {pub.authors.map((author, idx) => (
            <React.Fragment key={idx}>
              <span className={author.isMe ? "font-bold text-gray-900" : ""}>
                {author.name}
                {author.note && <span className="text-gray-500 font-normal ml-0.5">{author.note}</span>}
              </span>
              {idx < pub.authors.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </div>

        <div className="mb-3 flex items-center gap-3 flex-wrap">
          <span className="inline-block bg-slate-800 text-white text-xs px-2 py-0.5 rounded font-medium">
            {pub.venue}
          </span>
          <span className="text-gray-500 text-sm">{pub.year}</span>
          
          {pub.githubRepo && (
            <div className="flex items-center h-5">
              <iframe
                src={`https://ghbtns.com/github-btn.html?user=${pub.githubRepo.split('/')[0]}&repo=${pub.githubRepo.split('/')[1]}&type=star&count=true&v=2`}
                frameBorder="0"
                scrolling="0"
                width="170"
                height="20"
                title={`GitHub stars for ${pub.title}`}
                className="overflow-hidden"
              ></iframe>
            </div>
          )}
        </div>

        {pub.abstract && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 hover:line-clamp-none transition-all cursor-default">
            {renderAbstract(pub.abstract)}
          </p>
        )}

        <div className="flex flex-wrap gap-2.5">
          {pub.links.pdf && (
            <a href={pub.links.pdf} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <FileText size={14} className="text-red-500" /> Paper
            </a>
          )}
          {pub.links.arxiv && (
            <a href={pub.links.arxiv} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <FileText size={14} className="text-red-400" /> arXiv
            </a>
          )}
          {pub.links.code && (
            <a href={pub.links.code} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <Code size={14} /> Code
            </a>
          )}
          {pub.links.projectPage && (
            <a href={pub.links.projectPage} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <MonitorPlay size={14} className="text-purple-500" /> Project
            </a>
          )}
          {pub.links.website && (
            <a href={pub.links.website} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <Globe size={14} className="text-blue-500" /> Website
            </a>
          )}
          {pub.links.video && (
            <a href={pub.links.video} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <Video size={14} className="text-pink-500" /> Video
            </a>
          )}
          {pub.links.poster && (
            <a href={pub.links.poster} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <Presentation size={14} className="text-orange-500" /> Poster
            </a>
          )}
          {pub.links.zhihu && (
            <a href={pub.links.zhihu} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <BookOpen size={14} className="text-blue-400" /> Zhihu
            </a>
          )}
          {pub.links.huggingface && (
            <a href={pub.links.huggingface} className="flex items-center gap-1.5 text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 bg-white hover:border-blue-300 rounded px-2.5 py-1.5 shadow-sm">
              <Smile size={14} className="text-yellow-500" /> HuggingFace
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationItem;
