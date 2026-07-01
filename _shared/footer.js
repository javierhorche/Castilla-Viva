/* ─────────────────────────────────────────────────────────────
   <cv-footer> — Pie de Castilla Viva
   Recupera el look del prototipo original: marca de agua "CASTILLA viva."
   gigante + 5 columnas (Iniciativa · Navegar · Hacer · Contacto · Boletín).
   El boletín se conecta a MailerLite — ver README para activarlo.
   Edita SOLO este archivo para cambiar el footer en TODO el sitio.
   ──────────────────────────────────────────────────────────── */

(function () {
  // ── CONFIGURACIÓN ─────────────────────────────────────────
  // ⚠️ REEMPLAZA cuando los tengáis:
  const STRIPE_LINK     = 'https://buy.stripe.com/REEMPLAZAR_CON_PAYMENT_LINK';
  const MAILERLITE_FORM = 'https://assets.mailerlite.com/jsonp/REEMPLAZAR/forms/REEMPLAZAR/subscribe'; // ver README paso a paso
  const CIF             = 'G-00000000';                  // cuando se constituya
  const SEDE            = 'Apartado 1521 · 47080 Valladolid';
  const EMAIL           = 'hola@castillaviva.org';

  const COL_NAVEGAR = [
    { href: 'index.html',                label: 'Inicio'         },
    { href: 'sobre-nosotros.html',  label: 'Sobre nosotros' },
    { href: 'eventos.html',         label: 'Eventos'        },
    { href: 'transparencia.html',   label: 'Transparencia'  },
  ];
  const COL_HACER = [
    { href: 'hazte-socio.html', label: 'Hazte socio'              },
    { href: STRIPE_LINK,    label: 'Aportar',     external: true },
    { href: 'mecenas.html',     label: 'Mecenazgo'                },
    { href: 'mecenas.html',     label: 'Empresas'                 },
  ];
  const COL_CONTACTO = [
    { href: `mailto:${EMAIL}`,                            label: EMAIL,    external: true },
    { href: 'contacto.html',                                  label: 'Contacto'                },
    { href: 'https://instagram.com/castillaviva',         label: 'Instagram', external: true },
    { href: 'https://bsky.app/profile/castillaviva.org',  label: 'Bluesky',   external: true },
  ];

  const CSS = `
    :host { display: block; background: var(--cv-paper); border-top: 1px solid var(--cv-rule); color: var(--cv-ink); }

    /* ── Marca de agua "CASTILLA viva." ──────────────────── */
    .watermark {
      padding: 32px 40px 0;
      overflow: hidden;
    }
    .watermark-row {
      display: flex;
      align-items: baseline;
      gap: 4vw;
      justify-content: flex-start;
      color: rgba(20, 17, 14, .10);
      white-space: nowrap;
      user-select: none;
      line-height: .85;
    }
    .watermark .castilla {
      font-family: var(--cv-mono);
      font-weight: 500;
      font-size: clamp(18px, 3vw, 56px);
      letter-spacing: .42em;
      text-transform: uppercase;
    }
    .watermark .pipe {
      width: 1px;
      height: 1em;
      font-size: clamp(18px, 3vw, 56px);
      background: currentColor;
      display: inline-block;
      align-self: baseline;
    }
    .watermark .viva {
      font-family: var(--cv-serif);
      font-style: italic;
      font-weight: 400;
      font-variation-settings: "SOFT" 100, "opsz" 144;
      font-size: clamp(110px, 20vw, 300px);
      letter-spacing: -0.05em;
    }
    .watermark .viva .dot { color: rgba(138, 30, 44, .22); }

    /* ── Columnas ────────────────────────────────────────── */
    .columns {
      padding: 24px 40px 56px;
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr 1fr 1.4fr;
      gap: 32px;
    }
    @media (max-width: 980px)  { .columns { grid-template-columns: 1fr 1fr 1fr; gap: 32px 24px; } }
    @media (max-width: 640px)  { .columns { grid-template-columns: 1fr 1fr; padding: 24px 24px 40px; } }

    .col h4 {
      font-family: var(--cv-mono);
      font-size: 10.5px;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--cv-mute);
      margin: 0 0 18px;
      font-weight: 500;
    }
    .col p {
      margin: 0;
      font-family: var(--cv-sans);
      font-size: 14px;
      line-height: 1.6;
      color: var(--cv-ink-2);
      max-width: 280px;
    }
    .col ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .col li a {
      font-family: var(--cv-sans);
      font-size: 14px;
      color: var(--cv-ink);
      text-decoration: none;
      transition: color .2s ease;
    }
    .col li a:hover { color: var(--cv-carmesi); }

    /* ── Boletín ─────────────────────────────────────────── */
    .boletin form {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 4px 10px 14px;
      border: 1px solid var(--cv-ink);
      border-radius: 999px;
      background: transparent;
      max-width: 340px;
      transition: border-color .2s ease;
    }
    .boletin form:focus-within { border-color: var(--cv-carmesi); }
    .boletin input[type="email"] {
      flex: 1;
      padding: 0;
      border: 0;
      background: transparent;
      font-family: var(--cv-sans);
      font-size: 14px;
      color: var(--cv-ink);
      outline: none;
      min-width: 0;
    }
    .boletin input[type="email"]::placeholder { color: var(--cv-mute); }
    .boletin button {
      width: 32px; height: 32px;
      background: var(--cv-ink); color: var(--cv-paper);
      border: 0; border-radius: 50%;
      cursor: pointer;
      font-size: 13px;
      transition: background .2s ease;
    }
    .boletin button:hover { background: var(--cv-carmesi); }
    .boletin .ok {
      margin: 12px 0 0;
      font-family: var(--cv-mono);
      font-size: 11.5px;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--cv-carmesi);
      display: none;
    }
    .boletin .ok.show { display: block; }

    /* ── Pie legal ───────────────────────────────────────── */
    .legal {
      padding: 18px 40px;
      border-top: 1px solid var(--cv-rule);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      font-family: var(--cv-mono);
      font-size: 10.5px;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: var(--cv-mute);
    }
    @media (max-width: 640px) { .legal { padding: 18px 24px; } }
  `;

  const linkList = (items) => items.map(i => `
    <li><a href="${i.href}"${i.external ? ' target="_blank" rel="noopener"' : ''}>${i.label}</a></li>
  `).join('');

  class CvFooter extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      const year = new Date().getFullYear();

      this.shadowRoot.innerHTML = `
        <style>${CSS}</style>

        <!-- Marca de agua -->
        <div class="watermark">
          <div class="watermark-row">
            <span class="castilla">CASTILLA</span>
            <span class="pipe"></span>
            <span class="viva">viva<span class="dot">.</span></span>
          </div>
        </div>

        <!-- Columnas -->
        <div class="columns">
          <div class="col">
            <h4>Iniciativa</h4>
            <p>Castilla Viva — proyecto cívico, transversal y propositivo. Raíz y futuro.</p>
          </div>
          <div class="col">
            <h4>Navegar</h4>
            <ul>${linkList(COL_NAVEGAR)}</ul>
          </div>
          <div class="col">
            <h4>Hacer</h4>
            <ul>${linkList(COL_HACER)}</ul>
          </div>
          <div class="col">
            <h4>Contacto</h4>
            <ul>${linkList(COL_CONTACTO)}</ul>
          </div>
          <div class="col boletin">
            <h4>No te pierdas nada</h4>
            <p style="margin: 0 0 14px;">Te avisamos por correo cuando publiquemos algo importante. Sin spam, baja cuando quieras.</p>
            <form action="${MAILERLITE_FORM}" method="post" target="_blank">
              <input type="email" name="fields[email]" placeholder="tu correo" required aria-label="Tu correo electrónico">
              <button type="submit" aria-label="suscribirse">→</button>
            </form>
            <p class="ok">Gracias — te llegará un correo de bienvenida.</p>
          </div>
        </div>

        <!-- Pie legal -->
        <div class="legal">
          <span>— MM${['', 'I','II','III','IV','V','VI','VII','VIII','IX'][year - 2026] || (year - 2026)} · Castilla Viva · ${CIF !== 'G-00000000' ? 'CIF ' + CIF : 'en constitución'}</span>
          <span>Hecho desde Castilla</span>
        </div>
      `;
    }
  }

  customElements.define('cv-footer', CvFooter);
})();
