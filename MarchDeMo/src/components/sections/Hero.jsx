import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Clock, Tag, Beef, Package } from 'lucide-react';
import './Hero.css';

const STATS = [
  { icon: Package, value: '+10 000', label: 'Références' },
  { icon: Clock, value: '7/7', label: 'Ouvert' },
  { icon: Tag, value: '-30%', label: 'Prix Cassés' },
  { icon: Beef, value: '100%', label: 'Halal' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="accueil" className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ y: bgY }}>
        <div className="hero__bg-gradient" />
        <div className="hero__bg-noise" />
      </motion.div>

      <motion.div className="hero__content container" style={{ opacity }}>
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="hero__badge-dot" />
          Portet-sur-Garonne · Toulouse
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Les Saveurs du Monde,
          <br />
          <span className="hero__title-accent">à Votre Porte</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Supermarché indépendant spécialisé dans l'ultra frais. Boucherie Halal,
          fruits et légumes frais, épices et saveurs du monde entier.
        </motion.p>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              className="hero__stat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
            >
              <Icon size={18} className="hero__stat-icon" />
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <a href="#rayons" className="btn btn-primary" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#rayons')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Découvrir Nos Rayons
          </a>
          <a href="#enseigne" className="btn btn-outline" onClick={(e) => {
            e.preventDefault();
            document.querySelector('#enseigne')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Notre Histoire
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
