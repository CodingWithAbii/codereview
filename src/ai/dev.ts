import { config } from 'dotenv';
config();

import '@/ai/flows/generate-code-explanations.ts';
import '@/ai/flows/generate-code-from-description.ts';
import '@/ai/flows/generate-code-review-comments.ts';