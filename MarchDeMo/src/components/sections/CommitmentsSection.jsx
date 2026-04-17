import { motion } from 'framer-motion';
import { UtensilsCrossed, HandHeart, Trophy, HeartHandshake } from 'lucide-react';
import './CommitmentsSection.css';

const PILLARS = [
  {
    icon: UtensilsCrossed,
    title: 'Urgence Alimentaire',
    desc: "Nous nous engageons à lutter contre l'urgence alimentaire en faisant des dons réguliers aux banques alimentaires locales. En choisissant de faire vos achats chez nous, vous contribuez également à cette noble cause.",
    accent: 'var(--color-accent-red)',
  },
  {
    icon: HandHeart,
    title: 'Diversité & Inclusion',
    desc: "Nous croyons en la force de la diversité et nous nous efforçons de créer un environnement de travail équitable et inclusif pour tous. Chaque achat chez nous soutient notre engagement en faveur d'une société plus diversifiée.",
    accent: 'var(--color-primary-light)',
  },
  {
    icon: Trophy,
    title: 'Sport Local',
    desc: "Nous nous engageons à soutenir le monde du sport en faisant des dons réguliers à des initiatives locales et à des associations sportives. Ensemble, nous pouvons faire une différence significative.",
    accent: 'var(--color-secondary)',
  },
  {
    icon: HeartHandshake,
    title: 'Aide aux Personnes Dépendantes',
    desc: "Nous nous engageons à aider les personnes dépendantes, notamment les personnes âgées, en soutenant des initiatives locales et des associations dédiées à leur bien-être quotidien.",
    accent: '#8B5CF6',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function CommitmentsSection() {
  return (
    <section id="engagements" className="commitments section">
      <div className="commitments__accent-line" />
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Nos Engagements
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Un Impact <span>Positif</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Chez Marché de Mo', la responsabilité sociale est une préoccupation collective.
          Nous agissons autour de quatre thématiques qui nous tiennent à cœur.
        </motion.p>

        <div className="commitments__grid">
          {PILLARS.map(({ icon: Icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              className="commitments__card glass-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
            >
              <div className="commitments__card-header">
                <div
                  className="commitments__card-icon"
                  style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }}
                >
                  <Icon size={24} />
                </div>
                <div className="commitments__card-number" style={{ color: accent }}>
                  0{i + 1}
                </div>
              </div>
              <h3 className="commitments__card-title">{title}</h3>
              <p className="commitments__card-desc">{desc}</p>
              <div className="commitments__card-bar" style={{ background: accent }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
