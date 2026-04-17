import { motion } from 'framer-motion';
import { Beef, Apple, Flame, Palmtree, Fan, Sun, CoffeeIcon, Landmark, ShoppingBasket, Snowflake } from 'lucide-react';
import './DepartmentsSection.css';

const DEPARTMENTS = [
  { icon: Beef, name: 'Boucherie Halal', color: '#D4423B', desc: 'Viandes fraîches certifiées, découpées sur place chaque jour' },
  { icon: Apple, name: 'Fruits & Légumes', color: '#27AE60', desc: 'Arrivage quotidien, primeurs sélectionnés avec soin' },
  { icon: Flame, name: 'Épices du Monde', color: '#E8920F', desc: 'Épices rares et mélanges artisanaux des quatre coins du globe' },
  { icon: Palmtree, name: "Saveurs d'Afrique & Créole", color: '#F97316', desc: 'Produits authentiques pour des recettes traditionnelles' },
  { icon: Fan, name: "Saveurs d'Asie", color: '#EF4444', desc: 'Ingrédients asiatiques, sauces, nouilles et condiments' },
  { icon: Sun, name: 'Saveur Méditerranéenne', color: '#3B82F6', desc: 'Olives, fromages, huiles et spécialités de la Méditerranée' },
  { icon: CoffeeIcon, name: 'Saveur Sud Américaine', color: '#10B981', desc: 'Café, épices et ingrédients d\'Amérique Latine' },
  { icon: Landmark, name: 'Produits Balkans & Turques', color: '#8B5CF6', desc: 'Spécialités balkaniques et turques authentiques' },
  { icon: ShoppingBasket, name: 'Produits Courants Discount', color: '#F59E0B', desc: 'L\'essentiel à petits prix, tous les jours' },
  { icon: Snowflake, name: 'Surgelé', color: '#06B6D4', desc: 'Surgelés et snacking, large choix pour tous les goûts' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function DepartmentsSection() {
  return (
    <section id="rayons" className="departments section">
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Nos Rayons
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Les Catégories <span>les Plus Populaires</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Plus de 10 000 références pour satisfaire toutes vos envies culinaires
          du monde entier.
        </motion.p>

        <motion.div
          className="departments__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {DEPARTMENTS.map(({ icon: Icon, name, color, desc }) => (
            <motion.div
              key={name}
              className="departments__card"
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className="departments__card-icon"
                style={{
                  background: `${color}15`,
                  borderColor: `${color}30`,
                  color: color,
                }}
              >
                <Icon size={26} />
              </div>
              <h3 className="departments__card-name">{name}</h3>
              <p className="departments__card-desc">{desc}</p>
              <div
                className="departments__card-glow"
                style={{ background: color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
