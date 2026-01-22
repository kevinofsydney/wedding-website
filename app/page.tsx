'use client';

import { useState, useEffect } from 'react';

export default function WeddingTimeline() {
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['getting-ready', 'pre-ceremony', 'ceremony', 'cocktails', 'reception'];
      const navHeight = 80;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= navHeight + 50 && rect.bottom > navHeight) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'getting-ready', label: 'Getting Ready' },
    { id: 'pre-ceremony', label: 'Pre-Ceremony' },
    { id: 'ceremony', label: 'Ceremony' },
    { id: 'cocktails', label: 'Cocktails' },
    { id: 'reception', label: 'Reception' }
  ];

  const sections = [
    {
      id: 'getting-ready',
      title: 'Getting Ready',
      time: '2:00 PM',
      icon: '✦',
      events: [
        {
          time: '2:00 PM',
          items: [
            { type: 'couple' as const, text: 'Groom party photography begins', detail: 'Photographer: Ash\n147/416 St Kilda Rd, Melbourne' },
            { type: 'couple' as const, text: 'Bride party photography begins', detail: 'Photographer: Barbara\n123/418 St Kilda Rd, Melbourne' }
          ]
        }
      ]
    },
    {
      id: 'pre-ceremony',
      title: 'Pre-Ceremony Photos',
      time: '3:30 PM',
      icon: '◈',
      events: [
        { time: '3:30 PM', items: [{ type: 'couple' as const, text: 'Arrive at venue' }] },
        { time: '3:40 PM', items: [{ type: 'couple' as const, text: 'First look', highlight: true }] },
        { time: '3:50 PM', items: [{ type: 'couple' as const, text: 'Couple photos' }] },
        { time: '4:15 PM', items: [{ type: 'couple' as const, text: 'Family photos', detail: "Groom's parents • Bride's parents • Both families together" }] },
        { time: '4:30 PM', items: [{ type: 'couple' as const, text: 'Wedding party photos', detail: 'Full bridal party • Groomsmen • Bridesmaids' }] },
        { time: '4:50 PM', items: [{ type: 'couple' as const, text: 'Final touch-ups' }] }
      ]
    },
    {
      id: 'ceremony',
      title: 'The Ceremony',
      time: '5:00 PM',
      icon: '❧',
      events: [
        { time: '5:00 PM', items: [{ type: 'guests' as const, text: 'Guests arrive' }] },
        { time: '5:15 PM', items: [{ type: 'all' as const, text: 'Ceremony begins', highlight: true }] },
        { time: '', items: [
          { type: 'couple' as const, text: 'Groom walks down aisle with both parents' },
          { type: 'couple' as const, text: 'Flower girls walk down aisle' },
          { type: 'couple' as const, text: 'Maid of honor walks down aisle with the dogs' }
        ]},
        { time: '', items: [
          { type: 'all' as const, text: 'Priest invites everyone to stand' },
          { type: 'couple' as const, text: 'Bride walks down aisle with both parents', highlight: true }
        ]},
        { time: '', items: [
          { type: 'all' as const, text: 'Exchange of vows & rings' },
          { type: 'all' as const, text: 'Service concludes' }
        ]},
        { time: '6:00 PM', items: [{ type: 'couple' as const, text: 'Private moment together', highlight: true }] }
      ]
    },
    {
      id: 'cocktails',
      title: 'Cocktails & Photos',
      time: '6:10 PM',
      icon: '◇',
      events: [
        { time: '6:10 PM', items: [
          { type: 'guests' as const, text: 'Cocktails begin in courtyard' },
          { type: 'couple' as const, text: 'Friend group photos' }
        ]},
        { time: '', items: [{ type: 'couple' as const, text: 'Photo groups', detail: 'Normanhurst boys • Camberwell girls • Live Nation • Wine Night • Lok extended family • Uni mates • Friends' }] }
      ]
    },
    {
      id: 'reception',
      title: 'The Reception',
      time: '7:05 PM',
      icon: '✧',
      events: [
        { time: '7:05 PM', items: [{ type: 'guests' as const, text: 'Guests enter reception' }] },
        { time: '7:40 PM', items: [{ type: 'all' as const, text: 'Bride & groom enter', highlight: true }] },
        { time: '7:45 PM', items: [{ type: 'all' as const, text: 'MC welcomes guests' }] },
        { time: '7:50 PM', items: [{ type: 'all' as const, text: 'Entrée canapés served' }] },
        { time: '8:00 PM', items: [{ type: 'all' as const, text: 'Speeches begin', detail: "Groom's dad • Bride's sister • Best man • Bridesmaid" }] },
        { time: '8:45 PM', items: [{ type: 'couple' as const, text: 'Cake cutting' }] },
        { time: '8:55 PM', items: [{ type: 'all' as const, text: 'Bride & groom speech' }] },
        { time: '9:05 PM', items: [{ type: 'all' as const, text: 'Yum Seng' }] },
        { time: '9:10 PM', items: [{ type: 'couple' as const, text: 'First dance', highlight: true }] },
        { time: '9:15 PM', items: [{ type: 'couple' as const, text: 'Parent dances' }] },
        { time: '9:20 PM', items: [{ type: 'all' as const, text: 'Dancefloor opens', highlight: true }] },
        { time: '10:15 PM', items: [{ type: 'all' as const, text: 'Supper served' }] },
        { time: '11:35 PM', items: [{ type: 'all' as const, text: 'Last dance' }] },
        { time: '11:45 PM', items: [{ type: 'guests' as const, text: 'Farewell' }] }
      ]
    }
  ];

  const typeStyles = {
    couple: { bg: 'rgba(134, 169, 134, 0.18)', border: '#7a9e7a', label: 'Kevin & Wenona' },
    guests: { bg: 'rgba(100, 140, 180, 0.15)', border: '#5a8abf', label: 'Guests' },
    all: { bg: 'rgba(191, 182, 173, 0.12)', border: '#b5ad9e', label: 'Everyone' }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #faf9f7 0%, #f5f3ef 50%, #efe9e3 100%)',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      color: '#3d3a36',
      padding: '0',
      overflowX: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Quicksand:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .nav-btn {
          background: transparent;
          border: 1px solid #d4cdc4;
          padding: 10px 20px;
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #6b665e;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 30px;
        }

        .nav-btn:hover, .nav-btn.active {
          background: #c9a87c;
          border-color: #c9a87c;
          color: #fff;
        }

        .timeline-section {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.8s ease forwards;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .event-card {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .event-card:hover {
          transform: translateX(8px);
        }

        .highlight-card {
          position: relative;
        }

        .highlight-card::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          background: #c9a87c;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(201, 168, 124, 0.5);
        }

        .section-icon {
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        .fixed-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(250, 249, 247, 0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #e5e0d8;
          padding: 16px 20px;
        }

        .nav-spacer {
          height: 70px;
        }

        @media (max-width: 768px) {
          .nav-btn { padding: 8px 12px; font-size: 9px; letter-spacing: 1px; }
          .fixed-nav { padding: 12px 10px; }
          .nav-spacer { height: 60px; }
        }
      `}</style>

      {/* Fixed Navigation */}
      <nav className="fixed-nav">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="nav-spacer" />

      {/* Header */}
      <header style={{
        textAlign: 'center',
        padding: '60px 20px 40px',
        position: 'relative'
      }}>
        <div style={{
          fontSize: '14px',
          fontFamily: "'Quicksand', sans-serif",
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#8a847b',
          marginBottom: '20px',
          fontWeight: '300'
        }}>
          The Wedding of
        </div>
        <h1 style={{
          fontSize: 'clamp(48px, 10vw, 72px)',
          fontWeight: '300',
          margin: '0 0 16px 0',
          letterSpacing: '2px',
          lineHeight: '1.1'
        }}>
          <span style={{ fontStyle: 'italic', fontWeight: '300' }}>Kevin</span>
          <span style={{
            display: 'inline-block',
            margin: '0 20px',
            fontSize: '0.5em',
            verticalAlign: 'middle',
            color: '#c9a87c'
          }}>✦</span>
          <span style={{ fontStyle: 'italic', fontWeight: '300' }}>Wenona</span>
        </h1>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #c9a87c, transparent)',
          margin: '30px auto'
        }} />
        <p style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '15px',
          letterSpacing: '3px',
          color: '#8a847b',
          fontWeight: '400'
        }}>
          Our Day, Moment by Moment
        </p>
      </header>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        padding: '10px 20px 50px',
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '12px',
        letterSpacing: '1px'
      }}>
        {Object.entries(typeStyles).map(([key, style]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: style.bg,
              border: `1px solid ${style.border}`,
              borderRadius: '4px'
            }} />
            <span style={{ color: '#6b665e' }}>{style.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 20px 100px',
        position: 'relative'
      }}>
        {sections.map((section, sectionIdx) => (
          <section
            key={section.id}
            id={section.id}
            className="timeline-section"
            style={{
              marginBottom: '70px',
              animationDelay: `${sectionIdx * 0.15}s`
            }}
          >
            {/* Section Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
              position: 'relative'
            }}>
              <div className="section-icon" style={{
                fontSize: '28px',
                color: '#c9a87c',
                marginBottom: '12px'
              }}>
                {section.icon}
              </div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '400',
                margin: '0 0 8px 0',
                fontStyle: 'italic'
              }}>
                {section.title}
              </h2>
              <div style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: '13px',
                letterSpacing: '2px',
                color: '#8a847b'
              }}>
                {section.time}
              </div>
            </div>

            {/* Events */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {section.events.map((event, eventIdx) => (
                <div key={eventIdx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px'
                }}>
                  {/* Time */}
                  <div style={{
                    width: '80px',
                    flexShrink: 0,
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '13px',
                    color: '#8a847b',
                    textAlign: 'right',
                    paddingTop: '12px',
                    letterSpacing: '0.5px'
                  }}>
                    {event.time}
                  </div>

                  {/* Event Cards */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    {event.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`event-card ${'highlight' in item && item.highlight ? 'highlight-card' : ''}`}
                        style={{
                          background: typeStyles[item.type].bg,
                          border: `1px solid ${typeStyles[item.type].border}`,
                          borderRadius: '8px',
                          padding: '14px 20px',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <div style={{
                          fontSize: '17px',
                          fontWeight: 'highlight' in item && item.highlight ? '500' : '400',
                          marginBottom: 'detail' in item && item.detail ? '6px' : '0',
                          color: 'highlight' in item && item.highlight ? '#3d3a36' : '#4a463f'
                        }}>
                          {item.text}
                        </div>
                        {'detail' in item && item.detail && (
                          <div style={{
                            fontFamily: "'Quicksand', sans-serif",
                            fontSize: '12px',
                            color: '#8a847b',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-line'
                          }}>
                            {item.detail}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '60px 20px',
        borderTop: '1px solid #e5e0d8'
      }}>
        <div style={{ fontSize: '24px', color: '#c9a87c', marginBottom: '20px' }}>❧</div>
        <p style={{
          fontStyle: 'italic',
          fontSize: '20px',
          color: '#6b665e',
          maxWidth: '400px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Thank you for being part of our special day
        </p>
      </footer>
    </div>
  );
}
