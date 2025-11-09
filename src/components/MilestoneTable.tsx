import { deriveMilestones } from '../lib/derive';
import { signals } from '../data/mock';

export default function MilestoneTable() {
  const ms = deriveMilestones(signals);
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th align='left'>Org</th>
          <th align='left'>Milestone</th>
          <th align='left'>Status</th>
          <th align='left'>Conf</th>
        </tr>
      </thead>
      <tbody>
        {ms.map((m, i) => (
          <tr key={i} style={{ borderTop: '1px solid #eee' }}>
            <td>{m.org}</td>
            <td>{m.name}</td>
            <td>{m.status}</td>
            <td>{m.confidence}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
