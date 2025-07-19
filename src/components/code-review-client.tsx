'use client';

import { useState } from 'react';
import { runCodeAnalysis } from '@/app/actions';
import type { GenerateCodeExplanationsOutput } from '@/ai/flows/generate-code-explanations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
];

export default function CodeReviewClient() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateCodeExplanationsOutput | null>(
    null
  );
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!code || !language) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both code and a programming language.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const res = await runCodeAnalysis({
        codeSnippet: code,
        programmingLanguage: language,
      });
      setResult(res);
    } catch (error) {
      console.error(error);
      const errorMessage =
        (error as Error)?.message ||
        'An error occurred while analyzing the code. Please try again.';

      toast({
        title: 'Analysis Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="font-headline">Analyze Your Code</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Select onValueChange={setLanguage} value={language}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language..." />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Paste your code snippet here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[400px] font-code text-sm"
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Code'}
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {isLoading && (
          <>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </>
        )}

        {result ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline">AI Explanation</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>{result.explanation}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <CardTitle className="font-headline">
                  Potential Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>{result.potentialIssues}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                <CardTitle className="font-headline">Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>{result.suggestions}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          !isLoading && (
            <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Bot className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-semibold">
                AI Assistant
              </h3>
              <p className="text-muted-foreground">
                The analysis of your code will appear here.
              </p>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
