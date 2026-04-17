import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';

const LETTERS = "Marché de Mo'".split('');
const TAGLINE = 'Supermarché du Monde';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="mdm-preloader"
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
      }}
    >
      <div className="preloader__bg">
        <div className="preloader__grain" />
        <div className="preloader__radial" />
      </div>

      <div className="preloader__content">
        {/* Decorative icons */}
        <motion.div
          className="preloader__icons"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="preloader__icon">🥩</span>
          <span className="preloader__icon-dot" />
          <span className="preloader__icon">🥬</span>
          <span className="preloader__icon-dot" />
          <span className="preloader__icon">🌍</span>
        </motion.div>

        {/* Logo text */}
        <h1 className="preloader__title" aria-label="Marché de Mo'">
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className="preloader__letter"
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={phase >= 1 ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          className="preloader__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {TAGLINE}
        </motion.p>

        {/* Loading bar */}
        <motion.div
          className="preloader__bar-track"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="preloader__bar-fill"
            initial={{ scaleX: 0 }}
            animate={phase >= 2 ? { scaleX: 1 } : {}}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </div>

      {/* Corner accents */}
      <motion.div
        className="preloader__corner preloader__corner--tl"
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 0.3 } : {}}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="preloader__corner preloader__corner--br"
        initial={{ opacity: 0 }}
        animate={phase >= 1 ? { opacity: 0.3 } : {}}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}
