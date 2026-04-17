import { useMemo, useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Section } from './components/Section'
import { brands, menuCategories, signatures, testimonials } from './content/siteContent'
import { themeLabels, type ThemeName } from './theme/themes'

function App() {
  const [theme, setTheme] = useState<ThemeName>('dark')
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].name)

  const activeItems = useMemo(
    () => menuCategories.find((category) => category.name === activeCategory)?.items ?? [],
    [activeCategory],
  )

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="topbar">
        <a className="logo" href="#home" aria-label="Mon Boum Home">
          Mon Boum
        </a>
        <div className="topbar-tools">
          <label className="location-select" htmlFor="location">
            <span>Location</span>
            <select id="location" defaultValue="toulouse-center">
              <option value="toulouse-center">Toulouse Center</option>
              <option value="toulouse-north">Toulouse North</option>
              <option value="blagnac">Blagnac</option>
            </select>
          </label>
          <label className="theme-select" htmlFor="theme">
            <span>Theme</span>
            <select
              id="theme"
              value={theme}
              onChange={(event) => setTheme(event.target.value as ThemeName)}
            >
              {Object.entries(themeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <Button kind="primary">Order now</Button>
        </div>
      </header>

      <main>
        <Section id="home" className="hero-section">
          <p className="eyebrow">Since 2004 in Toulouse</p>
          <h1>Street food with premium flow.</h1>
          <p className="hero-subtitle">
            Fast ordering, quality ingredients, and a vibrant Boum identity across Burger, Pizza,
            Chicken, and Saveurs.
          </p>
          <div className="hero-actions">
            <Button kind="primary">Delivery in 25-35 min</Button>
            <Button kind="secondary">Click and collect</Button>
            <Button kind="ghost">Group order</Button>
          </div>
          <ul className="hero-kpis">
            <li>
              <strong>8</strong> restaurants
            </li>
            <li>
              <strong>4.8/5</strong> guest score
            </li>
            <li>
              <strong>100%</strong> traceable meat
            </li>
          </ul>
        </Section>

        <Section title="Choose your Boum">
          <div className="brand-grid">
            {brands.map((brand) => (
              <Card key={brand.name}>
                <p className="card-tag">{brand.tag}</p>
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
                <div className="meta-row">
                  <span>{brand.priceRange}</span>
                  <span>{brand.eta}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Best sellers">
          <div className="signature-grid">
            {signatures.map((item) => (
              <Card key={item.name} className="signature-item">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="meta-row">
                  <span>{item.price}</span>
                  <span>{item.meta}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Menu preview">
          <div className="category-pills">
            {menuCategories.map((category) => (
              <button
                key={category.name}
                className={`pill ${activeCategory === category.name ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.name)}
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="menu-list">
            {activeItems.map((item) => (
              <article key={item.title} className="menu-row">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.note}</p>
                </div>
                <span>{item.price}</span>
              </article>
            ))}
          </div>
        </Section>

        <Section title="They validated Mon Boum">
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <p>"{testimonial.quote}"</p>
                <h3>{testimonial.name}</h3>
                <p className="muted">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section className="faq-strip">
          <div>
            <h2>Why people order direct</h2>
            <p>Transparent fees, direct support, rewards, and faster re-ordering.</p>
          </div>
          <div className="faq-links">
            <a href="/">Delivery zones</a>
            <a href="/">Allergens</a>
            <a href="/">Franchise opportunities</a>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <p>Mon Boum - Premium street-food flow in Toulouse</p>
        <nav>
          <a href="/">Instagram</a>
          <a href="/">TikTok</a>
          <a href="/">Contact</a>
          <a href="/">Privacy</a>
        </nav>
      </footer>
    </div>
  )
}

export default App
