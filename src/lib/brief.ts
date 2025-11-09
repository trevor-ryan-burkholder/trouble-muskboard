import dayjs from 'dayjs';
import type { Signal } from '../types';

export function briefMarkdown(all: Signal[], sinceIso?: string) {
  const data = sinceIso
    ? all.filter((s) => dayjs(s.publishedAt).isAfter(dayjs(sinceIso)))
    : all;
  const byOrg = data.reduce<Record<string, Signal[]>>((acc, s) => {
    (acc[s.org] ||= []).push(s);
    return acc;
  }, {});
  const lines: string[] = ['# TROUBLE // Muskboard Brief', ''];
  Object.entries(byOrg).forEach(([org, list]) => {
    lines.push(`## ${org}`);
    list
      .sort((a, b) => a.publishedAt.localeCompare(b.publishedAt))
      .forEach((s) =>
        lines.push(
          `- ${s.title} — *${s.source}* (${s.publishedAt.slice(
            0,
            10
          )})`
        )
      );
    lines.push('');
  });
  return lines.join('\n');
}
