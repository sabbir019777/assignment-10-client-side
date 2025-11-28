import React, { useEffect, useRef } from "react";
import { FaClock, FaDollarSign, FaThumbsUp, FaHeadset, FaShieldAlt, FaRoad } from "react-icons/fa";

const features = [
  { icon: <FaClock />, title: "Easy Booking", description: "Book your preferred car within minutes with our intuitive booking system." },

  { icon: <FaDollarSign />, title: "Affordable Rates", description: "Get competitive rental prices without compromising on quality and luxury." },

  { icon: <FaThumbsUp />, title: "Trusted Providers", description: "All cars are listed by verified and trusted providers for a secure experience." },

  { icon: <FaHeadset />, title: "24/7 Support", description: "Our dedicated support team is always ready to assist you, anytime, anywhere." },

  { icon: <FaShieldAlt />, title: "Secure Payments", description: "Your transactions are protected with top-notch encryption and secure gateways." },
  
  { icon: <FaRoad />, title: "Wide Selection", description: "Choose from a wide range of cars to suit your needs and preferences." },
];


const marqueeFeatures = [...features, ...features]; 

const FeaturesSection = () => {
  const marqueeRef = useRef(null); 

  useEffect(() => {

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.querySelectorAll('.floating-orb').forEach((el, idx) => {
        const speed = 0.5 + idx * 0.2;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      const pattern = document.querySelector('.bg-pattern');
      if (pattern) pattern.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    };
    document.addEventListener('mousemove', handleMouseMove);

    // 2. Marquee Hover Pause Effect

    const currentMarquee = marqueeRef.current;
    if (currentMarquee) {
      currentMarquee.addEventListener('mouseenter', () => currentMarquee.classList.add('paused'));
      currentMarquee.addEventListener('mouseleave', () => currentMarquee.classList.remove('paused'));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      if (currentMarquee) {
        currentMarquee.removeEventListener('mouseenter', () => currentMarquee.classList.add('paused'));
        currentMarquee.removeEventListener('mouseleave', () => currentMarquee.classList.remove('paused'));
      }
    };
  }, []);

  return (
    <section style={styles.section}>
      <div style={styles.bgPattern} className="bg-pattern"></div>
      <div style={{ ...styles.orb, ...styles.orb1 }} className="floating-orb"></div>
      <div style={{ ...styles.orb, ...styles.orb2 }} className="floating-orb"></div>
      <div style={{ ...styles.orb, ...styles.orb3 }} className="floating-orb"></div>

      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Why Rent With Us</h2>
          <div style={styles.divider}></div>
          <p style={styles.description}>
            We provide premiums car rentals with unmatched convenience, security, and luxury experiences.
          </p>
        </div>

      
        <div style={styles.marqueeWrapper}>
          <div style={styles.marqueeContent} className="features-marquee" ref={marqueeRef}>
            {marqueeFeatures.map((f, i) => (
              <div
                key={i}
          
                style={{ ...styles.card, flexShrink: 0, width: '320px', margin: '0 15px' }} 
                className="feature-card"
              >
                <div style={styles.icon} className="feature-icon">{f.icon}</div>
                <h3 style={styles.cardTitle}>{f.title}</h3>
                <p style={styles.cardDesc}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom Accent */}
        <div style={styles.bottomAccent}>
          <div style={styles.accentLine}></div>
        </div>
      </div>

      <style>
        {`
        /* --------------------------------- */
        /* --- Marquee Scrolling CSS --- */
        /* --------------------------------- */

        .features-marquee {
          display: flex; 
          animation: marquee 30s linear infinite; 
          width: fit-content; 
          padding: 10px 0; 
        }

        .features-marquee.paused {
          animation-play-state: paused; 
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        
        /* --------------------------------- */
        /* --- Hover and Responsive (Existing) --- */
        /* --------------------------------- */
        
        /* Hover problem fix: Ensure transition is smooth */
        .feature-card {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      box-shadow 0.4s ease, 
                      background 0.4s ease;
        }

        .feature-card:hover {
          /* হোভার করলে কার্ড উপরে উঠবে এবং স্কেল হবে */
          transform: translateY(-15px) scale(1.05); 
          box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3), 0 10px 20px rgba(255, 105, 180, 0.3);
          background: rgba(40,40,40,0.9);
        }
        .feature-icon {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .feature-card:hover .feature-icon {
          transform: scale(1.2) rotate(10deg);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 105, 180, 0.5);
        }
        
        @media (max-width: 640px) {
          .feature-card {
            padding: 30px 20px;
            width: 250px !important; 
            margin: 0 10px !important;
          }
          .feature-icon {
            width: 70px;
            height: 70px;
            font-size: 1.8rem;
          }
        }
        `}
      </style>
    </section>
  );
};

// Inline style

const styles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #111 0%, #000 100%)',
    overflow: 'hidden',
    padding: '80px 20px',
  },
  bgPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.1,
    backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 105, 180, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 20, 147, 0.2) 0%, transparent 50%)',
    backgroundSize: '400px 400px',
    backgroundPosition: '0 0, 200px 200px, 400px 100px',
    animation: 'pattern-move 20s ease-in-out infinite',
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.2,
    animation: 'float 25s infinite ease-in-out',
  },
  orb1: { width: '400px', height: '400px', background: 'linear-gradient(135deg, #FFD700, #FF69B4)', top: '-200px', left: '-100px' },
  orb2: { width: '500px', height: '500px', background: 'linear-gradient(135deg, #FF69B4, #FF1493)', bottom: '-250px', right: '-200px', animationDelay: '5s' },
  orb3: { width: '350px', height: '350px', background: 'linear-gradient(135deg, #FF1493, #8A2BE2)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animationDelay: '10s' },
  container: { position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', textAlign: 'center' },
  
  
  header: { marginBottom: '120px' }, 

  title: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '20px', background: 'linear-gradient(90deg, #FFD700, #FF69B4, #FF1493)', WebkitBackgroundClip: 'text', color: 'transparent', textTransform: 'uppercase', letterSpacing: '2px' },
  divider: { width: '80px', height: '4px', background: 'linear-gradient(90deg, #FFD700, #FF69B4)', margin: '0 auto 30px', borderRadius: '2px' },
  description: { fontSize: '1.2rem', color: '#ccc', maxWidth: '700px', margin: '0 auto' },
  
  
  marqueeWrapper: {
    overflow: 'hidden', 
    width: '100%',
    marginBottom: '60px',
    paddingTop: '30px', 
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', 
  },
  marqueeContent: {
    display: 'flex',
  },
  
  grid: { display: 'none' }, 
  card: {
    position: 'relative',
    background: 'rgba(30,30,30,0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '40px 30px',
    textAlign: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  icon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 25px',
    background: 'linear-gradient(135deg, #FFD700, #FF69B4)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
  },
  cardTitle: { fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px', color: '#fff' },

  cardDesc: { fontSize: '1rem', color: '#aaa', lineHeight: 1.6 },

  bottomAccent: { marginTop: '60px', textAlign: 'center' },

  accentLine: { height: '2px', width: '200px', background: 'linear-gradient(90deg, transparent, #FFD700, transparent)', margin: '0 auto', borderRadius: '1px' },
};

export default FeaturesSection;