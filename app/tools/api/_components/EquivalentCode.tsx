// src/app/tools/api/_components/EquivalentCode.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlockWithCopy } from "@/components/md/pre/prismPre";

interface EquivalentCodeProps {
  equivalentCode: {
    shCode: string;
    jsCode: string;
    tsCode: string;
    pythonCode: string;
    cCode: string;
    cppCode: string;
    javaCode: string;
    restCode: string;
    goCode: string;
    rustCode: string;
  };
}

const languages = [
  { value: 'sh', label: 'Shell', language: 'bash' },
  { value: 'js', label: 'JavaScript', language: 'javascript' },
  { value: 'ts', label: 'TypeScript', language: 'typescript' },
  { value: 'python', label: 'Python', language: 'python' },
  { value: 'c', label: 'C', language: 'c' },
  { value: 'cpp', label: 'C++', language: 'cpp' },
  { value: 'java', label: 'Java', language: 'java' },
  { value: 'rest', label: 'REST', language: 'http' },
  { value: 'go', label: 'Go', language: 'go' },
  { value: 'rust', label: 'Rust', language: 'rust' },
];

export const EquivalentCode: React.FC<EquivalentCodeProps> = ({ equivalentCode }) => {
  return (
    <Tabs defaultValue="sh">
      <TabsList>
        {languages.map(({ value, label }) => (
          <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
        ))}
      </TabsList>
      {languages.map(({ value, language }) => (
        <TabsContent key={value} value={value}>
          <CodeBlockWithCopy value={equivalentCode[`${value}Code`]} language={language} />
        </TabsContent>
      ))}
    </Tabs>
  );
};