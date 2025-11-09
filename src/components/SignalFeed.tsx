import { signals } from '../data/mock';
import { deltaSince } from '../lib/derive';

export default function SignalFeed({ since }: { since?: string }) {
  const data = since ? deltaSince(signals, since) : signals;
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {data.map((s) => (
        <a
          key={s.id}
          href={s.url}
          style={{
            padding: 12,
            border: '1px solid #ddd',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {s.org} • {s.source} • {s.publishedAt.slice(0, 10)}
          </div>
          <div style={{ fontWeight: 600 }}>{s.title}</div>
        </a>
      ))}
    </div>
  );
}
