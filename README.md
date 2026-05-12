# Castilla Viva — web

Sitio web del proyecto Castilla Viva. Multi-página, HTML estático, listo para desplegar en Vercel / Cloudflare Pages / Netlify.

## Estructura

```
web/
├── index.html              ← INICIO (hero vídeo + qué es + diccionario + hazte socio)
├── sobre-nosotros.html     ← Sobre nosotros (intro + PDFs del manifiesto + equipo)
├── transparencia.html      ← Documentos, cuentas, actas
├── eventos.html            ← Asambleas y actualidad — LA QUE CAMBIA
├── hazte-socio.html        ← Alta de socio (cuota mensual / anual)
├── mecenas.html            ← Mecenazgo de empresas e instituciones
├── contacto.html           ← Formulario + datos
│
├── colors_and_type.css     ← Tokens del sistema (colores + tipografía)
├── assets/                 ← Logos, avatar, iconos
├── video/                  ← Vídeos del hero (lavanda-brihuega.mp4)
│
└── _shared/
    ├── site.css            ← Estilos comunes a todas las páginas
    ├── header.js           ← <cv-header> — la TopBar (un solo archivo, cambia en todo el sitio)
    └── footer.js           ← <cv-footer> — el Footer (un solo archivo, cambia en todo el sitio)
```

## Qué tocar y dónde

> Regla de oro: **el header y el footer viven en `_shared/`**. Si cambias algo ahí, cambia en TODAS las páginas a la vez.

| Quieres cambiar… | Edita… |
|---|---|
| Logo, nav del top, botones Aportar/Hazte socio | `_shared/header.js` |
| Pie de página, columnas de enlaces, formulario de boletín | `_shared/footer.js` |
| Colores, fuentes, tamaños base | `colors_and_type.css` |
| Texto, vídeos o secciones de la home | `index.html` |
| Una palabra del diccionario o su definición | `index.html` (busca `const PALABRAS = [` cerca del final) |
| Contenido de una página interna | El archivo `.html` correspondiente |
| Email, redes sociales, Stripe link | `_shared/header.js` Y `_shared/footer.js` (constantes al principio) |

## Antes de publicar — checklist

### 1 · Stripe (botón "Aportar")

1. Crea cuenta en https://stripe.com (gratis).
2. Dashboard → **Payment Links → New** → crea un link con:
   - Tipo: **Donation** (importe libre, mínimo 1 €)
   - Métodos: tarjeta, Apple Pay, Google Pay
3. Copia el link (`https://buy.stripe.com/xxxxx`).
4. Pégalo en DOS archivos, reemplazando `https://buy.stripe.com/REEMPLAZAR_CON_PAYMENT_LINK`:
   - `_shared/header.js` → constante `STRIPE_LINK`
   - `_shared/footer.js` → constante `STRIPE_LINK`
   - `index.html` → busca `REEMPLAZAR_CON_PAYMENT_LINK` (1 ocurrencia, en el bloque socio)

### 2 · MailerLite (formulario "no te pierdas nada" del footer)

1. Crea cuenta gratis en https://www.mailerlite.com (gratis hasta 1.000 suscriptores, 12.000 envíos/mes).
2. **Subscribers → Forms → Create new form → Embedded form**.
3. Le pones nombre "Boletín Castilla Viva" y eliges una lista (o creas una nueva: *Suscriptores · web*).
4. Cuando te dé el código de embed, busca dentro algo así:
   ```
   action="https://assets.mailerlite.com/jsonp/XXXXXX/forms/YYYYYY/subscribe"
   ```
   Copia esa URL.
5. Pégala en `_shared/footer.js`, en la constante `MAILERLITE_FORM`.
6. **Automatización de bienvenida** — en MailerLite:
   - Ve a **Automation → Create automation**.
   - Trigger: "When a subscriber joins a group" → seleccionas la lista del paso 3.
   - Acción: "Email" → diseña el mail de bienvenida (puedes usar plantilla o HTML).
   - **Cambiar el remitente:** en la configuración del email, "From email" → pones `hola@castillaviva.org` (necesita verificar el dominio: MailerLite te guía).

### 3 · Email del dominio (`hola@castillaviva.org`)

Para que `hola@castillaviva.org`, `prensa@…`, etc. funcionen y MailerLite pueda mandar desde tu dominio:

- **Recomendado: Migadu** (~20 €/año, sin tracking, ilimitados alias). https://www.migadu.com
- Alternativa: **Fastmail** (~3 $/mes). https://www.fastmail.com
- Evita Google Workspace si quieres coherencia de tono.

### 4 · Vídeos del hero

Ahora hay 1 vídeo real (`video/lavanda-brihuega.mp4`, ~12MB) y 3 escenas con gradiente como placeholder. Para sustituir los gradientes por vídeos reales:

1. Mete los vídeos en `web/video/` (formato `.mp4`, h.264, máx ~10MB cada uno).
2. En `index.html`, busca `<div class="scene" data-scene="1"` y cambia ese `<div>` por un `<video src="video/tu-video.mp4" ...>` igual que el primero.

### 5 · CIF y datos legales

Cuando se constituya la entidad, en `_shared/footer.js` cambia la constante `CIF` por el real.

## Desplegar en Vercel

1. Crea cuenta gratis en https://vercel.com.
2. **Add New → Project → Import** y arrastra la carpeta `web/` entera (o conecta el repo de GitHub).
3. Vercel detecta que es estático y lo despliega en ~20 segundos.
4. **Conectar dominio:** Project Settings → Domains → añade `castillaviva.org` y `www.castillaviva.org`. Vercel te da los registros DNS (un A record + un CNAME). Los pegas en el panel de tu proveedor del dominio. HTTPS automático.

Coste: **gratis** para vuestro volumen previsible.

### Alternativas

- **Cloudflare Pages** — mismo flujo, CDN más rápido globalmente. https://pages.cloudflare.com
- **Netlify** — arrastrar y soltar. https://app.netlify.com/drop

## Cómo construimos cada página

Cada página interna se trabaja **en una conversación dedicada**. Yo me limito a abrir el archivo correspondiente (`sobre-nosotros.html`, `transparencia.html`, etc.) y reemplazo el bloque `<section class="placeholder">` por el contenido real, manteniendo `<cv-header>` y `<cv-footer>` arriba y abajo.

Páginas que se quedan estáticas casi siempre:
- Sobre nosotros, Hazte socio, Mecenas, Transparencia, Contacto

Página que cambia:
- **Eventos / actualidad** — añadiremos un sistema simple para que puedas tú dar de alta una entrada nueva (un archivo `.html` o una entrada en un array, según prefieras).

---

*Castilla Viva — v.1 · 2026 · raíz y futuro.*
