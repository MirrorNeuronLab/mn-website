import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const alt = 'MirrorNeuron durable runtime for deep agents';
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
          background: '#0c0c0b',
          color: '#f4f2ed',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
            fontWeight: 500,
          }}
        >
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
              color: '#8bc9bc',
              fontSize: 21,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Durable runtime for deep agents
          </div>
          <h1
            style={{
              margin: '26px 0 0',
              fontFamily: 'Georgia, serif',
              fontSize: 72,
              lineHeight: 1,
              letterSpacing: -2,
              fontWeight: 400,
            }}
          >
            Run deep agents on your PCs
          </h1>
          <p
            style={{
              margin: '28px 0 0',
              color: '#aaa9a3',
              fontSize: 27,
              lineHeight: 1.4,
            }}
          >
            Keep state local, scope every tool, and inspect every execution path
            on infrastructure you control.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 26,
            color: '#777671',
            fontSize: 20,
            fontWeight: 400,
          }}
        >
          <span>Local &amp; on-edge</span>
          <span>·</span>
          <span>Durable state</span>
          <span>·</span>
          <span>Transparent control</span>
        </div>
      </div>
    ),
    size,
  );
}
