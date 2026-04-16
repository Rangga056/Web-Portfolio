"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Typography } from '@/components/ui/Typography';
import { Box } from '@/components/ui/Box';
import { Code2, ExternalLink } from 'lucide-react';

export const MarkdownRenderer = ({ 
  content, 
  frontmatter 
}: { 
  content: string, 
  frontmatter: Record<string, unknown> 
}) => {
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : null;
  const role = typeof frontmatter.role === 'string' ? frontmatter.role : null;
  const location = typeof frontmatter.location === 'string' ? frontmatter.location : null;
  const tech = Array.isArray(frontmatter.tech) ? (frontmatter.tech as string[]) : null;
  const githubUrl = typeof frontmatter.github_url === 'string' ? frontmatter.github_url : null;
  const imageUrl = typeof frontmatter.image_url === 'string' ? frontmatter.image_url : null;

  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-6 md:px-8">
      {title && (
        <div className="mb-10 md:mb-16 border-b border-ide-border pb-8 md:pb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8">
            <div className="space-y-3 md:space-y-4 text-left">
              <Typography as="h1" variant="title" className="text-3xl md:text-5xl text-white">
                {title}
              </Typography>
              <div className="flex flex-wrap gap-2 md:gap-4 items-center">
                 {role && <Typography variant="muted" className="text-tokyo-blue font-mono text-xs md:text-sm">{role}</Typography>}
                 {location && <Typography variant="muted" className="text-zinc-500 text-xs md:text-sm">• {location}</Typography>}
              </div>
            </div>
            
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-tokyo-blue/10 text-tokyo-blue border border-tokyo-blue/20 rounded hover:bg-tokyo-blue/20 transition-all font-mono text-xs md:text-sm font-bold shadow-lg w-full md:w-auto"
              >
                <Code2 className="w-4 h-4" />
                VIEW_SOURCE
              </a>
            )}
          </div>

          {imageUrl && (
            <div className="rounded-xl overflow-hidden border border-ide-border shadow-2xl mb-8 md:mb-10 group relative aspect-video">
               <img 
                 src={imageUrl} 
                 alt={title} 
                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-ide-bg via-transparent to-transparent opacity-60" />
            </div>
          )}
          
          {tech && (
             <div className="flex flex-wrap gap-2">
               {tech.map((t: string) => (
                 <Typography key={t} as="code" variant="code" className="bg-ide-sidebar border-tokyo-blue/20 text-tokyo-blue text-[10px] md:text-[11px] px-3 py-1">
                   {t}
                 </Typography>
               ))}
             </div>
          )}
        </div>
      )}

      <div className="prose-container pb-12">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <Typography as="h1" variant="title" className="mt-12 md:mt-16 mb-6 md:mb-8 text-2xl md:text-4xl text-white">{children}</Typography>,
            h2: ({ children }) => <Typography as="h2" variant="title" className="text-xl md:text-3xl mt-12 md:mt-16 mb-4 md:mb-6 border-b border-ide-border pb-3 text-tokyo-blue">{children}</Typography>,
            h3: ({ children }) => <Typography as="h3" variant="title" className="text-lg md:text-2xl mt-10 md:mt-12 mb-3 md:mb-4 text-tokyo-cyan">{children}</Typography>,
            h4: ({ children }) => <Typography as="h4" variant="title" className="text-base md:text-xl mt-8 md:mt-10 mb-2 md:mb-3 text-tokyo-green">{children}</Typography>,
            p: ({ children }) => <Typography variant="body" className="mb-6 md:mb-8 leading-relaxed text-zinc-300 text-base md:text-lg">{children}</Typography>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-8 md:mb-10 space-y-3 md:space-y-4 text-zinc-400 text-sm md:text-base">{children}</ul>,
            li: ({ children }) => <li className="text-zinc-300 ml-4 md:ml-6 marker:text-tokyo-blue">{children}</li>,
            strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
            code: ({ node, inline, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="rounded-lg overflow-hidden border border-ide-border my-8 md:my-10 shadow-xl max-w-full">
                  <div className="overflow-x-auto no-scrollbar">
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, padding: '1.5rem', background: '#16161e', fontSize: '12px md:14px', lineHeight: '1.6' }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ) : (
                <Typography as="code" variant="code" className="text-tokyo-yellow bg-ide-sidebar/50 border-ide-border text-xs md:text-sm">
                  {children}
                </Typography>
              );
            },
            blockquote: ({ children }) => (
              <Box variant="bordered" padding="md" className="border-l-4 border-l-tokyo-blue bg-ide-sidebar/20 my-8 md:my-10 italic rounded-r-lg shadow-inner">
                {children}
              </Box>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
