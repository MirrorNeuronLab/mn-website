'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ARENA_MODELS, CLOSED_COUNT, OPEN_COUNT, orgColor, type ArenaModel } from '@/lib/llm-arena-data';
import styles from './LlmArenaRace.module.css';

type YKey = 'ii' | 'arena' | 'humaneval' | 'context_k';

type UiState = {
  playing: boolean;
  speed: number;
  yMetric: YKey;
  showLabels: boolean;
  showSota: boolean;
  frontierOnly: boolean;
  trailWindow: boolean;
  autoZoom: boolean;
  showGrid: boolean;
  showClosed: boolean;
  hiddenOrgs: Set<string>;
};

const W = 980;
const H = 560;
const M = { t: 26, r: 26, b: 64, l: 72 };
const IW = W - M.l - M.r;
const IH = H - M.t - M.b;
const X_DEF: [number, number] = [32, 95];
const Y_DEF: Record<YKey, [number, number]> = {
  ii: [5, 82],
  arena: [940, 1520],
  humaneval: [5, 100],
  context_k: [1.5, 12000],
};
const DAY_MS = 864e5;
const T1 = new Date('2026-11-01T00:00:00Z');

function sotaList<D extends ArenaModel & { date: Date }>(visible: D[]): D[] {
  const s = [...visible].filter((d) => !d.closed).sort((a, b) => +a.date - +b.date);
  const out: D[] = [];
  let best = -1;
  for (const m of s) {
    if (m.ii > best) {
      best = m.ii;
      out.push(m);
    }
  }
  return out;
}

