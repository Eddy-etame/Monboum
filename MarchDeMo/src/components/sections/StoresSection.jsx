import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Car, Beef, Sun, Accessibility, CalendarDays } from 'lucide-react';
import './StoresSection.css';

const FEATURES = [
  { icon: Sun, label: 'Ouvert le dimanche' },
  { icon: Beef, label: 'Boucherie sur place' },
  { icon: Car, label: 'Parking gratuit' },
  { icon: Accessibility, label: 'Accès PMR' },
];

const HOURS = [
  { day: 'Lundi – Samedi', time: '8h30 – 20h30' },
  { day: 'Dimanche', time: '9h00 – 13h00' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function StoresSection() {
  return (
    <section id="magasins" className="stores section">
      <div className="container">
        <motion.div
          className="section-label"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Nos Magasins
        </motion.div>

        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.1}
        >
          Venez Nous <span>Rendre Visite</span>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.2}
        >
          Nos magasins sont ouverts du lundi au dimanche. Nos équipes seront heureuses
          de vous accueillir et vous conseiller.
        </motion.p>

        <div className="stores__layout">
          {/* Store Card */}
          <motion.div
            className="stores__card glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.3}
          >
            <div className="stores__card-badge">Magasin Principal</div>
            <h3 className="stores__card-name">Portet-sur-Garonne</h3>

            <div className="stores__info-row">
              <MapPin size={18} />
              <div>
                <p>8 Allée Pablo Picasso</p>
                <p>31120 Portet-sur-Garonne</p>
              </div>
            </div>

            <div className="stores__info-row">
              <Phone size={18} />
              <a href="tel:0582958252">05 82 95 82 52</a>
            </div>

            <div className="stores__info-row">
              <CalendarDays size={18} />
              <div className="stores__hours">
                {HOURS.map(({ day, time }) => (
                  <div key={day} className="stores__hour-row">
                    <span>{day}</span>
                    <span className="stores__hour-time">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stores__features">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="stores__feature">
                  <Icon size={16} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://maps.google.com/?q=8+Allée+Pablo+Picasso+31120+Portet-sur-Garonne"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary stores__directions-btn"
            >
              <MapPin size={16} />
              Itinéraire
            </a>
          </motion.div>

          {/* Second Store Card */}
          <motion.div
            className="stores__card glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.4}
          >
            <div className="stores__card-badge stores__card-badge--secondary">Toulouse Sud</div>
            <h3 className="stores__card-name">Toulouse</h3>

            <div className="stores__info-row">
              <MapPin size={18} />
              <div>
                <p>5 Rue Joachim du Bellay</p>
                <p>31100 Toulouse</p>
              </div>
            </div>

            <div className="stores__info-row">
              <Phone size={18} />
              <a href="tel:0582958252">05 82 95 82 52</a>
            </div>

            <div className="stores__info-row">
              <CalendarDays size={18} />
              <div className="stores__hours">
                {HOURS.map(({ day, time }) => (
                  <div key={day} className="stores__hour-row">
                    <span>{day}</span>
                    <span className="stores__hour-time">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stores__features">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="stores__feature">
                  <Icon size={16} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://maps.google.com/?q=5+Rue+Joachim+du+Bellay+31100+Toulouse"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline stores__directions-btn"
            >
              <MapPin size={16} />
              Itinéraire
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            className="stores__map"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.5}
          >
            <iframe
              title="Marché de Mo' — Localisation"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.5!2d1.3875!3d43.5230!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDMxJzIzLCIxwrAyMycxNSI!5e0!3m2!1sfr!2sfr!4v1700000000000"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
