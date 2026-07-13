import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const alt = 'MirrorNeuron durable AI workflows made simple';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'radial-gradient(circle at 18% 16%, rgba(34, 211, 238, 0.24), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 52%, #07101c 100%)',
          color: 'white',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              border: '1px solid rgba(125, 211, 252, 0.45)',
              background: 'rgba(8, 47, 73, 0.58)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#67e8f9',
              fontSize: 34,
            }}
          >
            MN
          </div>
          {siteConfig.name}
        </div>

        <div
          style={{
            maxWidth: 900,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              color: '#67e8f9',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: 'uppercase',
            }}
          >
            Open-source workflow runtime
          </div>
          <h1
            style={{
              margin: '26px 0 0',
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: -2,
              fontWeight: 800,
            }}
          >
            Durable AI workflows without the orchestration overhead
          </h1>
          <p
            style={{
              margin: '28px 0 0',
              color: '#cbd5e1',
              fontSize: 30,
              lineHeight: 1.4,
            }}
          >
            Start from reusable blueprints, run near your data, and recover
            automatically when work fails.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            color: '#bae6fd',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          <span>1 command</span>
          <span>·</span>
          <span>Runnable blueprints</span>
          <span>·</span>
          <span>Retries, checkpoints, resume</span>
        </div>
      </div>
    ),
    size,
  );
}