export default function LlmArenaRace() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLDivElement | null>(null);
  const sotaRef = useRef<HTMLDivElement | null>(null);
  const legendRef = useRef<HTMLDivElement | null>(null);
  const renderRef = useRef<(() => void) | null>(null);
  const curDayRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [yMetric, setYMetric] = useState<YKey>('ii');
  const [showLabels, setShowLabels] = useState(true);
  const [showSota, setShowSota] = useState(true);
  const [frontierOnly, setFrontierOnly] = useState(false);
  const [trailWindow, setTrailWindow] = useState(true);
  const [autoZoom, setAutoZoom] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showClosed, setShowClosed] = useState(false);
  const [hiddenOrgs, setHiddenOrgs] = useState<Set<string>>(() => new Set());

  const uiRef = useRef<UiState>({
    playing: false,
    speed: 10,
    yMetric: 'ii',
    showLabels: true,
    showSota: true,
    frontierOnly: false,
    trailWindow: true,
    autoZoom: true,
    showGrid: true,
    showClosed: false,
    hiddenOrgs: new Set(),
  });
  // Mirror committed UI state for the imperative D3 loop (assigned in an effect, never during render).
  useEffect(() => {
    uiRef.current = {
      playing,
      speed,
      yMetric,
      showLabels,
      showSota,
      frontierOnly,
      trailWindow,
      autoZoom,
      showGrid,
      showClosed,
      hiddenOrgs,
    };
  });

  // Build the chart once; render() reads live UI state from uiRef.
  useEffect(() => {
    const svgEl = svgRef.current;
    const wrapEl = wrapRef.current;
    const tipEl = tipRef.current;
    if (!svgEl || !wrapEl || !tipEl) return;

    type D = ArenaModel & { date: Date };
    const models: D[] = ARENA_MODELS.map((d) => ({ ...d, date: new Date(`${d.release}T00:00:00Z`) }));

    const svg = d3.select(svgEl);
    const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);
    const gridG = g.append('g').attr('class', 'grid');
    const xAxisG = g.append('g').attr('class', 'axis').attr('transform', `translate(0,${IH})`);
    const yAxisG = g.append('g').attr('class', 'axis');
    const bigDate = g
      .append('text')
      .attr('class', 'bigDate')
      .attr('x', IW - 12)
      .attr('y', IH - 6)
      .attr('text-anchor', 'end')
      .attr('font-size', 92)
      .text('');
    const sotaG = g.append('g');
    const bubG = g.append('g');
    const labG = g.append('g');
    g.append('text')
      .attr('x', IW / 2)
      .attr('y', IH + 46)
      .attr('text-anchor', 'middle')
      .attr('fill', '#8b96a1')
      .attr('font-size', 13)
      .attr('font-weight', 700)
      .text('MMLU 5-shot (%) → smarter');
    const yLab = g
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -IH / 2)
      .attr('y', -52)
      .attr('text-anchor', 'middle')
      .attr('fill', '#8b96a1')
      .attr('font-size', 13)
      .attr('font-weight', 700);

    const xScale = d3.scaleLinear().domain(X_DEF).range([0, IW]);
    const rScale = d3.scaleSqrt().domain([2, 2800]).range([5, 58]);

    const t0 = d3.min(models, (d) => d.date) ?? new Date('2023-02-24T00:00:00Z');
    const totalDays = Math.round((+T1 - +t0) / DAY_MS);
    if (sliderRef.current) sliderRef.current.max = String(totalDays);
    const dateOf = (day: number) => new Date(+t0 + day * DAY_MS);
    const fmtDate = d3.utcFormat('%b %Y');
    const xPos = (d: D) => xScale(d.mmlu);

    function yAccessors(key: YKey) {
      if (key === 'ii')
        return {
          key,
          scale: d3.scaleLinear().domain(Y_DEF.ii).range([IH, 0]),
          label: 'Intelligence Index (composite overall score) → smarter overall',
        };
      if (key === 'arena')
        return {
          key,
          scale: d3.scaleLinear().domain(Y_DEF.arena).range([IH, 0]),
          label: 'Chatbot Arena Elo → more preferred',
        };
      if (key === 'humaneval')
        return {
          key,
          scale: d3.scaleLinear().domain(Y_DEF.humaneval).range([IH, 0]),
          label: 'HumanEval pass@1 (%) → better coding',
        };
      return {
        key,
        scale: d3.scaleLog().domain(Y_DEF.context_k).range([IH, 0]),
        label: 'Context window (tokens, log) → longer memory',
      };
    }

    function fitDomains(points: D[], acc: ReturnType<typeof yAccessors>) {
      if (points.length < 2) {
        xScale.domain(X_DEF);
        acc.scale.domain(Y_DEF[acc.key]);
        return;
      }
      const xs = points.map((d) => d.mmlu);
      let x0 = Math.min(...xs);
      let x1 = Math.max(...xs);
      const xpad = Math.max((x1 - x0) * 0.25, 1.2);
      x0 = Math.max(30, x0 - xpad);
      x1 = Math.min(95.5, x1 + xpad);
      if (x1 - x0 < 4) {
        const m = (x0 + x1) / 2;
        x0 = Math.max(30, m - 2);
        x1 = Math.min(95.5, m + 2);
      }
      xScale.domain([x0, x1]);
      const vals = points.map((d) => (acc.key === 'context_k' ? d.context_k : d[acc.key as 'ii' | 'arena' | 'humaneval']));
      if (acc.key === 'context_k') {
        const lo = Math.min(...vals);
        const hi = Math.max(...vals);
        (acc.scale as d3.ScaleLogarithmic<number, number>).domain([
          Math.max(1.2, lo / 1.8),
          Math.min(12000, hi * 1.8),
        ]);
      } else {
        const DEF = Y_DEF[acc.key];
        const lo = Math.min(...vals);
        const hi = Math.max(...vals);
        const pad = Math.max((hi - lo) * 0.3, acc.key === 'arena' ? 12 : 1.5);
        let a = Math.max(DEF[0], lo - pad);
        let b = Math.min(DEF[1], hi + pad);
        const minSpan = acc.key === 'arena' ? 40 : 4;
        if (b - a < minSpan) {
          const m = (lo + hi) / 2;
          const w = minSpan / 2;
          a = Math.max(DEF[0], m - w);
          b = Math.min(DEF[1], m + w);
        }
        (acc.scale as d3.ScaleLinear<number, number>).domain([a, b]);
      }
    }

    const render = () => {
      const ui = uiRef.current;
      const now = dateOf(curDayRef.current);
      const acc = yAccessors(ui.yMetric);
      const yPos = (d: D) =>
        acc.scale(acc.key === 'context_k' ? d.context_k : d[acc.key as 'ii' | 'arena' | 'humaneval']);
      yLab.text(acc.label);

      const visible = models.filter((d) => d.date <= now && (ui.showClosed || !d.closed));
      const inView = ui.trailWindow
        ? visible.filter((d) => d.date > new Date(+now - 365 * DAY_MS))
        : visible;

      if (ui.autoZoom && ui.trailWindow) fitDomains(inView, acc);
      else {
        xScale.domain(X_DEF);
        acc.scale.domain(Y_DEF[acc.key]);
      }

      if (dateRef.current) dateRef.current.textContent = fmtDate(now);
      const nClosedView = inView.filter((d) => d.closed).length;
      const closedTag = ui.showClosed && nClosedView ? ` (${nClosedView} commercial)` : '';
      if (countRef.current)
        countRef.current.textContent = ui.trailWindow
          ? `${inView.length} in view${closedTag} · ${visible.length} total`
          : `${visible.length} models${closedTag}`;
      bigDate.text(String(now.getUTCFullYear()));

      const xAxis = d3.axisBottom(xScale).ticks(8).tickFormat((d) => `${d}%`);
      const yAxis =
        acc.key === 'context_k'
          ? d3.axisLeft(acc.scale).ticks(6).tickFormat((v) => (+v >= 1000 ? `${+v / 1000}M` : `${v}K`))
          : acc.key === 'humaneval'
            ? d3.axisLeft(acc.scale).ticks(8).tickFormat((v) => `${v}%`)
            : d3.axisLeft(acc.scale).ticks(8);
      xAxisG.call(xAxis as never);
      yAxisG.call(yAxis as never);
      gridG.style('display', ui.showGrid ? '' : 'none');
      if (ui.showGrid) {
        gridG.call(d3.axisLeft(acc.scale).ticks(6).tickSize(-IW).tickFormat(() => ''));
        gridG.selectAll('path,.tick text').remove();
      }

      const fullSota = sotaList(visible);
      const sotaIds = new Set(fullSota.map((d) => d.id));
      const winIds = new Set(inView.map((d) => d.id));
      const sota =
        ui.showSota || ui.frontierOnly
          ? fullSota.filter((d) => !ui.trailWindow || winIds.has(d.id))
          : [];
      const line = d3
        .line<D>()
        .x((d) => xPos(d))
        .y((d) => yPos(d))
        .curve(d3.curveMonotoneX);
      sotaG.selectAll('*').remove();
      if ((ui.showSota || ui.frontierOnly) && sota.length > 1) {
        sotaG.append('path').attr('class', 'sota-line').attr('d', line(sota));
        sotaG
          .selectAll<SVGCircleElement, D>('circle')
          .data(sota)
          .join('circle')
          .attr('class', 'sota-dot')
          .attr('r', 3.5)
          .attr('cx', (d) => xPos(d))
          .attr('cy', (d) => yPos(d));
      }

      const keyFn = (d: D) => d.id;
      bubG
        .selectAll<SVGCircleElement, D>('circle')
        .data(inView, keyFn)
        .join(
          (enter) =>
            enter
              .append('circle')
              .attr('class', 'bubble')
              .attr('cx', (d) => xPos(d))
              .attr('cy', (d) => yPos(d))
              .attr('r', 0)
              .attr('fill', (d) => orgColor(d.org))
              .attr('opacity', 0.88)
              .call((e) => e.transition().duration(450).attr('r', (d) => rScale(d.params)))
              .selection() as d3.Selection<SVGCircleElement, D, SVGGElement, unknown>,
          (update) => update.interrupt().style('opacity', null),
          (exit) =>
            exit
              .transition()
              .duration(400)
              .attr('r', 0)
              .style('opacity', 0)
              .attr('cx', (d) => xPos(d) - 46)
              .remove(),
        )
        .attr('cx', (d) => xPos(d))
        .attr('cy', (d) => yPos(d))
        .attr('r', (d) => rScale(d.params))
        .attr('fill', (d) => orgColor(d.org))
        .classed('dim', (d) => ui.hiddenOrgs.has(d.org))
        .classed('closed', (d) => !!d.closed)
        .classed('is-frontier', (d) => sotaIds.has(d.id))
        .classed('non-frontier-hidden', (d) => ui.frontierOnly && !sotaIds.has(d.id))
        .style('display', (d) => (ui.frontierOnly && !sotaIds.has(d.id) ? 'none' : ''))
        .on('mousemove', (ev: MouseEvent, d) => {
          const r = wrapEl.getBoundingClientRect();
          tipEl.style.opacity = '1';
          tipEl.style.left = `${Math.min(ev.clientX - r.left + 16, wrapEl.clientWidth - 300)}px`;
          tipEl.style.top = `${ev.clientY - r.top - 10}px`;
          const frontierTag = sotaIds.has(d.id)
            ? `<div class="${styles.tooltipRow}"><span>★</span><b style="color:#ffa200">FRONTIER MODEL</b></div>`
            : '';
          tipEl.innerHTML =
            `<h3>${d.closed ? '🔒 ' : ''}${d.name}</h3>${frontierTag}` +
            `<div class="${styles.tooltipRow}"><span>Org</span><b>${d.org}</b></div>` +
            `<div class="${styles.tooltipRow}"><span>License</span><b>${d.closed ? '🔒 Closed / proprietary' : '✅ Open weights'}</b></div>` +
            `<div class="${styles.tooltipRow}"><span>Released</span><b>${d.release}</b></div>` +
            `<div class="${styles.tooltipRow}"><span>Params</span><b>${d.pest ? '≈' : ''}${d.params}B${d.active ? ` (${d.active}B active)` : ''}${d.pest ? ' (undisclosed)' : ''}</b></div>` +
            `<div class="${styles.tooltipRow}"><span>Intelligence Index</span><b>${d.ii}</b></div>` +
            `<div class="${styles.tooltipRow}"><span>MMLU</span><b>${d.mmlu}%</b></div>` +
            `<div class="${styles.tooltipRow}"><span>Arena</span><b>${d.arena}</b></div>` +
            `<div class="${styles.tooltipRow}"><span>HumanEval</span><b>${d.humaneval}%</b></div>` +
            `<div class="${styles.tooltipRow}"><span>Context</span><b>${d.context_k >= 1000 ? `${d.context_k / 1000}M` : `${d.context_k}K`}</b></div>`;
        })
        .on('mouseleave', () => {
          tipEl.style.opacity = '0';
        });

      let labelled: D[] = [];
      if (ui.showLabels) {
        labelled =
          ui.frontierOnly
            ? [...sota]
            : [...sota.slice(-4), ...[...inView].sort((a, b) => +b.date - +a.date).slice(0, 5)].filter(
                (v, i, a) => a.findIndex((x) => x.id === v.id) === i,
              );
      }
      labG
        .selectAll<SVGTextElement, D>('text')
        .data(labelled, keyFn)
        .join(
          (e) => e.append('text').attr('class', 'bubbleLabel'),
          (u) => u,
          (x) => x.remove(),
        )
        .attr('x', (d) => xPos(d) + rScale(d.params) + 5)
        .attr('y', (d) => yPos(d) + 4)
        .text((d) => `${d.closed ? '🔒 ' : ''}${d.name}`);

      if (sotaRef.current) {
        if (fullSota.length) {
          const best = fullSota[fullSota.length - 1];
          const trail = fullSota.map((d) => d.name).join(' → ');
          sotaRef.current.innerHTML =
            `🏆 Open-source frontier <b>${fmtDate(now)}</b>: <b>${best.name}</b> (${best.org}, ${best.release}) — ` +
            `Intelligence Index <b>${best.ii}</b>, MMLU <b>${best.mmlu}%</b>, Arena <b>${best.arena}</b>, ${best.params}B params. ` +
            `${ui.trailWindow ? `Lens: last 12 months (<b>${inView.length} models in view</b>). ` : ''}` +
            `${ui.frontierOnly ? `Showing <b>${sota.length} frontier models only</b>. ` : ''}` +
            `<br><span style="color:#5d6873">Frontier trail (${fullSota.length}): ${trail}</span>`;
        } else {
          sotaRef.current.textContent = 'Press play — models will pop in at their release date.';
        }
      }

      if (sliderRef.current && +sliderRef.current.value !== Math.floor(curDayRef.current))
        sliderRef.current.value = String(Math.floor(curDayRef.current));
    };

    renderRef.current = render;

    let previousElapsed = 0;
    const timer = d3.timer((elapsed) => {
      const deltaSeconds = (elapsed - previousElapsed) / 1000;
      previousElapsed = elapsed;
      if (!uiRef.current.playing) return;
      const previousDay = Math.floor(curDayRef.current);
      // Speed is simulated days per second, independent of display refresh rate.
      curDayRef.current += uiRef.current.speed * deltaSeconds;
      if (curDayRef.current >= totalDays) {
        curDayRef.current = totalDays;
        uiRef.current.playing = false;
        setPlaying(false);
      }
      if (Math.floor(curDayRef.current) !== previousDay) render();
    });
    render();

    return () => {
      timer.stop();
      renderRef.current = null;
      svg.selectAll('*').interrupt();
      svg.selectAll('*').remove();
    };
  }, []);

  // Re-render on control changes (timer loop skips when paused).
  useEffect(() => {
    renderRef.current?.();
  });

  const orgs = [...new Set(ARENA_MODELS.map((d) => d.org))].sort();

  const toggleOrg = (o: string) =>
    setHiddenOrgs((prev) => {
      const next = new Set(prev);
      if (next.has(o)) next.delete(o);
      else next.add(o);
      return next;
    });

  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <div className={styles.brand}>
          LLM-ARENA <span>{'//'}</span> OPEN-WEIGHTS BUBBLE RACE
        </div>
        <div className={styles.tag}>
          ROSLING-MODE · {OPEN_COUNT} OPEN + {CLOSED_COUNT} CLOSED · 2023—2026
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.closedBtn} ${showClosed ? styles.on : ''}`}
          onClick={() => setShowClosed((v) => !v)}
        >
          {showClosed ? '🔓 Hide commercial models' : '🔒 Show commercial: GPT · Claude · Gemini'}
        </button>
        <button
          type="button"
          className={`${styles.playBtn} ${playing ? '' : styles.paused}`}
          aria-pressed={playing}
          onClick={() => {
            const next = !playing;
            if (next && sliderRef.current && +sliderRef.current.max - curDayRef.current < 1)
              curDayRef.current = 0;
            uiRef.current.playing = next;
            setPlaying(next);
            renderRef.current?.();
          }}
        >
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button
          type="button"
          className={styles.restartBtn}
          onClick={() => {
            curDayRef.current = 0;
            uiRef.current.playing = true;
            setPlaying(true);
            renderRef.current?.();
          }}
        >
          ↺ Restart
        </button>
        <label className={styles.ctl}>
          Speed
          <select value={speed} onChange={(e) => setSpeed(+e.target.value)}>
            <option value={4}>slow</option>
            <option value={10}>normal</option>
            <option value={25}>fast</option>
            <option value={60}>very fast</option>
          </select>
        </label>
        <label className={styles.ctl}>
          Y-axis
          <select value={yMetric} onChange={(e) => setYMetric(e.target.value as YKey)}>
            <option value="ii">Intelligence Index (overall)</option>
            <option value="arena">Chatbot Arena Elo</option>
            <option value="humaneval">HumanEval coding %</option>
            <option value="context_k">Context window (log)</option>
          </select>
        </label>
        <label className={styles.ctl}>
          <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} /> labels
        </label>
        <label className={styles.ctl}>
          <input type="checkbox" checked={showSota} onChange={(e) => setShowSota(e.target.checked)} /> frontier trail
        </label>
        <label className={styles.ctl}>
          <input type="checkbox" checked={frontierOnly} onChange={(e) => setFrontierOnly(e.target.checked)} /> frontier
          only
        </label>
        <label className={styles.ctl} title="Show only models released in the last 12 months">
          <input type="checkbox" checked={trailWindow} onChange={(e) => setTrailWindow(e.target.checked)} /> last 1 yr
        </label>
        <label className={styles.ctl} title="Zoom axes to fit the visible window as time moves">
          <input type="checkbox" checked={autoZoom} onChange={(e) => setAutoZoom(e.target.checked)} /> auto-zoom
        </label>
        <label className={styles.ctl}>
          <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} /> grid
        </label>
      </div>

      <div className={styles.timeline}>
        <div ref={dateRef} className={styles.dateLabel}>
          Feb 2023
        </div>
        <input
          ref={sliderRef}
          type="range"
          aria-label="Model release timeline"
          min={0}
          max={1000}
          defaultValue={0}
          onInput={(e) => {
            curDayRef.current = +e.currentTarget.value;
            uiRef.current.playing = false;
            setPlaying(false);
            renderRef.current?.();
          }}
        />
        <div ref={countRef} className={styles.modelCount}>
          0 models
        </div>
      </div>

      <div ref={wrapRef} className={styles.chartBox}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Animated bubble chart of open-weights LLM releases" />
        <div ref={tipRef} className={styles.tooltip} />
      </div>

      <div ref={legendRef} className={styles.legend}>
        {orgs.map((o) => (
          <div
            key={o}
            className={`${styles.leg} ${hiddenOrgs.has(o) ? styles.off : ''}`}
            onClick={() => toggleOrg(o)}
          >
            <i style={{ background: orgColor(o) }} />
            {o}
          </div>
        ))}
      </div>
      <div ref={sotaRef} className={styles.sota} />
    </div>
  );
}
