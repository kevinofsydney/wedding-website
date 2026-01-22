'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeddingTimeline() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [showPreCeremony, setShowPreCeremony] = useState(false);
  const [activeTypes, setActiveTypes] = useState<string[]>(['couple', 'guests', 'all']);
  const [isScrolling, setIsScrolling] = useState(false);

  // Load filter preferences from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('weddingFilters');
    if (savedFilters) {
      try {
        const { activeTypes: saved, showPreCeremony: savedPre } = JSON.parse(savedFilters);
        if (saved && Array.isArray(saved) && saved.length > 0) {
          setActiveTypes(saved);
        }
        if (typeof savedPre === 'boolean') {
          setShowPreCeremony(savedPre);
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Save filter preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('weddingFilters', JSON.stringify({ activeTypes, showPreCeremony }));
  }, [activeTypes, showPreCeremony]);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 130;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
  };

  const jumpToCurrentTime = () => {
    setIsScrolling(true);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const timeRanges = [
      { id: 'getting-ready', start: 14 * 60, end: 15 * 60 + 30 },
      { id: 'pre-ceremony', start: 15 * 60 + 30, end: 17 * 60 },
      { id: 'ceremony', start: 17 * 60, end: 18 * 60 + 10 },
      { id: 'cocktails', start: 18 * 60 + 10, end: 19 * 60 + 5 },
      { id: 'reception', start: 19 * 60 + 5, end: 23 * 60 + 45 }
    ];

    const currentSection = timeRanges.find(
      range => currentTime >= range.start && currentTime < range.end
    );

    if (currentSection) {
      if (['getting-ready', 'pre-ceremony'].includes(currentSection.id) && !showPreCeremony) {
        setShowPreCeremony(true);
        setTimeout(() => {
          scrollToSection(currentSection.id);
          setTimeout(() => setIsScrolling(false), 500);
        }, 100);
      } else {
        scrollToSection(currentSection.id);
        setTimeout(() => setIsScrolling(false), 500);
      }
    } else {
      scrollToSection('ceremony');
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const resetFilters = () => {
    setActiveTypes(['couple', 'guests', 'all']);
    setShowPreCeremony(false);
  };

  const toggleTypeFilter = (type: string) => {
    if (activeTypes.includes(type)) {
      if (activeTypes.length > 1) {
        setActiveTypes(activeTypes.filter(t => t !== type));
      }
    } else {
      setActiveTypes([...activeTypes, type]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['getting-ready', 'pre-ceremony', 'ceremony', 'cocktails', 'reception'];
      const navHeight = 140;

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

        .legend-filter {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .legend-filter:hover {
          background: rgba(201, 168, 124, 0.1);
          transform: translateY(-2px);
        }

        .legend-filter.inactive {
          opacity: 0.4;
          transform: scale(0.95);
        }

        .legend-filter.inactive:hover {
          opacity: 0.7;
          transform: scale(0.98);
        }

        .hero-image {
          width: 100%;
          height: 400px;
          background-size: cover;
          background-position: center;
          position: relative;
          margin-top: 130px !important;
        }

        @media (max-width: 768px) {
          .hero-image {
            height: 350px;
            margin-top: 165px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-image {
            height: 300px;
            margin-top: 185px !important;
          }
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
          height: 130px;
        }

        @media (max-width: 768px) {
          .nav-btn {
            padding: 7px 10px;
            font-size: 9px;
            letter-spacing: 0.8px;
            white-space: nowrap;
          }
          .fixed-nav { padding: 10px 8px; }
          .nav-spacer { height: 165px; }
          .legend-filter {
            padding: 6px 8px;
            gap: 6px;
          }
          .legend-filter span {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .nav-btn {
            padding: 6px 8px;
            font-size: 8px;
            letter-spacing: 0.5px;
          }
          .nav-spacer { height: 185px; }
        }
      `}</style>

      {/* Fixed Navigation */}
      <nav className="fixed-nav">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {/* Action Buttons Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <button
              className="nav-btn"
              onClick={() => setShowPreCeremony(!showPreCeremony)}
              style={{
                background: showPreCeremony ? '#c9a87c' : 'transparent',
                borderColor: showPreCeremony ? '#c9a87c' : '#d4cdc4',
                color: showPreCeremony ? '#fff' : '#6b665e'
              }}
            >
              {showPreCeremony ? 'Hide' : 'Show'} Bridal Party
            </button>
            <button
              className="nav-btn"
              onClick={jumpToCurrentTime}
              style={{
                background: isScrolling ? '#c9a87c' : 'transparent',
                borderColor: isScrolling ? '#c9a87c' : '#d4cdc4',
                color: isScrolling ? '#fff' : '#6b665e'
              }}
            >
              ⏱ Jump to Now
            </button>
            <button
              className="nav-btn"
              onClick={resetFilters}
              title="Reset all filters to default"
            >
              ↺ Reset Filters
            </button>
            <Link
              href="/video"
              className="nav-btn"
              style={{
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              📹 Watch Video
            </Link>
          </div>

          {/* Section Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            {navItems
              .filter(item => showPreCeremony || !['getting-ready', 'pre-ceremony'].includes(item.id))
              .map((item) => (
                <button
                  key={item.id}
                  className={`nav-btn ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}
          </div>
        </div>
      </nav>

      {/* Header */}
      <header style={{
        textAlign: 'center',
        padding: '0',
        position: 'relative',
        marginTop: '0'
      }}>
        {/* Hero Image - starts right below fixed nav */}
        <div
          className="hero-image"
          style={{
            backgroundImage: 'url(/hero-image.jpeg)',
            marginTop: '0',
            marginBottom: '40px'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to top, #faf9f7, transparent)'
          }} />
        </div>

        <div style={{
          padding: '0 20px 40px',
          marginTop: '-40px'
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
          fontWeight: '400',
          marginBottom: '30px'
        }}>
          Our Day, Moment by Moment
        </p>
        <div style={{
          fontFamily: "'Quicksand', sans-serif",
          fontSize: '14px',
          color: '#6b665e',
          lineHeight: '1.8',
          marginTop: '20px'
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#c9a87c',
            marginBottom: '10px',
            fontWeight: '500'
          }}>
            Venue
          </div>
          <div style={{ fontWeight: '500', fontSize: '16px' }}>The Commons Collective</div>
          <div style={{ fontSize: '13px', color: '#8a847b', marginTop: '5px' }}>17 Moubray St, Melbourne VIC 3004</div>
          <a
            href="https://maps.app.goo.gl/f5NEcSg9awAdt1jh8"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '12px',
              padding: '8px 20px',
              background: 'transparent',
              border: '1px solid #c9a87c',
              borderRadius: '25px',
              color: '#c9a87c',
              textDecoration: 'none',
              fontSize: '12px',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#c9a87c';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#c9a87c';
            }}
          >
            📍 View on Google Maps
          </a>
        </div>
        </div>
      </header>

      {/* Legend - Clickable Filters */}
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
        {Object.entries(typeStyles).map(([key, style]) => {
          const isActive = activeTypes.includes(key);
          return (
            <button
              key={key}
              onClick={() => toggleTypeFilter(key)}
              className={`legend-filter ${!isActive ? 'inactive' : ''}`}
              title={`Click to ${isActive ? 'hide' : 'show'} ${style.label} events`}
            >
              <div style={{
                width: '24px',
                height: '24px',
                background: style.bg,
                border: `2px solid ${style.border}`,
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                color: '#6b665e',
                fontWeight: isActive ? '500' : '400'
              }}>
                {style.label}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{
        textAlign: 'center',
        fontSize: '11px',
        fontFamily: "'Quicksand', sans-serif",
        color: '#8a847b',
        marginTop: '-35px',
        marginBottom: '35px',
        letterSpacing: '1px'
      }}>
        Click to filter events by group
      </div>

      {/* Timeline */}
      <main style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 20px 100px',
        position: 'relative'
      }}>
        {sections
          .filter(section => showPreCeremony || !['getting-ready', 'pre-ceremony'].includes(section.id))
          .map((section, sectionIdx) => {
            const filteredEvents = section.events.map(event => ({
              ...event,
              items: event.items.filter(item => activeTypes.includes(item.type))
            })).filter(event => event.items.length > 0);

            if (filteredEvents.length === 0) return null;

            return (
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
              {filteredEvents.map((event, eventIdx) => (
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
            );
          })}
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
