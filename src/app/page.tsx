import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, ArrowRight, ShieldCheck, Zap, Lightbulb, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Instant Analysis',
    description: 'Get feedback on your code in seconds, not hours. Paste your snippet, select the language, and let our AI do the heavy lifting.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Review',
    description: 'Our AI checks for bugs, security vulnerabilities, performance bottlenecks, and style inconsistencies based on industry best practices.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Smart Suggestions',
    description: 'Receive clear explanations and actionable suggestions to improve your code quality, readability, and maintainability.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-headline font-semibold">
            CodeReview
          </h1>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4">
              Ship Better Code, Faster.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Leverage the power of AI to get instant, insightful, and comprehensive code reviews. Improve code quality, save time, and accelerate your development cycle.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started for Free <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl md:text-4xl font-headline font-bold mb-4">How It Works</h3>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">Reviewing your code has never been easier. Follow three simple steps to get started.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-2xl font-headline mb-4">1</div>
                <h4 className="text-xl font-headline font-semibold mb-2">Submit Your Code</h4>
                <p className="text-muted-foreground">Paste your code snippet directly into our editor and select the programming language.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-2xl font-headline mb-4">2</div>
                <h4 className="text-xl font-headline font-semibold mb-2">AI-Powered Analysis</h4>
                <p className="text-muted-foreground">Our intelligent assistant analyzes your code for errors, vulnerabilities, and improvement areas.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary font-bold text-2xl font-headline mb-4">3</div>
                <h4 className="text-xl font-headline font-semibold mb-2">Receive Feedback</h4>
                <p className="text-muted-foreground">Get a detailed report with explanations, potential issues, and concrete suggestions in seconds.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-headline font-bold mb-4">An Assistant That Has Your Back</h3>
              <p className="text-muted-foreground mb-12">
                CodeReview provides all the tools you need to write clean, efficient, and secure code with confidence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center p-4">
                  <CardHeader className="items-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-2">
                        {feature.icon}
                    </div>
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-headline font-bold mb-4">Why CodeReview?</h3>
                        <p className="text-muted-foreground mb-6">
                            Stop wasting time on manual reviews and focus on what matters most: building great products. Our AI assistant acts as a second pair of eyes, ensuring every line of code meets the highest standards.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-accent-foreground mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">Save Development Time</h4>
                                    <p className="text-muted-foreground">Automate the review process and free up your senior engineers from tedious work.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-accent-foreground mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">Enhance Code Quality</h4>
                                    <p className="text-muted-foreground">Catch issues early and maintain a consistent, high-quality codebase across your team.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-accent-foreground mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold">Learn and Grow</h4>
                                    <p className="text-muted-foreground">Understand the "why" behind suggestions with clear explanations and become a better developer.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='w-fit'>
                        <img
                          src="/icon.png"
                          alt="Code analysis dashboard"
                          data-ai-hint="code dashboard"
                          className='h-[500px]'
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-20 md:py-32">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-4">
              Ready to Transform Your Code Reviews?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Sign up today and experience the future of software development. It's free to get started.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Sign Up Now <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
                 <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="h-5 w-5 text-primary" />
                </div>
                <p className="text-lg font-headline font-semibold">CodeReview</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
                © {new Date().getFullYear()} CodeReview, Inc. All rights reserved.
            </p>
        </div>
      </footer>
    </div>
  );
}
