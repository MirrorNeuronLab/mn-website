"use client";

import { useEffect, useRef } from "react";
import "./WorkflowBackground.css";

const SVG_NS = "http://www.w3.org/2000/svg";

function nodeMarkup(
  id: string,
  x: number,
  y: number,
  opts: { small?: boolean; dim?: boolean } = {},
) {
  const coreR = opts.small ? 3.6 : 5.2;
  const dotR = opts.small ? 1.15 : 1.55;
  const ringR = opts.small ? 9 : 12;
  const cls = `wf-node${opts.dim ? " wf-node--dim" : ""}`;
  return `
    <g id="n-${id}" class="${cls}" transform="translate(${x} ${y})">
      <circle class="wf-node-ring" r="${ringR}" />
      <circle class="wf-node-core" r="${coreR}" />
      <circle class="wf-node-dot" r="${dotR}" />
    </g>`;
}

export function WorkflowBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    const rafIds = new Set<number>();
    const timeouts = new Set<number>();

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timeouts.delete(id);
          resolve();
        }, ms);
        timeouts.add(id);
      });

    const trackedRaf = (cb: FrameRequestCallback) => {
      const id = requestAnimationFrame((t) => {
        rafIds.delete(id);
        cb(t);
      });
      rafIds.add(id);
      return id;
    };

    host.innerHTML = `
    <svg viewBox="0 0 1240 640" preserveAspectRatio="xMidYMid slice" role="presentation">
      <defs>
        <linearGradient id="wf-scan-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="white" stop-opacity="0"/>
          <stop offset=".5" stop-color="white" stop-opacity=".28"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <rect class="wf-scan" x="0" y="0" width="220" height="640" />

      <g class="wf-grid">
        <line x1="0" y1="150" x2="1240" y2="150" />
        <line x1="0" y1="320" x2="1240" y2="320" />
        <line x1="0" y1="490" x2="1240" y2="490" />
        <line x1="245" y1="0" x2="245" y2="640" />
        <line x1="550" y1="0" x2="550" y2="640" />
        <line x1="865" y1="0" x2="865" y2="640" />
      </g>

      <g class="wf-topology">
        <!-- feeders into start -->
        <path id="p-feed-a" class="wf-path wf-path--ghost" d="M-10 238 C20 238 30 272 55 320" />
        <path id="p-feed-b" class="wf-path wf-path--ghost" d="M-10 402 C20 402 30 368 55 320" />
        <path id="p-start-branch" class="wf-path wf-path--ambient slow" d="M55 320 C150 320 185 320 245 320" />

        <!-- upper parallel lane -->
        <path id="p-branch-top" class="wf-path wf-path--ghost" d="M245 320 C295 320 305 92 400 92" />
        <path id="p-upper-top-run" class="wf-path wf-path--ambient" d="M400 92 C460 92 500 92 560 92" />
        <path id="p-upper-top-drop" class="wf-path wf-path--ghost" d="M560 92 C620 92 630 120 660 145" />
        <path id="p-approval-merge" class="wf-path wf-path--ghost" d="M660 145 C690 180 695 230 705 274" />

        <path id="p-branch-up" class="wf-path" d="M245 320 C315 320 320 192 400 192" />
        <path id="p-branch-mid" class="wf-path wf-path--ambient reverse" d="M245 320 C330 320 365 320 445 320" />
        <path id="p-branch-down" class="wf-path wf-path--ghost" d="M245 320 C325 320 345 455 430 455" />

        <path id="p-up-wait" class="wf-path" d="M400 192 C465 192 490 192 550 192" />
        <path id="p-up-after-wait" class="wf-path wf-path--ambient slow" d="M550 192 C635 192 635 274 705 274" />
        <path id="p-wait-merge-ghost" class="wf-path wf-path--ghost" d="M550 192 C610 192 650 210 705 274" />
        <path id="p-fan-cross2" class="wf-path wf-path--ghost" d="M865 274 C920 250 960 210 1006 185" />

        <!-- middle lane with explicit retry hop -->
        <path id="p-mid-run" class="wf-path" d="M445 320 C515 320 555 320 625 320" />
        <path id="p-mid-retry-a" class="wf-path" d="M625 320 C655 320 670 328 705 335" />
        <path id="p-mid-retry-b" class="wf-path" d="M705 335 C735 342 755 350 778 360" />
        <path id="p-mid-fail" class="wf-path wf-path--ghost" d="M625 320 C685 320 710 360 778 360" />
        <path id="p-mid-side" class="wf-path wf-path--ghost" d="M445 320 C480 350 505 375 535 395" />
        <path id="p-sidecar-back" class="wf-path wf-path--ghost" d="M535 395 C575 395 600 360 625 320" />
        <path id="p-checkpoint-link" class="wf-path wf-path--ghost" d="M625 320 C650 360 670 390 755 402" />

        <path id="p-down-run" class="wf-path wf-path--ghost wf-path--ambient slow reverse" d="M430 455 C500 455 535 446 600 446" />
        <path id="p-down-merge" class="wf-path wf-path--ghost" d="M600 446 C675 446 695 402 755 402" />

        <!-- lower spur lane -->
        <path id="p-lower-spur" class="wf-path wf-path--ghost" d="M600 446 C635 480 655 500 680 520" />
        <path id="p-lower-spur2" class="wf-path wf-path--ghost wf-path--ambient slow reverse" d="M680 520 C740 522 790 512 840 500" />
        <path id="p-lower-spur-merge" class="wf-path wf-path--ghost" d="M840 500 C870 440 872 340 865 274" />

        <path id="p-recovery-back" class="wf-path wf-path--recovery" d="M778 360 C724 437 598 492 523 401 C488 360 500 338 540 320" />
        <path id="p-recovery-alt" class="wf-path wf-path--recovery" d="M540 320 C615 286 650 253 705 274" />

        <path id="p-merge" class="wf-path" d="M705 274 C775 274 805 274 865 274" />
        <path id="p-merge-lower" class="wf-path" d="M755 402 C805 402 815 330 865 274" />

        <path id="p-fan-a" class="wf-path wf-path--ambient" d="M865 274 C930 274 940 185 1006 185" />
        <path id="p-fan-b" class="wf-path" d="M865 274 C935 274 950 274 1025 274" />
        <path id="p-fan-c" class="wf-path wf-path--ghost" d="M865 274 C935 274 945 380 1018 380" />
        <path id="p-fan-cross" class="wf-path wf-path--ghost" d="M865 274 C920 300 960 340 1018 380" />

        <!-- second fan stage -->
        <path id="p-fan-a2" class="wf-path wf-path--ghost" d="M1006 185 C1040 160 1060 145 1090 130" />
        <path id="p-fan-c2" class="wf-path wf-path--ghost" d="M1018 380 C1050 400 1070 425 1095 445" />

        <path id="p-end-a" class="wf-path wf-path--ghost" d="M1006 185 C1070 185 1110 220 1185 220" />
        <path id="p-end-a2" class="wf-path wf-path--ghost wf-path--ambient" d="M1090 130 C1130 155 1150 185 1185 220" />
        <path id="p-end-b" class="wf-path wf-path--ambient reverse" d="M1025 274 C1090 274 1120 308 1185 308" />
        <path id="p-end-c" class="wf-path wf-path--ghost" d="M1018 380 C1080 380 1120 355 1185 355" />
        <path id="p-end-c2" class="wf-path wf-path--ghost" d="M1095 445 C1130 420 1150 390 1185 355" />
      </g>

      <g class="wf-nodes">
        ${nodeMarkup("feedA", 18, 238, { small: true, dim: true })}
        ${nodeMarkup("feedB", 18, 402, { small: true, dim: true })}
        ${nodeMarkup("start", 55, 320)}
        ${nodeMarkup("branch", 245, 320)}
        ${nodeMarkup("upperTop", 400, 92, { small: true })}
        ${nodeMarkup("upperTop2", 560, 92, { small: true })}
        ${nodeMarkup("approval", 660, 145, { small: true })}
        ${nodeMarkup("upper", 400, 192)}
        ${nodeMarkup("wait", 550, 192)}
        ${nodeMarkup("middle", 445, 320)}
        ${nodeMarkup("checkpoint", 625, 320)}
        ${nodeMarkup("retry", 705, 335, { small: true })}
        ${nodeMarkup("fail", 778, 360)}
        ${nodeMarkup("sidecar", 535, 395, { small: true, dim: true })}
        ${nodeMarkup("linkMid", 690, 372, { small: true, dim: true })}
        ${nodeMarkup("lower", 430, 455)}
        ${nodeMarkup("lower2", 600, 446)}
        ${nodeMarkup("lower3", 680, 520, { small: true })}
        ${nodeMarkup("lower4", 840, 500, { small: true })}
        ${nodeMarkup("mergeLower", 755, 402)}
        ${nodeMarkup("merge", 705, 274)}
        ${nodeMarkup("fan", 865, 274)}
        ${nodeMarkup("fanA", 1006, 185)}
        ${nodeMarkup("fanB", 1025, 274)}
        ${nodeMarkup("fanC", 1018, 380)}
        ${nodeMarkup("fanA2", 1090, 130, { small: true })}
        ${nodeMarkup("fanC2", 1095, 445, { small: true })}
        ${nodeMarkup("endA", 1185, 220)}
        ${nodeMarkup("endB", 1185, 308)}
        ${nodeMarkup("endC", 1185, 355)}
      </g>

      <g class="wf-packets"></g>
    </svg>`;

    const packetLayer = host.querySelector(".wf-packets");
    const path = (id: string) =>
      host.querySelector<SVGPathElement>(`#${CSS.escape(id)}`);
    const nodeEl = (id: string) =>
      host.querySelector(`#n-${CSS.escape(id)}`);

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !packetLayer
    ) {
      nodeEl("branch")?.classList.add("is-active");
      nodeEl("wait")?.classList.add("is-waiting");
      return;
    }

    function makePacket(radius = 2.4) {
      const g = document.createElementNS(SVG_NS, "g");
      const halo = document.createElementNS(SVG_NS, "circle");
      const dot = document.createElementNS(SVG_NS, "circle");
      halo.setAttribute("class", "wf-packet-halo");
      halo.setAttribute("r", String(radius * 2.8));
      dot.setAttribute("class", "wf-packet");
      dot.setAttribute("r", String(radius));
      g.append(halo, dot);
      packetLayer?.appendChild(g);
      return g;
    }

    function travel(
      pathId: string,
      opts: { packet?: SVGGElement; duration?: number; fadeOut?: boolean } = {},
    ): Promise<SVGGElement> {
      const packet = opts.packet ?? makePacket();
      const duration = opts.duration ?? 900;
      const fadeOut = opts.fadeOut ?? false;
      const p = path(pathId);
      if (!p || cancelled) return Promise.resolve(packet);
      let len = 0;
      try {
        len = p.getTotalLength();
      } catch {
        return Promise.resolve(packet);
      }
      const start = performance.now();
      packet.style.opacity = "1";

      return new Promise<SVGGElement>((resolve) => {
        const frame = (now: number) => {
          if (cancelled) {
            resolve(packet);
            return;
          }
          const raw = Math.min(1, (now - start) / duration);
          const e =
            raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
          try {
            const pt = p.getPointAtLength(len * e);
            packet.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
          } catch {
            resolve(packet);
            return;
          }
          if (raw < 1) {
            trackedRaf(frame);
          } else {
            if (fadeOut) {
              packet.style.transition = "opacity .24s ease";
              packet.style.opacity = "0";
              sleep(250).then(() => {
                packet.remove();
                resolve(packet);
              });
            } else {
              resolve(packet);
            }
          }
        };
        trackedRaf(frame);
      });
    }

    function pulse(id: string, ms = 700) {
      const n = nodeEl(id);
      if (!n) return;
      n.classList.remove("is-active");
      // Force reflow so the pulse animation restarts.
      void (n as unknown as { getBBox: () => DOMRect }).getBBox?.();
      n.classList.add("is-active");
      const t = window.setTimeout(
        () => n.classList.remove("is-active"),
        ms,
      );
      timeouts.add(t);
    }

    const DECOR_PULSE_IDS = [
      "upperTop",
      "upperTop2",
      "approval",
      "sidecar",
      "linkMid",
      "lower3",
      "lower4",
      "fanA2",
      "fanC2",
      "feedA",
      "feedB",
      "retry",
    ];

    async function decorPulseLoop() {
      let i = 0;
      while (!cancelled && document.body.contains(host)) {
        const id = DECOR_PULSE_IDS[i % DECOR_PULSE_IDS.length];
        pulse(id, 650);
        i += 1;
        await sleep(520);
      }
    }

    async function upperEchoLoop() {
      await sleep(1400);
      while (!cancelled && document.body.contains(host)) {
        let p = makePacket(1.5);
        p = await travel("p-branch-top", { packet: p, duration: 950 });
        if (cancelled) return;
        pulse("upperTop", 650);
        p = await travel("p-upper-top-run", { packet: p, duration: 700 });
        if (cancelled) return;
        pulse("upperTop2", 650);
        p = await travel("p-upper-top-drop", { packet: p, duration: 550 });
        if (cancelled) return;
        pulse("approval", 750);
        p = await travel("p-approval-merge", { packet: p, duration: 650 });
        if (cancelled) return;
        pulse("merge", 650);
        p.remove();
        await sleep(2800);
      }
    }

    async function lowerEchoLoop() {
      await sleep(2200);
      while (!cancelled && document.body.contains(host)) {
        let p = makePacket(1.4);
        p = await travel("p-lower-spur", { packet: p, duration: 700 });
        if (cancelled) return;
        pulse("lower3", 650);
        p = await travel("p-lower-spur2", { packet: p, duration: 900 });
        if (cancelled) return;
        pulse("lower4", 650);
        p = await travel("p-lower-spur-merge", { packet: p, duration: 1100 });
        if (cancelled) return;
        pulse("fan", 650);
        p.remove();
        await sleep(3200);
      }
    }

    async function fanStageLoop() {
      await sleep(3000);
      while (!cancelled && document.body.contains(host)) {
        const a = makePacket(1.2);
        const c = makePacket(1.2);
        await Promise.all([
          travel("p-fan-a2", { packet: a, duration: 600, fadeOut: false }).then(
            (p) =>
              travel("p-end-a2", { packet: p, duration: 700, fadeOut: true }),
          ),
          travel("p-fan-c2", { packet: c, duration: 600, fadeOut: false }).then(
            (p) =>
              travel("p-end-c2", { packet: p, duration: 700, fadeOut: true }),
          ),
        ]);
        if (cancelled) break;
        await sleep(2600);
      }
    }

    async function story() {
      let main = makePacket(2.6);
      main = await travel("p-start-branch", { packet: main, duration: 950 });
      if (cancelled) return;
      pulse("branch", 900);

      const up = makePacket(2.1);
      const mid = makePacket(2.2);
      const down = makePacket(1.8);
      main.remove();

      await Promise.all([
        travel("p-branch-up", { packet: up, duration: 760 }),
        travel("p-branch-mid", { packet: mid, duration: 900 }),
        travel("p-branch-down", { packet: down, duration: 1120 }),
      ]);
      if (cancelled) return;

      const upPacket = await travel("p-up-wait", { packet: up, duration: 620 });
      if (cancelled) return;
      nodeEl("wait")?.classList.add("is-waiting");

      const lowerPromise = (async () => {
        let p = await travel("p-down-run", { packet: down, duration: 900 });
        if (cancelled) return p;
        p = await travel("p-down-merge", { packet: p, duration: 760 });
        if (cancelled) return p;
        pulse("mergeLower");
        pulse("linkMid", 650);
        return p;
      })();

      const recoverPromise = (async () => {
        let p = await travel("p-mid-run", { packet: mid, duration: 720 });
        if (cancelled) return p;
        pulse("checkpoint", 1100);
        p = await travel("p-mid-retry-a", { packet: p, duration: 420 });
        if (cancelled) return p;
        pulse("retry", 900);
        p = await travel("p-mid-retry-b", { packet: p, duration: 420 });
        if (cancelled) return p;
        nodeEl("fail")?.classList.add("is-failed");
        await sleep(470);
        if (cancelled) return p;
        nodeEl("fail")?.classList.remove("is-failed");

        nodeEl("checkpoint")?.classList.add("is-recovering");
        p = await travel("p-recovery-back", { packet: p, duration: 980 });
        if (cancelled) return p;
        pulse("middle");
        pulse("sidecar", 650);
        p = await travel("p-recovery-alt", { packet: p, duration: 760 });
        nodeEl("checkpoint")?.classList.remove("is-recovering");
        return p;
      })();

      await sleep(1150);
      if (cancelled) return;
      nodeEl("wait")?.classList.remove("is-waiting");
      const upperPromise = travel("p-up-after-wait", {
        packet: upPacket,
        duration: 900,
      });

      const [lower, recovered, upper] = await Promise.all([
        lowerPromise,
        recoverPromise,
        upperPromise,
      ]);
      if (cancelled) return;
      lower.remove();
      recovered.remove();
      pulse("merge", 900);
      pulse("approval", 600);

      const merged = await travel("p-merge", { packet: upper, duration: 700 });
      if (cancelled) return;
      pulse("fan", 900);

      const a = makePacket(1.7);
      const b = merged;
      const c = makePacket(1.6);
      await Promise.all([
        travel("p-fan-a", { packet: a, duration: 650 }),
        travel("p-fan-b", { packet: b, duration: 720 }),
        travel("p-fan-c", { packet: c, duration: 830 }),
      ]);
      if (cancelled) return;
      pulse("fanA", 600);
      pulse("fanB", 600);
      pulse("fanC", 600);
      await Promise.all([
        travel("p-end-a", { packet: a, duration: 580, fadeOut: true }),
        travel("p-end-b", { packet: b, duration: 620, fadeOut: true }),
        travel("p-end-c", { packet: c, duration: 680, fadeOut: true }),
      ]);
    }

    async function loop() {
      await sleep(350);
      while (!cancelled && document.body.contains(host)) {
        try {
          await story();
          if (cancelled) break;
          await sleep(1100);
        } catch (err) {
          console.warn("workflow background reset", err);
          packetLayer?.replaceChildren();
          await sleep(800);
        }
      }
    }

    loop();
    decorPulseLoop();
    upperEchoLoop();
    lowerEchoLoop();
    fanStageLoop();

    return () => {
      cancelled = true;
      rafIds.forEach((id) => cancelAnimationFrame(id));
      timeouts.forEach((id) => clearTimeout(id));
      rafIds.clear();
      timeouts.clear();
      host.innerHTML = "";
    };
  }, []);

  return <div ref={hostRef} className="workflow-bg" aria-hidden="true" />;
}
