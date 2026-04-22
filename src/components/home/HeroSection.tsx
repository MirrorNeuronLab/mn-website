import { FaApple, FaGithub, FaLinux, FaWindows } from 'react-icons/fa';
import BlueprintModalTrigger from './BlueprintModalTrigger';
import HeroOutcomePanel from './HeroOutcomePanel';
import InstallCommand from './InstallCommand';
import { siteConfig } from '@/lib/site';

const heroPills = ['Fast', 'Durable', 'Anywhere', 'Anyone'];

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
      <div className="mn-container relative z-10 py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="flex h-full max-w-3xl flex-col justify-center lg:min-h-[34rem]">
            <div className="mb-6 flex flex-wrap gap-2">
              {heroPills.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,0.08)]"
                >
                  {item}
                </span>
              ))}
            </div>
            <h1 className="mn-gradient-text max-w-2xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.1]">
              Run your first
              <span className="block">AI workflow in minutes</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Create workflows from reusable blueprints. Share them with anyone,
              then run them on a laptop, cluster, edge node, or cloud.
            </p>
            <div className="mt-8">
              <InstallCommand command={siteConfig.installCommand} />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <BlueprintModalTrigger className="mn-primary-action px-6 py-3">
                Build in 1 min
              </BlueprintModalTrigger>
              <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-400">
                <div className="flex items-center gap-3 text-lg">
                  <FaApple aria-label="macOS" title="macOS" />
                  <FaLinux aria-label="Linux" title="Linux" />
                  <div
                    className="inline-flex items-center gap-1"
                    aria-label="Windows WSL"
                    title="Windows WSL"
                  >
                    <FaWindows />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
                      WSL
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
              <FaGithub className="h-5 w-5 text-slate-300" />
              <span>Open source on GitHub, MIT license.</span>
            </div>
          </div>

          <div>
            <HeroOutcomePanel />
          </div>
        </div>
      </div>
    </section>
  );
}
