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

  // ── LOGO ──────────────────────────────────────────────────
  // Lockup horizontal generado midiendo la tinta real de cada letra
  // (ascendentes/descendentes) para cuadrarlo con precisión:
  //   · la v. abarca del borde superior de CASTILLA al inferior de viva
  //   · CASTILLA y viva comparten exactamente la misma anchura
  //   · separaciones simétricas a ambos lados de la barra
  const VS = "font-variation-settings:'SOFT' 100,'opsz' 144;";

  function buildLockup() {
    const ctx = document.createElement('canvas').getContext('2d');
    const Cs = 34, LSc = 0.42 * Cs;
    ctx.font = "500 " + Cs + "px 'JetBrains Mono', monospace";
    const mC = ctx.measureText('CASTILLA');
    const cAsc = mC.actualBoundingBoxAscent || Cs * 0.72;
    const Wc = mC.width + LSc * 7;

    ctx.font = "italic 400 100px 'Fraunces', serif";
    const mV = ctx.measureText('viva');
    const vivaK = mV.width / 100 - 0.05 * 3;
    const Vs = Wc / vivaK;
    const vivaAsc = (mV.actualBoundingBoxAscent || 52) * Vs / 100;
    const vivaDesc = (mV.actualBoundingBoxDescent || 0) * Vs / 100;
    const LSv = -0.05 * Vs;

    const mv = ctx.measureText('v.');
    const vAsc100 = mv.actualBoundingBoxAscent || 50;
    const vDesc100 = mv.actualBoundingBoxDescent || 0;

    const gapV = 0.42 * Cs;
    const cBase = cAsc;
    const vivaBase = cBase + gapV + vivaAsc;
    const blockH = vivaBase + vivaDesc;

    const Vv = blockH * 100 / (vAsc100 + vDesc100);
    const vBase = vAsc100 * Vv / 100;
    const LSvv = -0.05 * Vv;
    const Wv = mv.width / 100 * Vv + LSvv;

    const g = Cs * 0.95, bw = Math.max(2, Cs * 0.075), P = Cs * 0.35;
    const barX = P + Wv + g, txtX = barX + bw + g;
    const W = txtX + Wc + P, H = blockH + 2 * P, off = P;

    return '<svg width="' + W.toFixed(1) + '" viewBox="0 0 ' + W.toFixed(1) + ' ' + H.toFixed(1) + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Castilla viva">'
      + '<text class="lg-fg" x="' + P.toFixed(1) + '" y="' + (off + vBase).toFixed(1) + '" font-family="Fraunces,serif" font-style="italic" font-weight="400" font-size="' + Vv.toFixed(1) + '" letter-spacing="' + LSvv.toFixed(2) + '" style="' + VS + '">v<tspan class="lg-dot">.</tspan></text>'
      + '<rect class="lg-bar" x="' + barX.toFixed(1) + '" y="' + off.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + blockH.toFixed(1) + '" rx="' + (bw / 2).toFixed(1) + '"/>'
      + '<text class="lg-fg" x="' + txtX.toFixed(1) + '" y="' + (off + cBase).toFixed(1) + '" font-family="\'JetBrains Mono\',monospace" font-weight="500" font-size="' + Cs.toFixed(1) + '" letter-spacing="' + LSc.toFixed(2) + '">CASTILLA</text>'
      + '<text class="lg-viva" x="' + txtX.toFixed(1) + '" y="' + (off + vivaBase).toFixed(1) + '" font-family="Fraunces,serif" font-style="italic" font-weight="400" font-size="' + Vs.toFixed(1) + '" letter-spacing="' + LSv.toFixed(2) + '" style="' + VS + '">viva</text>'
      + '</svg>';
  }

  function buildMono() {
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.font = "italic 400 100px 'Fraunces', serif";
    const mv = ctx.measureText('v.');
    const asc = mv.actualBoundingBoxAscent || 50, desc = mv.actualBoundingBoxDescent || 0;
    const S = 64, LS = -0.05 * S, P = 3;
    const w = mv.width / 100 * S + LS + 2 * P;
    const h = (asc + desc) * S / 100 + 2 * P;
    const base = asc * S / 100 + P;
    return '<svg width="' + w.toFixed(1) + '" viewBox="0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1) + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Castilla viva">'
      + '<text class="lg-fg" x="' + P.toFixed(1) + '" y="' + base.toFixed(1) + '" font-family="Fraunces,serif" font-style="italic" font-weight="400" font-size="' + S + '" letter-spacing="' + LS.toFixed(2) + '" style="' + VS + '">v<tspan class="lg-dot">.</tspan></text>'
      + '</svg>';
  }

  const CSS = `
    :host {
      display: block;
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      color: var(--cv-paper);
    }
    /* Velo difuminado hacia abajo — solo sobre el vídeo (estado transparente),
       para que logo, nav y botones se lean bien. Se desvanece al hacer scroll. */
    :host::before {
      content: "";
      position: absolute;
      inset: 0 0 auto 0;
      height: 170px;
      background: linear-gradient(180deg,
        rgba(20, 17, 14, .45) 0%,
        rgba(20, 17, 14, .24) 45%,
        rgba(20, 17, 14, 0)   100%);
      pointer-events: none;
      opacity: 1;
      transition: opacity .4s ease;
      z-index: 0;
    }
    :host([data-state="scrolled"])::before,
    :host([data-state="opaque"])::before { opacity: 0; }
    .bar {
      position: relative;
      z-index: 1;
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

    /* ── Logo · lockup horizontal "v. | Castilla viva" ──── */
    .brand {
      position: relative;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      line-height: 1;
    }
    .brand-logo { display: block; transition: opacity .35s ease, transform .35s ease; }
    .brand-logo svg { display: block; width: auto; }

    /* lockup completo */
    .brand-logo.full svg { height: 44px; transition: height .35s ease; }

    /* monograma "v." (colapsado al hacer scroll) */
    .brand-logo.mini {
      position: absolute;
      left: 0; top: 50%;
      transform: translate(0, -50%) translateY(4px);
      opacity: 0;
      pointer-events: none;
    }
    .brand-logo.mini svg { height: 34px; }

    /* swap: sobre vídeo y en páginas opacas se ve el lockup; al hacer scroll, la v. */
    :host([data-state="scrolled"]) .brand-logo.full svg { height: 44px; }
    :host([data-state="scrolled"]) .brand-logo.full { opacity: 0; transform: translateY(-4px); pointer-events: none; }
    :host([data-state="scrolled"]) .brand-logo.mini { opacity: 1; transform: translate(0, -50%); pointer-events: auto; }

    /* colores del logo · MARCA MADRE (punto carmesí, sin oro) */
    .lg-fg   { fill: var(--cv-paper); }
    .lg-viva { fill: var(--cv-paper); }
    .lg-dot  { fill: var(--cv-carmesi); }
    .lg-bar  { fill: rgba(240, 233, 220, .34); }
    :host([data-state="scrolled"]) .lg-fg,
    :host([data-state="opaque"])   .lg-fg   { fill: var(--cv-ink); }
    :host([data-state="scrolled"]) .lg-viva,
    :host([data-state="opaque"])   .lg-viva { fill: var(--cv-ink); }
    :host([data-state="scrolled"]) .lg-dot,
    :host([data-state="opaque"])   .lg-dot  { fill: var(--cv-carmesi); }
    :host([data-state="scrolled"]) .lg-bar,
    :host([data-state="opaque"])   .lg-bar  { fill: rgba(20, 17, 14, .32); }

    @media (max-width: 720px) {
      .brand-logo.full svg { height: 38px; }
      .brand-logo.mini svg { height: 30px; }
    }

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
      let here = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '').toLowerCase();
      if (here === '') here = 'index';
      const norm = (h) => h.replace(/\.html$/, '').toLowerCase();
      const startsTransparent = this.hasAttribute('data-transparent-start');
      if (!startsTransparent) this.setAttribute('data-state', 'opaque');

      const navHtml = NAV_ITEMS.map(item => {
        const active = norm(item.href) === here;
        return `<a href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a>`;
      }).join('');

      const drawerHtml = NAV_ITEMS.map(item => {
        const active = norm(item.href) === here;
        return `<a href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a>`;
      }).join('');

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>${CSS}</style>
        <div class="bar">
          <a class="brand" href="index.html" aria-label="Castilla viva — inicio">
            <span class="brand-logo full"></span>
            <span class="brand-logo mini" aria-hidden="true"></span>
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

      // Logo — se dibuja midiendo la tinta real (recalcular al cargar fuentes)
      const full = this.shadowRoot.querySelector('.brand-logo.full');
      const mini = this.shadowRoot.querySelector('.brand-logo.mini');
      const draw = () => { full.innerHTML = buildLockup(); mini.innerHTML = buildMono(); };
      draw();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);

      // Scroll listener — en TODAS las páginas.
      //  · Home (transparente): arriba transparente sobre el vídeo → al bajar, papel + v.
      //  · Resto (opaco):       arriba lockup sobre papel          → al bajar, v.
      const onScroll = () => {
        const scrolled = window.scrollY > 80;
        if (startsTransparent) {
          this.setAttribute('data-state', scrolled ? 'scrolled' : '');
        } else {
          this.setAttribute('data-state', scrolled ? 'scrolled' : 'opaque');
        }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

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
