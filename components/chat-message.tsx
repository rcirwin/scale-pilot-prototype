interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

function formatContent(content: string): string {
  let html = content;
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Headers
  html = html.replace(/^### (.*$)/gm, '<h4 class="font-semibold text-sm mt-2 mb-1">$1</h4>');
  html = html.replace(/^## (.*$)/gm, '<h3 class="font-semibold text-base mt-2 mb-1">$1</h3>');
  html = html.replace(/^# (.*$)/gm, '<h2 class="font-bold text-lg mt-2 mb-1">$1</h2>');
  // Bullet lists
  html = html.replace(/^[-*] (.*$)/gm, '<li class="ml-4 list-disc text-sm">$1</li>');
  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul class="my-1">$1</ul>');
  // Line breaks
  html = html.replace(/\n/g, '<br/>');
  return html;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end mb-3 animate-fade-in">
        <div className="max-w-[75%] bg-[#f0f2f5] rounded-2xl rounded-br-md px-4 py-2.5">
          <p className="text-sm text-[#1a1a2e] whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 mb-3 animate-fade-in">
      {/* Assistant avatar */}
      <div className="shrink-0 w-7 h-7 rounded-full bg-[#45a19c] flex items-center justify-center mt-0.5">
        <span className="text-white text-[10px] font-bold">SI</span>
      </div>
      <div className="max-w-[75%] bg-white rounded-2xl rounded-bl-md px-4 py-2.5 border border-[#e2e8f0]">
        {isStreaming ? (
          <div className="flex items-center gap-1 text-sm text-[#6c757d]">
            <span>Thinking</span>
            <span className="animate-blink">.</span>
            <span className="animate-blink" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-blink" style={{ animationDelay: '0.4s' }}>.</span>
          </div>
        ) : (
          <div
            className="text-sm text-[#1a1a2e] leading-relaxed [&_strong]:font-semibold [&_li]:text-[#1a1a2e] [&_h2]:text-[#1a1a2e] [&_h3]:text-[#1a1a2e] [&_h4]:text-[#1a1a2e]"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
        )}
      </div>
    </div>
  );
}
