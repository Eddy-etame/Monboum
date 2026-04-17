import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Section } from './components/Section'
import { brands, menuCategories, signatures, testimonials } from './content/siteContent'
import { themeLabels, type ThemeName } from './theme/themes'

type CartItem = {
  title: string
  price: string
  quantity: number
}

type OrderHistoryItem = {
  id: string
  createdAt: string
  total: number
  method: 'delivery' | 'pickup'
  payment: 'card' | 'applepay' | 'cash'
}

type CheckoutStep = 'fulfillment' | 'address' | 'payment'

const checkoutSteps: CheckoutStep[] = ['fulfillment', 'address', 'payment']

function parsePriceToNumber(price: string): number {
  const normalized = price.replace('EUR', '').trim()
  return Number.parseFloat(normalized)
}

function App() {
  const [theme, setTheme] = useState<ThemeName>('dark')
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].name)
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('fulfillment')
  const [orderMethod, setOrderMethod] = useState<'delivery' | 'pickup'>('delivery')
  const [scheduled, setScheduled] = useState('asap')
  const [address, setAddress] = useState('12 Rue Gabriel Peri, Toulouse')
  const [phone, setPhone] = useState('+33 6 12 34 56 78')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cash'>('card')
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('monboum-cart')
    if (!saved) {
      return []
    }
    try {
      const parsed = JSON.parse(saved) as CartItem[]
      return Array.isArray(parsed) ? parsed : []
    } catch {
      localStorage.removeItem('monboum-cart')
      return []
    }
  })
  const [couponInput, setCouponInput] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>(() => {
    const saved = localStorage.getItem('monboum-order-history')
    if (!saved) {
      return []
    }
    try {
      const parsed = JSON.parse(saved) as OrderHistoryItem[]
      return Array.isArray(parsed) ? parsed : []
    } catch {
      localStorage.removeItem('monboum-order-history')
      return []
    }
  })

  const activeItems = useMemo(
    () => menuCategories.find((category) => category.name === activeCategory)?.items ?? [],
    [activeCategory],
  )

  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        return sum + parsePriceToNumber(item.price) * item.quantity
      }, 0),
    [cartItems],
  )
  const fee = orderMethod === 'delivery' ? 2.9 : 0
  const discount = couponCode === 'BOUM10' ? subtotal * 0.1 : 0
  const total = subtotal + fee - discount
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const stepIndex = checkoutSteps.indexOf(checkoutStep)
  const canContinue =
    checkoutStep !== 'address' ||
    (address.trim().length >= 8 &&
      /(\+?\d[\d\s-]{7,})/.test(phone.trim()))

  function addToCart(title: string, price: string) {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.title === title)
      if (existing) {
        return prevItems.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prevItems, { title, price, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateQuantity(title: string, delta: number) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.title === title ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function applyCoupon() {
    const normalized = couponInput.trim().toUpperCase()
    if (normalized === 'BOUM10') {
      setCouponCode(normalized)
    } else {
      setCouponCode('')
    }
  }

  function placeOrder() {
    if (cartItems.length === 0 || isPlacingOrder) {
      return
    }
    setValidationError('')
    setIsPlacingOrder(true)
    window.setTimeout(() => {
      const entry: OrderHistoryItem = {
        id: `${Date.now()}`,
        createdAt: new Date().toLocaleString(),
        total,
        method: orderMethod,
        payment: paymentMethod,
      }
      setOrderHistory((previous) => [entry, ...previous].slice(0, 3))
      setOrderPlaced(true)
      setIsPlacingOrder(false)
      setCartItems([])
      setCheckoutStep('fulfillment')
      setCouponInput('')
      setCouponCode('')
    }, 1300)
  }

  function goToNextStep() {
    if (checkoutStep === 'address' && !canContinue) {
      setValidationError('Please provide a valid address and phone to continue.')
      return
    }
    setValidationError('')
    setCheckoutStep(checkoutSteps[stepIndex + 1])
  }

  useEffect(() => {
    localStorage.setItem('monboum-cart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('monboum-order-history', JSON.stringify(orderHistory))
  }, [orderHistory])

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
          <Button kind="primary" onClick={() => setCartOpen(true)}>
            Order now ({totalItems})
          </Button>
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
                <Button kind="secondary" onClick={() => addToCart(item.name, item.price)}>
                  Add to cart
                </Button>
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
                <div className="menu-row-actions">
                  <span>{item.price}</span>
                  <Button kind="ghost" onClick={() => addToCart(item.title, item.price)}>
                    Add
                  </Button>
                </div>
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

      <button className="cart-fab" type="button" onClick={() => setCartOpen(true)}>
        Cart ({totalItems}) - EUR {total.toFixed(2)}
      </button>

      <aside className={`cart-drawer ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen}>
        <div className="cart-header">
          <h2>Your Order</h2>
          <button type="button" className="close-btn" onClick={() => setCartOpen(false)}>
            Close
          </button>
        </div>

        <div className="checkout-steps">
          {checkoutSteps.map((step, index) => (
            <div key={step} className={`step-chip ${index <= stepIndex ? 'active' : ''}`}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        {orderPlaced ? (
          <section className="order-confirmation">
            <h3>Order confirmed</h3>
            <p>Your order is in preparation. Estimated arrival: 25-35 minutes.</p>
            <p>
              Method: <strong>{orderMethod}</strong> - Payment: <strong>{paymentMethod}</strong>
            </p>
            <Button kind="secondary" onClick={() => setOrderPlaced(false)}>
              Start a new order
            </Button>
          </section>
        ) : null}

        {orderHistory.length > 0 ? (
          <section className="order-history">
            <h3>Recent orders</h3>
            <ul>
              {orderHistory.map((order) => (
                <li key={order.id}>
                  <span>{order.createdAt}</span>
                  <strong>EUR {order.total.toFixed(2)}</strong>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="cart-list">
          {cartItems.length === 0 ? (
            <p className="muted">Your cart is empty. Add a signature item to begin.</p>
          ) : (
            cartItems.map((item) => (
              <article key={item.title} className="cart-row">
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.price}</p>
                </div>
                <div className="qty-controls">
                  <button type="button" onClick={() => updateQuantity(item.title, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.title, 1)}>
                    +
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {checkoutStep === 'fulfillment' && (
          <section className="checkout-panel">
            <h3>Step 1 - Fulfillment</h3>
            <div className="checkout-options">
              <label>
                <input
                  type="radio"
                  checked={orderMethod === 'delivery'}
                  onChange={() => setOrderMethod('delivery')}
                />
                Delivery
              </label>
              <label>
                <input
                  type="radio"
                  checked={orderMethod === 'pickup'}
                  onChange={() => setOrderMethod('pickup')}
                />
                Pickup
              </label>
            </div>
            <label className="inline-field">
              Time
              <select value={scheduled} onChange={(event) => setScheduled(event.target.value)}>
                <option value="asap">ASAP</option>
                <option value="20m">In 20 minutes</option>
                <option value="45m">In 45 minutes</option>
              </select>
            </label>
          </section>
        )}

        {checkoutStep === 'address' && (
          <section className="checkout-panel">
            <h3>Step 2 - Address & Contact</h3>
            <label className="inline-field">
              Delivery address
              <input value={address} onChange={(event) => setAddress(event.target.value)} />
            </label>
            <label className="inline-field">
              Phone
              <input value={phone} onChange={(event) => setPhone(event.target.value)} />
            </label>
          </section>
        )}

        {checkoutStep === 'payment' && (
          <section className="checkout-panel">
            <h3>Step 3 - Payment</h3>
            <div className="checkout-options">
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                Card
              </label>
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === 'applepay'}
                  onChange={() => setPaymentMethod('applepay')}
                />
                Apple Pay
              </label>
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                Cash
              </label>
            </div>
          </section>
        )}

        <div className="totals">
          <p>
            <span>Subtotal</span>
            <strong>EUR {subtotal.toFixed(2)}</strong>
          </p>
          <p>
            <span>Fees</span>
            <strong>EUR {fee.toFixed(2)}</strong>
          </p>
          <p>
            <span>Discount</span>
            <strong>- EUR {discount.toFixed(2)}</strong>
          </p>
          <p className="grand-total">
            <span>Total</span>
            <strong>EUR {total.toFixed(2)}</strong>
          </p>
        </div>

        <div className="coupon-row">
          <input
            value={couponInput}
            onChange={(event) => setCouponInput(event.target.value)}
            placeholder="Coupon code (try BOUM10)"
          />
          <Button kind="secondary" onClick={applyCoupon}>
            Apply
          </Button>
        </div>
        {couponCode ? <p className="coupon-status">Coupon {couponCode} applied.</p> : null}
        {validationError ? <p className="validation-error">{validationError}</p> : null}

        <div className="checkout-controls">
          <Button
            kind="ghost"
            onClick={() => {
              setValidationError('')
              setCheckoutStep(checkoutSteps[Math.max(0, stepIndex - 1)])
            }}
            disabled={stepIndex === 0}
          >
            Back
          </Button>
          {stepIndex < checkoutSteps.length - 1 ? (
            <Button kind="primary" onClick={goToNextStep}>
              Continue
            </Button>
          ) : (
            <Button kind="primary" disabled={cartItems.length === 0} onClick={placeOrder}>
              {isPlacingOrder ? 'Processing payment...' : 'Place order'}
            </Button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default App
