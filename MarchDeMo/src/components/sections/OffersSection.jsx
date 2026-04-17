import { motion } from 'framer-motion';
import { Percent, ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';
import './OffersSection.css';

const PROMOS = [
  {
    badge: '-30%',
    title: 'Les Saveurs de l\'Italie',
    subtitle: 'Offres sur vos pâtes préférées',
    gradient: 'linear-gradient(135deg, #D4423B, #E8920F)',
  },
  {
    badge: '-20%',
    title: 'Super Affaire',
    subtitle: 'Sur les céréales cette semaine',
    gradient: 'linear-gradient(135deg, #27AE60, #06B6D4)',
  },
];

export default function OffersSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="offers section">
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Offres de la Semaine
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Des <span>Prix Cassés</span> Toute l'Année
        </motion.h2>

        <div className="offers__promos">
          {PROMOS.map(({ badge, title, subtitle, gradient }, i) => (
            <motion.div
              key={i}
              className="offers__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <div className="offers__card-bg" style={{ background: gradient }} />
              <div className="offers__card-content">
                <div className="offers__card-badge">
                  <Percent size={16} />
                  {badge}
                </div>
                <h3 className="offers__card-title">{title}</h3>
                <p className="offers__card-subtitle">{subtitle}</p>
                <span className="offers__card-cta">
                  Acheter <ArrowRight size={16} />
                </span>
              </div>
              <div className="offers__card-decor" />
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          className="offers__newsletter glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="offers__newsletter-text">
            <h3>Recevez Nos Offres Exclusives</h3>
            <p>-20% sur votre prochain caddie en vous inscrivant à notre newsletter</p>
          </div>
          <form className="offers__newsletter-form" onSubmit={handleSubmit}>
            <div className="offers__newsletter-input-wrap">
              <Mail size={18} className="offers__newsletter-icon" />
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="offers__newsletter-input"
              />
            </div>
            <button type="submit" className="btn btn-secondary" disabled={submitted}>
              {submitted ? 'Merci !' : "S'inscrire"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
