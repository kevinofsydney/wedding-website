'use client';

import Link from 'next/link';

export default function PatVideoPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #faf9f7 0%, #f5f3ef 50%, #efe9e3 100%)',
      fontFamily: 'Quicksand, -apple-system, sans-serif',
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');

        body {
          margin: 0;
          padding: 0;
        }
      `}</style>

      <div style={{
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 300,
            color: '#3d3a36',
            margin: '0 0 10px 0',
            letterSpacing: '0.05em',
          }}>
            Kevin <span style={{ color: '#c9a87c', margin: '0 15px' }}>✦</span> Wenona
          </h1>
          <p style={{
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '1.1rem',
            color: '#8a847b',
            fontWeight: 300,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            margin: '0',
          }}>
            Pat&apos;s Video
          </p>
        </div>

        {/* Video Container */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 40px auto',
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/lK2ZEZsRm-U"
            title="Pat's Wedding Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>

        {/* Back Button */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
        }}>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: 'white',
              color: '#3d3a36',
              textDecoration: 'none',
              borderRadius: '30px',
              fontFamily: 'Quicksand, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              border: '1px solid #d4cdc4',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c9a87c';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = '#c9a87c';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#3d3a36';
              e.currentTarget.style.borderColor = '#d4cdc4';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }}
          >
            ← Back to Timeline
          </Link>
        </div>

        {/* Decorative Element */}
        <div style={{
          textAlign: 'center',
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid #d4cdc4',
        }}>
          <div style={{
            color: '#c9a87c',
            fontSize: '2rem',
          }}>
            ✦
          </div>
        </div>
      </div>
    </div>
  );
}
