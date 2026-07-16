import BlogFigure from './BlogFigure';

type WorkbenchShellDiagramProps = {
  title?: string;
  description?: string;
  caption?: string;
  note?: string;
};

function RegionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#8d8c86]">
      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#527a72] bg-[#14201d] text-[0.56rem] text-[#b8ddd5]">
        {number}
      </span>
      {children}
    </div>
  );
}

export default function WorkbenchShellDiagram({
  title = 'A stable shell around a domain-specific workspace',
  description = 'The center changes with the work. Projects, state, plans, approvals, and history remain familiar.',
  caption = 'The shell provides continuity; the main workspace provides the representation the job requires.',
  note,
}: WorkbenchShellDiagramProps) {
  return (
    <BlogFigure
      label="Workbench anatomy"
      title={title}
      description={description}
      caption={caption}
      note={note}
      surface="grid"
    >
      <div className="overflow-x-auto p-3 sm:p-5" role="region" aria-label="Scrollable workbench interface diagram" tabIndex={0}>
        <div className="min-w-[760px] overflow-hidden rounded-xl border border-white/[0.1] bg-[#0a0b0a] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="flex h-12 items-center justify-between border-b border-white/[0.08] bg-[#111210] px-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
                <span className="h-2 w-2 rounded-full bg-white/[0.12]" />
              </div>
              <span className="h-4 w-px bg-white/[0.08]" />
              <span className="text-[0.68rem] text-[#aaa9a3]">Bracket study / version 4</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-white/[0.08] px-2 py-1 text-[0.6rem] text-[#777671]">2 workers</span>
              <span className="flex items-center gap-1.5 text-[0.62rem] text-[#9dc5bc]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8bc9bc]" />
                Synced
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[180px_minmax(360px,1fr)_210px]">
            <section className="border-r border-white/[0.08] bg-[#0e0f0e] p-4" aria-label="Object tree region">
              <RegionLabel number="1">Object tree</RegionLabel>
              <div className="mt-5 space-y-1 text-[0.68rem]">
                <div className="rounded-md bg-white/[0.04] px-3 py-2 text-[#d2d0ca]">▾ bracket-v4</div>
                <div className="px-3 py-1.5 pl-7 text-[#777671]">Base plate</div>
                <div className="rounded-md border border-[#527a72]/60 bg-[#14201d] px-3 py-1.5 pl-7 text-[#b8ddd5]">Upper rib</div>
                <div className="px-3 py-1.5 pl-7 text-[#777671]">Mount points</div>
                <div className="px-3 py-1.5 pl-7 text-[#777671]">Material</div>
              </div>
              <div className="mt-6 border-t border-white/[0.07] pt-4">
                <div className="text-[0.56rem] uppercase tracking-[0.12em] text-[#55544f]">Versions</div>
                <div className="mt-2 space-y-2 text-[0.64rem] text-[#777671]">
                  <div className="flex justify-between"><span>v4 proposal</span><span className="text-[#9dc5bc]">current</span></div>
                  <div className="flex justify-between"><span>v3 baseline</span><span>12:42</span></div>
                </div>
              </div>
            </section>

            <section className="relative min-h-[330px] overflow-hidden bg-[#090a09] p-4" aria-label="Main workspace region">
              <div className="flex items-center justify-between">
                <RegionLabel number="2">Main workspace</RegionLabel>
                <div className="flex rounded-md border border-white/[0.08] bg-[#111210] p-0.5 text-[0.58rem] text-[#66655f]">
                  <span className="rounded bg-white/[0.06] px-2 py-1 text-[#cbc9c2]">Model</span>
                  <span className="px-2 py-1">Stress</span>
                  <span className="px-2 py-1">Compare</span>
                </div>
              </div>

              <div className="mt-4 flex min-h-[250px] items-center justify-center rounded-lg border border-white/[0.06] [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:22px_22px]">
                <svg viewBox="0 0 420 220" className="w-[78%]" role="img" aria-label="Bracket model with a proposed rib change">
                  <path d="M68 185V54c0-14 11-25 25-25h44c14 0 25 11 25 25v66h139c14 0 25 11 25 25v40H68Z" fill="#242724" stroke="#565952" strokeWidth="2" />
                  <path d="m138 120 76-67c10-9 26-8 35 2l30 33" fill="none" stroke="#555851" strokeWidth="20" strokeLinecap="round" />
                  <path d="m141 120 75-61c10-8 23-7 31 2l27 30" fill="none" stroke="#b8ddd5" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" />
                  <circle cx="113" cy="72" r="17" fill="#090a09" stroke="#62655e" />
                  <circle cx="113" cy="157" r="17" fill="#090a09" stroke="#62655e" />
                  <circle cx="285" cy="157" r="17" fill="#090a09" stroke="#62655e" />
                </svg>
              </div>

              <div className="absolute bottom-7 left-7 flex gap-2">
                <span className="rounded-md border border-[#527a72]/60 bg-[#14201d]/90 px-2 py-1 text-[0.58rem] text-[#b8ddd5]">Proposal overlay</span>
                <span className="rounded-md border border-white/[0.08] bg-black/50 px-2 py-1 text-[0.58rem] text-[#888781]">Mounts locked</span>
              </div>
            </section>

            <section className="border-l border-white/[0.08] bg-[#0e0f0e] p-4" aria-label="AI inspector region">
              <RegionLabel number="3">AI inspector</RegionLabel>
              <div className="mt-5">
                <div className="text-[0.56rem] uppercase tracking-[0.12em] text-[#55544f]">Understands</div>
                <div className="mt-2 text-[0.7rem] leading-5 text-[#cbc9c2]">Reduce mass without moving the mounting points.</div>
              </div>
              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <div className="text-[0.56rem] uppercase tracking-[0.12em] text-[#55544f]">Assumptions</div>
                <div className="mt-3 space-y-2 text-[0.64rem] text-[#888781]">
                  <div className="flex justify-between"><span>Material</span><span className="text-[#cbc9c2]">6061-T6</span></div>
                  <div className="flex justify-between"><span>Safety factor</span><span className="text-[#cbc9c2]">≥ 2.5</span></div>
                  <div className="flex justify-between"><span>Load case</span><span className="text-[#c6aa76]">Static?</span></div>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-[#c6aa76]/25 bg-[#c6aa76]/[0.05] p-3 text-[0.63rem] leading-5 text-[#b6a582]">
                One load case needs confirmation before simulation.
              </div>
            </section>
          </div>

          <div className="border-t border-white/[0.08] bg-[#0d0e0d] p-3">
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div className="rounded-lg border border-white/[0.08] bg-[#111210] p-3">
                <div className="flex items-center justify-between">
                  <RegionLabel number="4">Plan and operations</RegionLabel>
                  <span className="text-[0.58rem] text-[#777671]">2 / 5 complete</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[0.62rem] text-[#777671]">
                  <span className="text-[#9dc5bc]">✓ Select object</span><span>→</span>
                  <span className="text-[#9dc5bc]">✓ Draft proposal</span><span>→</span>
                  <span className="text-[#d2d0ca]">Confirm load case</span><span>→</span>
                  <span>Simulate</span><span>→</span><span>Commit</span>
                </div>
              </div>
              <div className="flex min-w-[165px] flex-col justify-center rounded-lg border border-[#527a72]/60 bg-[#14201d] px-4">
                <RegionLabel number="5">Approval</RegionLabel>
                <span className="mt-2 text-[0.62rem] text-[#b8ddd5]">Waiting for load case</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/[0.09] bg-[#111210] px-4 py-3">
              <RegionLabel number="6">Command channel</RegionLabel>
              <span className="h-4 w-px bg-white/[0.08]" />
              <span className="text-[0.66rem] text-[#66655f]">Ask, point, sketch, attach, or delegate…</span>
            </div>
          </div>
        </div>
      </div>
    </BlogFigure>
  );
}
