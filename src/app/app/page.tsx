import CodeReviewClient from '@/components/code-review-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Review | CodeReview',
};

export default function CodeReviewPage() {
  return <CodeReviewClient />;
}
