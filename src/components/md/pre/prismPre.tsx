import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'

// export const CodeHighlight = ({ code, language }) => (
//   <Highlight theme={themes.vsDark} code={code} language={language}>
//     {({ className, style, tokens, getLineProps, getTokenProps }) => (
//       <pre className={className} style={style}>
//         {tokens.map((line, i) => (
//           <div key={i} {...getLineProps({ line, key: i })}>
//             {line.map((token, key) => (
//               <span key={key} {...getTokenProps({ token, key })} />
//             ))}
//           </div>
//         ))}
//       </pre>
//     )}
//   </Highlight>
// )

interface CodeHighlightProps {
  code: string;
  language: string;
}
export function CodeHighlight({ code, language }: CodeHighlightProps) {
  return (
    <div className="relative group">
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: '1em', borderRadius: '0.5em', overflow: 'auto' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <Button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        variant="ghost"
        size="icon"
        onClick={() => navigator.clipboard.writeText(code)}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  )
}