import { z } from 'zod';

export const OrgEnum = z.enum([
  'SpaceX',
  'Tesla',
  'xAI',
  'X',
  'Neuralink',
  'Boring',
]);
export const SourceEnum = z.enum([
  'press',
  'permit',
  'release_notes',
  'reg_notice',
]);

export const SignalSchema = z.object({
  id: z.string(),
  org: OrgEnum,
  source: SourceEnum,
  title: z.string(),
  url: z.string().url().or(z.literal('#')),
  publishedAt: z.string().datetime(), // ISO8601
});

export const SignalsSchema = z.array(SignalSchema);
export type SignalInput = z.infer<typeof SignalSchema>;
