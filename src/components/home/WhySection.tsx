import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { comparisonHighlights, comparisonRows } from './data';

export function WhySection() {
  return (
    <Section id="comparison" tone="muted">
      <div className="mn-container">
        <div className="max-w-3xl text-left">
          <div className="mn-eyebrow mn-gradient-text">
            AI native and easy to use
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Lower adoption risk with reusable blueprints, durable execution,
            flexible deployment, and workflows that can be shared across
            builders without locking the organization into heavyweight
            orchestration.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {comparisonHighlights.map((item) => (
            <Card
              key={item.title}
              variant="soft"
              className="group p-6 transition-transform hover:-translate-y-0.5"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
                {item.eyebrow}
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-7 text-white">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-10 max-w-3xl text-left">
          <h3 className="mn-eyebrow mn-gradient-text">
            From first workflow to long-term value
          </h3>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            The decision is not which tool has the most machinery. It is which
            one gives your organization useful AI workflows today, reliable
            operation tomorrow, and a cost curve that still makes sense as usage
            grows.
          </p>
        </div>

        <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-800 bg-[#0b1020] shadow-2xl">
          <table className="min-w-full text-left">
            <thead className="border-b border-slate-800 bg-slate-900/70">
              <tr className="text-sm text-slate-300">
                <th className="px-5 py-4 font-semibold text-white">
                  Question
                </th>
                <th className="px-5 py-4 font-semibold text-white">Airflow</th>
                <th className="px-5 py-4 font-semibold text-white">
                  Temporal
                </th>
                <th className="bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.62),rgba(2,6,23,0.5))] px-5 py-4 font-semibold text-cyan-200">
                  MirrorNeuron
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-slate-800/70 align-top"
                >
                  <th className="px-5 py-5 text-sm font-semibold text-white">
                    {row.label}
                  </th>
                  <td className="px-5 py-5 text-sm leading-7 text-slate-300">
                    {row.airflow}
                  </td>
                  <td className="px-5 py-5 text-sm leading-7 text-slate-300">
                    {row.temporal}
                  </td>
                  <td className="bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_36%),linear-gradient(180deg,rgba(15,23,42,0.54),rgba(2,6,23,0.42))] px-5 py-5 text-sm font-medium leading-7 text-cyan-50">
                    {row.mirrorNeuron}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
