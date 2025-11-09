import dayjs from 'dayjs';
import type { Signal, Milestone } from '../types';

export function deriveMilestones(input: Signal[]): Milestone[] {
  return input.map((s) => ({
    org: s.org,
    name: nameFromSignal(s),
    status: statusFromSource(s.source),
    eta: undefined,
    lastUpdate: s.publishedAt,
    evidence: [s.url],
    confidence: score(s),
  }));
}

function statusFromSource(src: Signal['source']) {
  if (src === 'permit' || src === 'reg_notice') return 'in_progress';
  if (src === 'release_notes') return 'in_progress';
  return 'planned';
}

function score(s: Signal): 0 | 1 | 2 | 3 {
  if (s.source === 'permit' || s.source === 'reg_notice') return 3;
  if (s.source === 'release_notes') return 2;
  if (s.source === 'press') return 1;
  return 0;
}

function nameFromSignal(s: Signal) {
  return `[${s.org}] ${s.title}`;
}

export function deltaSince(input: Signal[], iso: string) {
  const t = dayjs(iso);
  return input.filter((s) => dayjs(s.publishedAt).isAfter(t));
}

export function briefByOrg(
  input: Signal[]
): Record<string, string[]> {
  const grouped = input.reduce<Record<string, string[]>>((acc, s) => {
    acc[s.org] ||= [];
    acc[s.org].push(
      `• ${s.title} (${s.source}, ${s.publishedAt.slice(0, 10)})`
    );
    return acc;
  }, {});
  return grouped;
}
