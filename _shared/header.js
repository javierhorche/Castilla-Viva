/* ─────────────────────────────────────────────────────────────
   <cv-header> — TopBar de Castilla Viva
   Comportamiento:
   - En index.html arranca TRANSPARENTE sobre el vídeo del hero.
     Al hacer scroll > 80px, se vuelve OPACA + logo "Castilla viva." pasa a "v."
   - En el resto de páginas arranca OPACA desde el inicio.
   Edita SOLO este archivo para cambiar el header en TODO el sitio.
   ──────────────────────────────────────────────────────────── */

(function () {
  // ── CONFIGURACIÓN ─────────────────────────────────────────
  const NAV_ITEMS = [
    { href: 'sobre-nosotros.html', label: 'Sobre nosotros' },
    { href: 'transparencia.html',  label: 'Transparencia'  },
    { href: 'eventos.html',        label: 'Eventos'        },
    { href: 'mecenas.html',        label: 'Mecenas'        },
    { href: 'contacto.html',       label: 'Contacto'       },
  ];

  // ⚠️ REEMPLAZA con tu Payment Link real cuando lo tengas (Stripe → Payment Links)
  const STRIPE_LINK = 'https://buy.stripe.com/REEMPLAZAR_CON_PAYMENT_LINK';

  const CSS = `
    :host {
      display: block;
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      color: var(--cv-paper);
    }
    .bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding: 24px 40px;
      transition: padding .35s ease, background .35s ease, border-color .35s ease, color .35s ease;
      border-bottom: 1px solid transparent;
    }
    :host([data-state="scrolled"]) .bar,
    :host([data-state="opaque"])  .bar {
      padding: 14px 32px;
      background: rgba(240, 233, 220, .92);
      backdrop-filter: blur(12px) saturate(140%);
      -webkit-backdrop-filter: blur(12px) saturate(140%);
      border-bottom: 1px solid var(--cv-rule);
      color: var(--cv-ink);
    }

    @media (max-width: 720px) {
      .bar { padding: 18px 24px; }
      :host([data-state="scrolled"]) .bar,
      :host([data-state="opaque"]) .bar { padding: 12px 24px; }
    }

    /* ── Logo ──────────────────────────────────────────── */
    .brand {
      display: inline-block;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      line-height: 1;
      position: relative;
    }
    .brand .full,
    .brand .v {
      transition: opacity .35s ease, transform .35s ease;
    }
    .brand .full { display: block; }
    .brand .v {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      opacity: 0;
      transform: translateY(4px);
    }
    :host([data-state="scrolled"]) .brand .full { opacity: 0; transform: translateY(-4px); }
    :host([data-state="scrolled"]) .brand .v    { opacity: 1; transform: translateY(0); }

    .brand .castilla {
      display: block;
      font-family: var(--cv-mono);
      font-weight: 500;
      font-size: 9px;
      letter-spacing: .42em;
      text-transform: uppercase;
      line-height: 1;
      color: inherit;
      margin-bottom: 5px;
      padding-bottom: 5px;
      border-bottom: 1px solid currentColor;
    }
    .brand .viva {
      display: block;
      font-family: var(--cv-serif);
      font-weight: 400;
      font-style: italic;
      font-variation-settings: "SOFT" 100, "opsz" 144;
      font-size: 38px;
      line-height: .85;
      letter-spacing: -0.05em;
      color: inherit;
    }
    .brand .viva .dot { color: var(--cv-carmesi); }

    .brand .v {
      font-family: var(--cv-serif);
      font-weight: 400;
      font-style: italic;
      font-variation-settings: "SOFT" 100, "opsz" 144;
      font-size: 30px;
      line-height: 1;
      letter-spacing: -0.05em;
      color: var(--cv-ink);
    }
    .brand .v .dot { color: var(--cv-carmesi); }

    /* ── Nav central ───────────────────────────────────── */
    nav {
      display: flex;
      gap: 4px;
      font-family: var(--cv-sans);
      font-weight: 500;
      font-size: 14px;
    }
    nav a {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      color: rgba(240, 233, 220, .66);
      text-decoration: none;
      transition: color .25s ease;
    }
    nav a:hover { color: var(--cv-paper); }
    nav a[aria-current="page"] { color: var(--cv-paper); }
    nav a[aria-current="page"]::before {
      content: "";
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--cv-carmesi);
      display: inline-block;
    }
    :host([data-state="scrolled"]) nav a,
    :host([data-state="opaque"])    nav a { color: var(--cv-mute); }
    :host([data-state="scrolled"]) nav a:hover,
    :host([data-state="opaque"])    nav a:hover { color: var(--cv-ink); }
    :host([data-state="scrolled"]) nav a[aria-current="page"],
    :host([data-state="opaque"])    nav a[aria-current="page"] { color: var(--cv-ink); }

    /* ── CTAs derecha ──────────────────────────────────── */
    .ctas {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .ctas a {
      font-family: var(--cv-sans);
      font-weight: 500;
      font-size: 13.5px;
      padding: 8px 16px;
      border-radius: 999px;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: background .25s ease, color .25s ease, border-color .25s ease;
    }
    .ctas a.aportar {
      background: transparent;
      color: inherit;
      border: 1px solid rgba(240, 233, 220, .4);
    }
    .ctas a.aportar:hover { border-color: currentColor; }
    .ctas a.socio {
      background: var(--cv-paper);
      color: var(--cv-ink);
      padding: 9px 8px 9px 18px;
      border: 0;
    }
    .ctas a.socio .bubble {
      width: 26px; height: 26px;
      background: var(--cv-carmesi);
      color: var(--cv-paper);
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      transition: background .25s ease, color .25s ease;
    }

    :host([data-state="scrolled"]) .ctas a.aportar,
    :host([data-state="opaque"])    .ctas a.aportar {
      border-color: var(--cv-ink);
      color: var(--cv-ink);
    }
    :host([data-state="scrolled"]) .ctas a.socio,
    :host([data-state="opaque"])    .ctas a.socio {
      background: var(--cv-ink);
      color: var(--cv-paper);
    }
    :host([data-state="scrolled"]) .ctas a.socio .bubble,
    :host([data-state="opaque"])    .ctas a.socio .bubble {
      background: var(--cv-oro);
      color: var(--cv-ink);
    }

    /* ── Hamburguesa + responsive ──────────────────────── */
    button.menu-toggle {
      display: none;
      background: none;
      border: 0;
      padding: 8px;
      font-size: 22px;
      color: inherit;
      cursor: pointer;
      line-height: 1;
    }
    @media (max-width: 1100px) {
      nav { display: none; }
      .ctas a.aportar { display: none; }
    }
    @media (max-width: 720px) {
      button.menu-toggle { display: inline-flex; }
      .ctas a.socio { display: none; }
    }

    /* ── Drawer móvil ──────────────────────────────────── */
    .drawer {
      position: fixed;
      inset: 64px 0 0 0;
      background: var(--cv-paper);
      color: var(--cv-ink);
      padding: 32px 24px;
      display: none;
      flex-direction: column;
      gap: 4px;
      border-top: 1px solid var(--cv-rule);
    }
    :host([data-open="true"]) .drawer { display: flex; }
    .drawer a {
      font-family: var(--cv-mono);
      font-size: 13px;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--cv-ink);
      text-decoration: none;
      padding: 14px 0;
      border-bottom: 1px solid var(--cv-rule);
    }
    .drawer .cta-row {
      display: flex; gap: 12px; margin-top: 24px;
    }
    .drawer .cta-row a {
      flex: 1; text-align: center;
      border: 1px solid var(--cv-ink); border-radius: 999px;
      padding: 12px 16px; font-family: var(--cv-sans); font-size: 14px;
      letter-spacing: 0; text-transform: none;
    }
    .drawer .cta-row a.socio { background: var(--cv-ink); color: var(--cv-paper); }
  `;

  class CvHeader extends HTMLElement {
    connectedCallback() {
      const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const startsTransparent = this.hasAttribute('data-transparent-start');
      if (!startsTransparent) this.setAttribute('data-state', 'opaque');

      const navHtml = NAV_ITEMS.map(item => {
        const active = item.href.toLowerCase() === here;
        return `<a href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a>`;
      }).join('');

      const drawerHtml = NAV_ITEMS.map(item => {
        const active = item.href.toLowerCase() === here;
        return `<a href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a>`;
      }).join('');

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>${CSS}</style>
        <div class="bar">
          <a class="brand" href="index.html" aria-label="Castilla viva — inicio">
            <div class="full">
              <span class="castilla">Castilla</span>
              <span class="viva">viva<span class="dot">.</span></span>
            </div>
            <div class="v" aria-hidden="true">
              <span>v<span class="dot">.</span></span>
            </div>
          </a>
          <nav>${navHtml}</nav>
          <div class="ctas">
            <a class="aportar" href="${STRIPE_LINK}" target="_blank" rel="noopener">Aportar</a>
            <a class="socio" href="hazte-socio.html">
              Hazte socio
              <span class="bubble">→</span>
            </a>
            <button class="menu-toggle" aria-label="abrir menú" aria-expanded="false">≡</button>
          </div>
        </div>
        <div class="drawer">
          ${drawerHtml}
          <div class="cta-row">
            <a class="aportar" href="${STRIPE_LINK}" target="_blank" rel="noopener">Aportar</a>
            <a class="socio" href="hazte-socio.html">Hazte socio →</a>
          </div>
        </div>
      `;

      // Scroll listener — solo si arranca transparente
      if (startsTransparent) {
        const onScroll = () => {
          const scrolled = window.scrollY > 80;
          this.setAttribute('data-state', scrolled ? 'scrolled' : '');
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      }

      // Drawer toggle
      const toggle = this.shadowRoot.querySelector('.menu-toggle');
      toggle.addEventListener('click', () => {
        const open = this.getAttribute('data-open') === 'true';
        this.setAttribute('data-open', String(!open));
        toggle.setAttribute('aria-expanded', String(!open));
        toggle.textContent = open ? '≡' : '×';
      });
    }
  }

  customElements.define('cv-header', CvHeader);
})();
