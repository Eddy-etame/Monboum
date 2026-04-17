import { motion } from 'framer-motion';
import { Leaf, Heart, Users, Award } from 'lucide-react';
import './AboutSection.css';

const VALUES = [
  {
    icon: Leaf,
    title: 'Fraîcheur Quotidienne',
    desc: 'Arrivage quotidien pour notre boucherie et nos fruits et légumes. Traçabilité stricte et audit indépendant.',
  },
  {
    icon: Heart,
    title: 'Solidarité Locale',
    desc: 'Soutien indéfectible aux associations locales avec un fort impact sur le territoire.',
  },
  {
    icon: Users,
    title: 'Diversité & Inclusion',
    desc: 'Un collectif diversifié et inclusif, reflet de la richesse de nos communautés.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function AboutSection() {
  return (
    <section id="enseigne" className="about section">
      <div className="container">
        <div className="about__grid">
          {/* Left — Visual */}
          <motion.div
            className="about__visual"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="about__image-wrapper">
              <div className="about__image-bg" />
              <div className="about__image-content">
                <Award size={48} strokeWidth={1.2} />
                <span className="about__image-years">40+</span>
                <span className="about__image-label">Ans d'Expérience</span>
              </div>
              <div className="about__image-glow" />
            </div>
            <div className="about__floater">
              <span className="about__floater-emoji">🛒</span>
              <div>
                <strong>Entreprise Familiale</strong>
                <span>Depuis plus de 40 ans</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Text */}
          <div className="about__text">
            <motion.div
              className="section-label"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Notre Enseigne
            </motion.div>

            <motion.h2
              className="section-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.1}
            >
              L'Histoire de <span>Mo'</span>
            </motion.h2>

            <motion.p
              className="about__paragraph"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.2}
            >
              Fondé par une famille de commerçants, le Marché de Mo' est une enseigne
              de supermarché spécialisée dans les produits ultra frais et ethniques
              via notamment sa boucherie halal et ses fruits et légumes, tous deux
              réapprovisionnés quotidiennement.
            </motion.p>

            <motion.p
              className="about__paragraph"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.3}
            >
              Mo' est le diminutif de Mohamed — le patriarche d'une famille de
              commerçants avec plus de 40 ans d'expérience au service de ses clients
              dans le secteur alimentaire. Il a toujours eu le goût pour le service
              client et pour l'engagement auprès de tous.
            </motion.p>

            <motion.div
              className="about__values"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {VALUES.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="about__value glass-card"
                  variants={fadeUp}
                  custom={0.3 + i * 0.15}
                >
                  <div className="about__value-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="about__value-title">{title}</h4>
                    <p className="about__value-desc">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
