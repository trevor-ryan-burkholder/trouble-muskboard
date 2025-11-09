export type Org =
  | 'SpaceX'
  | 'Tesla'
  | 'xAI'
  | 'X'
  | 'Neuralink'
  | 'Boring';
export type SignalSource =
  | 'press'
  | 'permit'
  | 'release_notes'
  | 'reg_notice';

export interface Signal {
  id: string;
  org: Org;
  source: SignalSource;
  title: string;
  url: string;
  publishedAt: string; // ISO
}

export type Status =
  | 'planned'
  | 'in_progress'
  | 'complete'
  | 'blocked';
export interface Milestone {
  org: Org;
  name: string;
  status: Status;
  eta?: string;
  lastUpdate?: string;
  evidence: string[]; // urls
  confidence: 0 | 1 | 2 | 3;
}
