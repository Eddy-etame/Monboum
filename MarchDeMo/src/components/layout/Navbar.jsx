import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Notre Enseigne', href: '#enseigne' },
  { label: 'Nos Rayons', href: '#rayons' },
  { label: 'Engagements', href: '#engagements' },
  { label: 'Magasins', href: '#magasins' },
  { label: 'Recrutement', href: '#recrutement' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ visible }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="navbar__inner container">
          <a href="#accueil" className="navbar__logo" onClick={(e) => handleClick(e, '#accueil')}>
            <span className="navbar__logo-icon">M'</span>
            <span className="navbar__logo-text">Marché de Mo'</span>
          </a>

          <nav className="navbar__nav hide-mobile">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="navbar__link"
                onClick={(e) => handleClick(e, href)}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#magasins"
            className="btn btn-primary navbar__cta hide-mobile"
            onClick={(e) => handleClick(e, '#magasins')}
          >
            <MapPin size={16} />
            Nous Trouver
          </a>

          <button
            className="navbar__burger hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="mobile-menu__nav"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  className="mobile-menu__link"
                  onClick={(e) => handleClick(e, href)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="#magasins"
                className="btn btn-primary mobile-menu__cta"
                onClick={(e) => handleClick(e, '#magasins')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <MapPin size={16} />
                Nous Trouver
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
