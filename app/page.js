// import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";

/* ===== Welcome Popup Component ===== */
function WelcomePopup({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    // Completely remove after 3.5 seconds
    const timer2 = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className={`${styles.popupOverlay} ${isFadingOut ? styles.fadeOut : ''}`}>
      <div className={styles.popupContent}>
        <div className={styles.popupLogoWrapper}>
          <Image src="/images/logo.png" alt="ARS Logo" width={80} height={80} className={styles.popupLogoImg} />
        </div>
        <h1 className={styles.popupTitle}>
          <span className="gradient-text">ARS</span>
        </h1>
        <p className={styles.popupSubtitle}>Academic &amp; Research Society</p>
        <div className={styles.popupQuoteBox}>
          <p className={styles.popupQuote}>&ldquo;Research is to see what everybody else has seen, and to think what nobody else has thought.&rdquo;</p>
          <p className={styles.popupQuoteAuthor}>&mdash; Albert Szent-Györgyi</p>
        </div>
        <div className={styles.popupLoader}>
          <div className={styles.popupLoaderBar}></div>
        </div>
      </div>
    </div>
  );
}

/* ===== Intersection Observer Hook for scroll animations ===== */
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(
      ".fade-in, .fade-in-left, .fade-in-right, .scale-in"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ===== Particle Background Component ===== */
function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(162, 155, 254, ${this.opacity})`;
        ctx.fill();
      }
    }

    function init() {
      resize();
      particles = Array.from({ length: 60 }, () => new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} />;
}

/* ===== Navigation ===== */
function Navigation({ theme, toggleTheme }) {
  return (
    <nav className={styles.nav} id="main-nav">
      <div className={styles.navInner}>
        <div className={styles.navLogo}>
          <Image src="/images/logo.png" alt="ARS Logo" width={32} height={32} className={styles.navLogoImg} />
          <span className={styles.navLogoText}>ARS <sub>HITMS</sub></span>
        </div>
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#vision" className={styles.navLink}>Vision</a>
          <a href="#objectives" className={styles.navLink}>Objectives</a>
          <a href="#activities" className={styles.navLink}>Activities</a>
          <a href="#timeline" className={styles.navLink}>Timeline</a>
          <a href="#team" className={styles.navLink}>Team</a>
          <a href="#sdgs" className={styles.navLink}>SDGs</a>
        </div>
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

/* ===== Section 1: Welcome Popup ===== */
function WelcomeSection() {
  return (
    <section className={`${styles.welcome} section`} id="welcome">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="grid-bg" />
      <div className={styles.heroTorus} />
      <div className={styles.heroTorus2} />
      <div className={`section-inner ${styles.welcomeInner}`}>
        <div className={`${styles.welcomeBadge} fade-in`}>
          <span className={styles.welcomeBadgeDot} />
          Grand Inauguration 2026
        </div>
        <h1 className={`${styles.welcomeTitle} fade-in delay-1`}>
          Welcome to the
          <br />
          <span className="gradient-text">Academic &amp; Research</span>
          <br />
          Society
        </h1>
        <p className={`${styles.welcomeSubtitle} fade-in delay-2`}>
          Empowering minds. Fostering innovation. Building tomorrow&apos;s scholars.
        </p>
        <div className={`${styles.welcomeCtas} fade-in delay-3`}>
          <a href="#about" className={styles.ctaPrimary} id="explore-btn">
            Explore
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3L13 8L8 13M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#team" className={styles.ctaSecondary} id="team-btn">
            Meet the Team
          </a>
        </div>
      </div>
      <div className={styles.heroGraphic}>
        <div className={styles.heroRing} />
        <div className={styles.heroRing2} />
        <div className={styles.heroRing3} />
      </div>
    </section>
  );
}

/* ===== Section 2: Hero ===== */
function HeroSection() {
  const stats = [
    { number: "Pending", label: "Research Papers" },
    { number: "10+", label: "Active Members" },
    { number: "1+", label: "Workshops" },
    { number: "5+", label: "Collaborations" },
  ];

  return (
    <section className={`${styles.hero} section`} id="hero">
      <div className="bg-orb bg-orb-3" />
      <div className="grid-bg" />
      <div className="section-inner">
        <div className={styles.heroStats}>
          {stats.map((stat, i) => (
            <div key={i} className={`glass-card ${styles.statCard} fade-in delay-${i + 1}`}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
        <div className={`${styles.heroQuote} fade-in delay-5`}>
          <blockquote>
            &ldquo;Research is to see what everybody else has seen, and to think what nobody else has thought.&rdquo;
          </blockquote>
          <cite>— Albert Szent-Györgyi</cite>
        </div>
      </div>
    </section>
  );
}

/* ===== Section 3: Introduction / About ===== */
function AboutSection() {
  return (
    <section className={`${styles.about} section`} id="about">
      <div className="bg-orb bg-orb-1" />
      <div className={styles.donut3D} style={{ width: '220px', height: '220px', top: '10%', right: '5%', borderWidth: '50px' }} />
      <div className="section-inner">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutContent}>
            <span className="section-label fade-in">About Us</span >
            <h2 className="section-title fade-in delay-1">
              Introducing the <span className="gradient-text">Academic &amp; Research Society</span>
            </h2>
            <p className="section-subtitle fade-in delay-2">
              The Academic &amp; Research Society  (ARS) is a student-led initiative dedicated to cultivating a vibrant research culture within our university. We bridge the gap between classroom learning and real-world research, equipping students with the skills, mentorship, and opportunities they need to excel.
            </p>
            <p className={`${styles.aboutExtra} fade-in delay-3`}>
              Founded with the vision of creating a collaborative ecosystem, ARS provides a platform where curiosity meets rigor, and ideas transform into impactful research contributions.
            </p>
          </div>
          <div className={`${styles.aboutVisual} fade-in-right delay-2`}>
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardIcon}>🔬</div>
              <h3>Research First</h3>
              <p>Hands-on research experience from day one</p>
            </div>
            <div className={`${styles.aboutCard} ${styles.aboutCardOffset}`}>
              <div className={styles.aboutCardIcon}>🤝</div>
              <h3>Collaboration</h3>
              <p>Cross-disciplinary partnerships &amp; mentorship</p>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardIcon}>🚀</div>
              <h3>Innovation</h3>
              <p>Turning bold ideas into real-world impact</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Section 4: Vision & Mission ===== */
function VisionMissionSection() {
  return (
    <section className={`${styles.visionMission} section`} id="vision">
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="grid-bg" />
      <div className={styles.neonTorus} style={{ width: '180px', height: '180px', bottom: '15%', left: '8%' }} />
      <div className="section-inner">
        <div className={styles.vmHeader}>
          <span className="section-label fade-in">Our Purpose</span>
          <h2 className="section-title fade-in delay-1">
            Vision &amp; <span className="gradient-text">Mission</span>
          </h2>
        </div>
        <div className={styles.vmGrid}>
          <div className={`glass-card ${styles.vmCard} fade-in delay-2`}>
            <div className={styles.vmCardHeader}>
              <div className={styles.vmIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className={styles.vmTitle}>Our Vision</h3>
            </div>
            <p className={styles.vmText}>
              To be a leading student research society that inspires intellectual curiosity, fosters innovation, and prepares future thought leaders who contribute meaningfully to global knowledge and sustainable development.
            </p>
            <div className={styles.vmHighlight}>
              &ldquo;Shaping minds that shape the future&rdquo;
            </div>
          </div>
          <div className={`glass-card ${styles.vmCard} fade-in delay-3`}>
            <div className={styles.vmCardHeader}>
              <div className={styles.vmIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className={styles.vmTitle}>Our Mission</h3>
            </div>
            <ul className={styles.vmList}>
              <li>Promote a research-driven academic culture among students and faculty</li>
              <li>Provide mentorship, workshops, and resources for emerging researchers</li>
              <li>Facilitate interdisciplinary collaboration and knowledge exchange</li>
              <li>Align academic efforts with national and global sustainable development goals</li>
              <li>Create opportunities for publication, presentation, and professional growth</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Section 5: Objectives ===== */
function ObjectivesSection() {
  const objectives = [
    { icon: "📚", title: "Academic Excellence", desc: "Promote high-quality research publications and presentations at national and international forums." },
    { icon: "🧠", title: "Critical Thinking", desc: "Develop analytical and critical thinking skills through structured research methodology workshops." },
    { icon: "🌐", title: "Global Network", desc: "Build partnerships with international research institutions and academic organizations." },
    { icon: "💡", title: "Innovation Hub", desc: "Create a platform for innovative ideas and interdisciplinary research projects." },
    { icon: "📊", title: "Data Literacy", desc: "Enhance data analysis capabilities and research skills among university students." },
    { icon: "🏆", title: "Recognition", desc: "Recognize and reward outstanding research contributions by students and faculty." },
  ];

  return (
    <section className={`${styles.objectives} section`} id="objectives">
      <div className="bg-orb bg-orb-1" />
      <div className={styles.toroid} style={{ width: '300px', height: '300px', top: '20%', left: '-5%' }} />
      <div className={styles.toroid} style={{ width: '200px', height: '200px', top: '25%', left: '-2%', borderStyle: 'double', borderWidth: '4px' }} />
      <div className="section-inner">
        <div className={styles.objectivesHeader}>
          <span className="section-label fade-in">What We Aim For</span>
          <h2 className="section-title fade-in delay-1">
            Our <span className="gradient-text">Key Objectives</span>
          </h2>
          <p className="section-subtitle fade-in delay-2">
            Driving academic growth through structured goals and impactful initiatives.
          </p>
        </div>
        <div className={styles.objectivesGrid}>
          {objectives.map((obj, i) => (
            <div key={i} className={`glass-card ${styles.objCard} fade-in delay-${Math.min(i + 1, 6)}`}>
              <div className={styles.objIcon}>{obj.icon}</div>
              <h3 className={styles.objTitle}>{obj.title}</h3>
              <p className={styles.objDesc}>{obj.desc}</p>
              <div className={styles.objNumber}>{String(i + 1).padStart(2, "0")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Section 6: Activities ===== */
function ActivitiesSection() {
  const activities = [
    {
      icon: "🎤",
      title: "Seminars & Conferences",
      desc: "Regular academic seminars featuring guest speakers, panel discussions, and paper presentations on cutting-edge research topics.",
      tag: "Events",
    },
    {
      icon: "🛠️",
      title: "Research Workshops",
      desc: "Intensive hands-on workshops on research methodology, academic writing, data analysis, and publication strategies.",
      tag: "Training",
    },
    {
      icon: "📖",
      title: "Journal Club",
      desc: "Bi-weekly journal reading sessions where members critically analyze and discuss latest research papers in their fields.",
      tag: "Learning",
    },
    {
      icon: "🏅",
      title: "Research Competitions",
      desc: "Annual and semester-based research competitions and poster presentations to showcase student research achievements.",
      tag: "Competition",
    },
    {
      icon: "🤖",
      title: "Tech & Innovation Labs",
      desc: "Access to collaborative spaces and tools for conducting experiments, building prototypes, and working on projects.",
      tag: "Innovation",
    },
    {
      icon: "🌍",
      title: "Community Outreach",
      desc: "Apply research findings to solve real-world community problems through service-learning and outreach programs.",
      tag: "Impact",
    },
  ];

  return (
    <section className={`${styles.activities} section`} id="activities">
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="grid-bg" />
      <div className={styles.donut3D} style={{ width: '150px', height: '150px', bottom: '10%', right: '10%', borderWidth: '30px' }} />
      <div className="section-inner">
        <div className={styles.activitiesHeader}>
          <span className="section-label fade-in">What We Do</span>
          <h2 className="section-title fade-in delay-1">
            Our <span className="gradient-text">Activities</span>
          </h2>
          <p className="section-subtitle fade-in delay-2">
            Engaging programs designed to nurture researchers at every stage of their academic journey.
          </p>
        </div>
        <div className={styles.activitiesGrid}>
          {activities.map((act, i) => (
            <div key={i} className={`glass-card ${styles.actCard} fade-in delay-${Math.min(i + 1, 6)}`}>
              <div className={styles.actTag}>{act.tag}</div>
              <div className={styles.actIcon}>{act.icon}</div>
              <h3 className={styles.actTitle}>{act.title}</h3>
              <p className={styles.actDesc}>{act.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Section 7: Timeline / Future Plans ===== */
function TimelineSection() {
  const plans = [
    { quarter: "Q2 2026", title: "Foundation & Launch", items: ["Society Inauguration Ceremony", "First General Body Meeting", "Core Team Formation & Role Assignment"] },
    { quarter: "Q3 2026", title: "Building Momentum", items: ["Research Methodology Workshop Series", "Launch of Journal Club", "Database of Research Interests"] },
    { quarter: "Q4 2026", title: "Expanding Horizons", items: ["First Annual Research Conference", "Inter-University Collaboration Program", "Student Research Grant Initiative"] },
    { quarter: "Q1 2027", title: "Innovation & Impact", items: ["Research Innovation Lab Launch", "Community Research Project", "International Partnership Agreements"] },
    { quarter: "Q2 2027", title: "Recognition & Growth", items: ["Annual Research Awards Ceremony", "ARS Research Journal Publication", "Mentorship Program Expansion"] },
  ];

  return (
    <section className={`${styles.timeline} section`} id="timeline">
      <div className="bg-orb bg-orb-1" />
      <div className={styles.neonTorus} style={{ width: '250px', height: '250px', top: '30%', right: '-5%', opacity: 0.5 }} />
      <div className="section-inner">
        <div className={styles.timelineHeader}>
          <span className="section-label fade-in">Roadmap</span>
          <h2 className="section-title fade-in delay-1">
            Future <span className="gradient-text">Plans</span>
          </h2>
          <p className="section-subtitle fade-in delay-2">
            A strategic roadmap for building a world-class research community.
          </p>
        </div>
        <div className={styles.timelineTrack}>
          <div className={styles.timelineLine} />
          {plans.map((plan, i) => (
            <div key={i} className={`${styles.timelineItem} ${i % 2 === 1 ? styles.timelineItemRight : ""} fade-in delay-${Math.min(i + 1, 6)}`}>
              <div className={styles.timelineDot}>
                <div className={styles.timelineDotInner} />
              </div>
              <div className={`glass-card ${styles.timelineCard}`}>
                <span className={styles.timelineQuarter}>{plan.quarter}</span>
                <h3 className={styles.timelineTitle}>{plan.title}</h3>
                <ul className={styles.timelineList}>
                  {plan.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Section 8: Team Members ===== */
function TeamSection() {
  const team = [
    { name: "Dr. Asad Raza", role: "Faculty Advisor", img: "/images/sir_asad.png", quote: "Guiding future innovators through research, knowledge, and academic excellence." },
    { name: "Ahmed Asghar Memon", role: "Co Faculty Advisor", img: "/images/Ahmad.png", quote: "Supporting students in their academic journey by fostering innovation, critical thinking, and practical learning." },
    { name: "Saad Kaimkhani", role: "President", img: "/images/president.png", quote: "Turning ideas into impactful leadership with vision and determination." },
    { name: "Hooriya Shaikh", role: "Senior Vice President", img: "/images/coordinator.png", quote: "Empowering teams with leadership, dedication, and problem-solving skills." },
    { name: "Faraz Ali", role: "Vice President", img: "/images/vice_president.png", quote: "Building strong teamwork through innovation, strategy, and collaboration." },
    { name: "Simran-un-Nisa", role: "General Secretary", img: "/images/image.png", quote: "Maintaining coordination and smooth communication in every activity." },
    { name: "Muhammad Hasan ", role: "General Secretary", img: "/images/secretary.png", quote: "Keeping every task organized, efficient, and professionally managed." },
    { name: "Shahriyar Ali ", role: "Treasurer", img: "/images/Sh.png", quote: "Managing finances responsibly to ensure growth, stability, and success." },
    { name: "Abdul Rehman Ul Haq", role: "Social Media Manager", img: "/images/social.png", quote: "Creating digital engagement through creativity, trends, and communication." },
    { name: "Raj Surmeda", role: "Web & Design Coordinator", img: "/images/Raju.png", quote: "Designing modern digital experiences through creativity and technology." },

  ];

  return (
    <section className={`${styles.team} section`} id="team">
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="grid-bg" />
      <div className={styles.donut3D} style={{ width: '350px', height: '350px', top: '5%', left: '-10%', borderWidth: '80px', opacity: 0.4 }} />
      <div className="section-inner">
        <div className={styles.teamHeader}>
          <span className="section-label fade-in">The People</span>
          <h2 className="section-title fade-in delay-1">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="section-subtitle fade-in delay-2">
            Passionate individuals driving the vision of the Academic &amp; Research Society.
          </p>
        </div>
        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <div key={i} className={`glass-card ${styles.teamCard} fade-in delay-${Math.min(i + 1, 6)}`}>
              <div className={styles.teamImgWrapper}>
                <Image
                  src={member.img}
                  alt={member.name}
                  width={200}
                  height={200}
                  className={styles.teamImg}
                />
                <div className={styles.teamImgRing} />
              </div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <span className={styles.teamRole}>{member.role}</span>
              <p className={styles.teamQuote}>&ldquo;{member.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Section 9: PLOs & SDGs ===== */
function SDGsSection() {
  const sdgs = [
    { num: 4, title: "Quality Education", desc: "Ensuring inclusive, equitable, and quality education through research-driven learning.", color: "#c5192d" },
    { num: 9, title: "Industry, Innovation & Infrastructure", desc: "Building resilient infrastructure and fostering innovation through research.", color: "#f36d25" },
    { num: 10, title: "Reduced Inequalities", desc: "Promoting equal opportunities in research and academic participation.", color: "#dd1367" },
    { num: 17, title: "Partnerships for the Goals", desc: "Strengthening global partnerships for sustainable research and knowledge exchange.", color: "#19486a" },
  ];

  const plos = [
    { code: "PLO 1", title: "Knowledge", desc: "Deep understanding of discipline-specific knowledge through research engagement." },
    { code: "PLO 2", title: "Critical Thinking", desc: "Ability to analyze, evaluate, and synthesize information from multiple sources." },
    { code: "PLO 3", title: "Communication", desc: "Effective written and oral communication of research findings and ideas." },
    { code: "PLO 4", title: "Ethics", desc: "Adherence to ethical standards in research, data collection, and publication." },
  ];

  return (
    <section className={`${styles.sdgs} section`} id="sdgs">
      <div className="bg-orb bg-orb-1" />
      <div className={styles.toroid} style={{ width: '400px', height: '400px', bottom: '10%', right: '-10%', opacity: 0.6 }} />
      <div className="section-inner">
        <div className={styles.sdgsHeader}>
          <span className="section-label fade-in">Alignment</span>
          <h2 className="section-title fade-in delay-1">
            PLOs &amp; <span className="gradient-text">SDGs</span>
          </h2>
          <p className="section-subtitle fade-in delay-2">
            Our initiatives are strategically aligned with Program Learning Outcomes and UN Sustainable Development Goals.
          </p>
        </div>

        <div className={styles.sdgsRow}>
          <div className={styles.sdgsCol}>
            <h3 className={`${styles.sdgsSubheading} fade-in delay-2`}>
              <span className={styles.sdgsSubIcon}>🎯</span>
              Program Learning Outcomes
            </h3>
            <div className={styles.ploGrid}>
              {plos.map((plo, i) => (
                <div key={i} className={`glass-card ${styles.ploCard} fade-in delay-${Math.min(i + 2, 6)}`}>
                  <span className={styles.ploCode}>{plo.code}</span>
                  <h4 className={styles.ploTitle}>{plo.title}</h4>
                  <p className={styles.ploDesc}>{plo.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sdgsCol}>
            <h3 className={`${styles.sdgsSubheading} fade-in delay-2`}>
              <span className={styles.sdgsSubIcon}>🌍</span>
              Sustainable Development Goals
            </h3>
            <div className={styles.sdgGrid}>
              {sdgs.map((sdg, i) => (
                <div key={i} className={`glass-card ${styles.sdgCard} fade-in delay-${Math.min(i + 2, 6)}`} style={{ "--sdg-color": sdg.color }}>
                  <div className={styles.sdgNum}>{sdg.num}</div>
                  <h4 className={styles.sdgTitle}>{sdg.title}</h4>
                  <p className={styles.sdgDesc}>{sdg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Section 10: Closing / Thank You ===== */
function ClosingSection() {
  return (
    <section className={`${styles.closing} section`} id="closing">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="grid-bg" />
      <div className={styles.neonTorus} style={{ width: '150px', height: '150px', top: '20%', left: '15%' }} />
      <div className={`section-inner ${styles.closingInner}`}>
        <div className={`${styles.closingEmoji} scale-in`}>🎓</div>
        <h2 className={`${styles.closingTitle} fade-in delay-1`}>
          Thank You for <span className="gradient-text">Joining Us</span>
        </h2>
        <p className={`${styles.closingText} fade-in delay-2`}>
          Together, we embark on a journey of discovery, innovation, and academic excellence. The Academic &amp; Research Society is more than an organization — it&apos;s a movement to empower the next generation of researchers and thought leaders.
        </p>
        <div className={`${styles.closingCta} fade-in delay-3`}>
          <a href="#welcome" className={styles.ctaPrimary} id="back-top-btn">
            Back to Top
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13L8 3M8 3L3 8M8 3L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <div className={`${styles.closingMeta} fade-in delay-4`}>
          <p>Academic &amp; Research Society &copy; 2026</p>
          <p>Inauguration Ceremony</p>
        </div>
      </div>
    </section>
  );
}

/* ===== Main Page ===== */
export default function Home() {
  const [showPopup, setShowPopup] = useState(true);
  const [theme, setTheme] = useState("dark"); // Default to dark

  useScrollAnimation();

  useEffect(() => {
    // Apply theme to html element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {showPopup && <WelcomePopup onComplete={() => setShowPopup(false)} />}
      <ParticleBackground />
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <main>
        <WelcomeSection />
        <HeroSection />
        <AboutSection />
        <VisionMissionSection />
        <ObjectivesSection />
        <ActivitiesSection />
        <TimelineSection />
        <TeamSection />
        <SDGsSection />
        <ClosingSection />
      </main>
    </>
  );
}
