import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import SignalFeed from './components/SignalFeed';
import MilestoneTable from './components/MilestoneTable';
import { signals as mock } from './data/mock';
import { loadSignals, saveSignals } from './lib/storage';
import { briefMarkdown } from './lib/brief';
import { SignalsSchema } from './lib/schema';
import type { Signal } from './types';

export default function App() {
  const [all, setAll] = useState<Signal[]>(mock);
  const [since, setSince] = useState<string>('2025-11-01T00:00:00Z');
  const [org, setOrg] = useState<
    'All' | 'SpaceX' | 'Tesla' | 'xAI' | 'X' | 'Neuralink' | 'Boring'
  >('All');

  useEffect(() => {
    setAll(loadSignals());
  }, []);

  useEffect(() => {
    saveSignals(all);
  }, [all]);

  async function onExportMD() {
    const md = briefMarkdown(all, since);
    await navigator.clipboard.writeText(md);
    alert('Brief copied to clipboard.');
  }

  function onImportJSON() {
    const raw = window.prompt(
      'Paste an array of Signals JSON:',
      '[]'
    );
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const valid = SignalsSchema.parse(parsed);
      setAll(valid as Signal[]);
      alert(`Imported ${valid.length} signals.`);
    } catch (e: any) {
      alert(
        'Invalid JSON. Expected [{ id, org, source, title, url, publishedAt }].'
      );
    }
  }

  function onResetMock() {
    setAll(mock);
    alert('Reset to mock data.');
  }

  return (
    <main
      style={{
        maxWidth: 920,
        margin: '40px auto',
        padding: '0 16px',
        display: 'grid',
        gap: 24,
      }}
    >
      <h1>TROUBLE // Muskboard (Sandbox)</h1>

      <section
        style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <label
          style={{ display: 'flex', gap: 8, alignItems: 'center' }}
        >
          <span>Org</span>
          <select
            value={org}
            onChange={(e) => setOrg(e.target.value as any)}
          >
            <option>All</option>
            <option>SpaceX</option>
            <option>Tesla</option>
            <option>xAI</option>
            <option>X</option>
            <option>Neuralink</option>
            <option>Boring</option>
          </select>
        </label>

        <label
          style={{ display: 'flex', gap: 8, alignItems: 'center' }}
        >
          <span>Since</span>
          <input
            type='date'
            value={since.slice(0, 10)}
            onChange={(e) =>
              setSince(
                dayjs(e.target.value).startOf('day').toISOString()
              )
            }
          />
        </label>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={onImportJSON}>Import JSON</button>
          <button onClick={onExportMD}>Copy Brief (MD)</button>
          <button onClick={onResetMock} title='Restore placeholders'>
            Reset
          </button>
        </div>
      </section>

      <section>
        <h2>Delta</h2>
        <SignalFeed since={since} />
      </section>

      <section>
        <h2>Milestones (derived)</h2>
        <MilestoneTable />
      </section>
    </main>
  );
}

