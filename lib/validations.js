import { z } from 'zod';

export const createHackSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description is too long'),
  code: z.string().min(1, 'Code snippet is required'),
  code_lang: z.string().min(1, 'Programming language is required'),
  user_name: z.string().min(1, 'User name is required'),
  twitter_id: z.string().optional(),
});

export const hackIdSchema = z.string().min(1, 'Hack ID is required');
